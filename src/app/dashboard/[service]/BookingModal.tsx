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
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center px-3">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Pesanan</h2>
        <p>
          Anda memesan <b>{service}</b> dengan <b>{profile}</b>.
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          onClick={() => {
            alert("Booking berhasil!");
            onClose();
          }}
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
