"use client";

import { useEffect, useState } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localStorageUtils";
import { Booking } from "@/types/booking";

export default function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const currentBookings = await getFromLocalStorage("bookingData");
      setBookings(currentBookings);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const handleDelete = async (index: number) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings); // Perbarui state
    await saveToLocalStorage("bookingData", updatedBookings); // Simpan ke LocalForage
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="w-16 h-16 border-4 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl font-bold text-gray-500">
          Tidak ada riwayat booking.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Riwayat Pemesanan</h1>
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="space-y-2">
              <p className="text-xl font-semibold text-black">
                <b>User:</b> {booking.username}
              </p>
              <p className="text-lg text-black">
                <b>Service Type:</b> {booking.serviceType}
              </p>
              <p className="text-lg text-black">
                <b>Service:</b> {booking.service}
              </p>
              <p className="text-lg text-black">
                <b>Profile:</b> {booking.profile}
              </p>
              <p className="text-sm text-black">
                <b>Date:</b> {formatDate(booking.date)}
              </p>
              <button
                onClick={() => handleDelete(index)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
