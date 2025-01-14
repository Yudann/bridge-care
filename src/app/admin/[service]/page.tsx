"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/localStorageUtils";
import { Booking } from "@/types/booking";
import Link from "next/link";

// Tipe data untuk pemesanan

export default function AdminServicePage() {
  const params = useParams();
  const serviceType = params.service; // Ambil serviceType dari URL parameter

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <p className="text-red-500 font-bold">Service tidak ditemukan.</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="p-6">
        <p className="text-gray-500">
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
      <h1 className="text-2xl font-bold mb-4">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
