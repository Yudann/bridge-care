"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localStorageUtils";
import { Booking } from "@/types/booking";
import Link from "next/link";

export default function AdminServicePage() {
  const params = useParams();
  const serviceType = params.service; // Ambil serviceType dari URL parameter

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null); // Untuk modal konfirmasi

  useEffect(() => {
    const fetchFilteredBookings = async () => {
      setIsLoading(true);
      try {
        const currentBookings: Booking[] = await getFromLocalStorage(
          "bookingData"
        );

        // Filter data berdasarkan serviceType
        const filteredBookings = currentBookings.filter(
          (booking) => booking.serviceType === serviceType
        );

        setBookings(filteredBookings);
      } catch (error) {
        console.error("Gagal mengambil data booking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredBookings();
  }, [serviceType]);

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;

    try {
      const currentBookings: Booking[] = await getFromLocalStorage(
        "bookingData"
      );
      const updatedBookings = currentBookings.filter(
        (booking) =>
          booking.username !== selectedBooking.username ||
          booking.date !== selectedBooking.date // Identifikasi unik berdasarkan kombinasi field
      );

      await saveToLocalStorage("bookingData", updatedBookings);

      // Perbarui daftar setelah penghapusan
      setBookings((prev) =>
        prev.filter(
          (booking) =>
            booking.username !== selectedBooking.username ||
            booking.date !== selectedBooking.date
        )
      );
      alert("Data berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    } finally {
      setSelectedBooking(null); // Tutup modal
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading data...</p>
      </div>
    );
  }

  if (!serviceType) {
    return (
      <div className="p-6">
        <Link
          href="/admin"
          className="bg-green-600 text-white py-2 px-4 rounded mb-4"
        >
          Back to Dashboard
        </Link>
        <p className="text-red-500 font-bold mt-8">Service tidak ditemukan.</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="p-6">
        <Link
          href="/admin"
          className="bg-green-600 text-white py-2 px-4 rounded mb-4"
        >
          Back to Dashboard
        </Link>
        <p className="text-gray-500 mt-8">
          Tidak ada riwayat pemesanan untuk {serviceType}.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link
        href="/admin"
        className="bg-green-600 text-white py-2 px-4 rounded mb-4"
      >
        Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-4 mt-8">
        Riwayat Pemesanan untuk {serviceType}
      </h1>
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="space-y-2">
              <p>
                <strong>User:</strong> {booking.username}
              </p>
              <p>
                <strong>Service:</strong> {booking.service}
              </p>
              <p>
                <strong>Service Type:</strong> {booking.serviceType}
              </p>
              <p>
                <strong>Profile:</strong> {booking.profile}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.date).toLocaleString("id-ID")}
              </p>
              <button
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                onClick={() => setSelectedBooking(booking)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
            <p>
              Anda yakin ingin menghapus data{" "}
              <strong>{selectedBooking.username}</strong> dengan layanan{" "}
              <strong>{selectedBooking.service}</strong>?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={() => setSelectedBooking(null)}
              >
                Batal
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={handleDeleteBooking}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
