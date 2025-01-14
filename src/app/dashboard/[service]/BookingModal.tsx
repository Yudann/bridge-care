import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@/utils/localStorageUtils";

type Booking = {
  username: string;
  profile: string;
  service: string;
  serviceType: string;
  date: string;
};

type BookingModalProps = {
  profile: string;
  service: string;
  onClose: () => void;
};

export default function BookingModal({
  profile,
  service,
  onClose,
}: BookingModalProps) {
  const params = useParams(); // Mengambil parameter dari URL
  const serviceType = Array.isArray(params.service)
    ? params.service[0]
    : params.service || "Unknown";
  const handleConfirm = async () => {
    const savedUsername = Cookies.get("username") || "Guest";

    // Ambil data booking lama dari LocalStorage
    const currentBookings: Booking[] =
      (await getFromLocalStorage("bookingData")) || [];

    // Buat data booking baru
    const newBooking: Booking = {
      username: savedUsername,
      profile,
      service,
      serviceType,
      date: new Date().toISOString(),
    };

    // Tambahkan booking baru ke daftar booking lama
    const updatedBookings = [...currentBookings, newBooking];

    // Simpan kembali data booking yang telah diperbarui ke LocalStorage
    await saveToLocalStorage("bookingData", updatedBookings);

    alert("Booking berhasil!");
    onClose();
  };

  return (
    <div className="fixed z-[998] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center px-3">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Pesanan</h2>
        <p>
          Anda memesan <b>{service}</b> dari layanan <b>{serviceType}</b> dengan{" "}
          <b>{profile}</b>.
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          onClick={handleConfirm}
        >
          Konfirmasi
        </button>
        <button onClick={onClose} className="text-red-500 mt-4 block">
          Batal
        </button>
      </div>
    </div>
  );
}
