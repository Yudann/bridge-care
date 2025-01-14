// components/BookingHistory.tsx

import { Booking } from "@/types/booking";

type BookingHistoryProps = {
  bookings: Booking[];
};

export default function BookingHistory({ bookings }: BookingHistoryProps) {
  if (bookings.length === 0) {
    return <p>Tidak ada riwayat booking.</p>;
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking, index) => (
        <div key={index} className="border-b py-2">
          <p>
            <b>User:</b> {booking.username}
          </p>
          <p>
            <b>Service:</b> {booking.service}
          </p>
          <p>
            <b>Profile:</b> {booking.profile}
          </p>
          <p>
            <b>Date:</b>{" "}
            {new Date(booking.date).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
