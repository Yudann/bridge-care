import { useState } from "react";
import BookingModal from "./BookingModal";
import { FaComment } from "react-icons/fa";

const serviceOptions: Record<string, (string | JSX.Element)[]> = {
  Nurse: ["Perawatan Luka", "Perawatan Lansia", "Layanan Kesehatan Anak"],
  Physiotherapist: [
    "Terapi untuk Lansia",
    "Pemulihan Pasca Stroke",
    "Pemulihan Setelah Cedera",
  ],
  Doctor: [
    <span key="consultation">
      <FaComment size={15} className="inline mx-1" /> Konsultasi
    </span>,
  ],
  Ambulance: ["Full Medis", "Ambulan Jenazah"],
};

type ServiceOptionsProps = {
  profile: string;
  onClose: () => void;
};

export default function ServiceOptions({
  profile,
  onClose,
}: ServiceOptionsProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const categoryMapping: Record<string, keyof typeof serviceOptions> = {
    nurse: "Nurse",
    physio: "Physiotherapist",
    dr: "Doctor",
    ambulance: "Ambulance",
  };

  const getCategory = (profile: string): keyof typeof serviceOptions | null => {
    const lowerCaseProfile = profile.toLowerCase();
    for (const key in categoryMapping) {
      if (lowerCaseProfile.includes(key)) {
        return categoryMapping[key];
      }
    }
    return null;
  };

  // Menentukan kategori layanan
  const category = getCategory(profile);

  if (!category) {
    return (
      <div className="fixed z-[9999] top-0 left-0 px-3 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <p className="text-red-500">Kategori layanan tidak ditemukan!</p>
          <button onClick={onClose} className="text-blue-500 mt-4">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // Jika kategori Doctor atau Ambulance, langsung menuju BookingModal
  if (category === "Doctor" || category === "Ambulance") {
    return (
      <BookingModal
        profile={profile}
        service={category} // Tidak perlu memilih opsi, langsung kirim kategori
        onClose={onClose}
      />
    );
  }

  const options = serviceOptions[category];

  return (
    <div className="fixed top-0 left-0 px-3 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        {!selectedService ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Pilih Layanan untuk {profile}
            </h2>
            {options.map((service, index) => (
              <button
                key={index}
                className="block w-full text-left border p-2 rounded-md mb-2 hover:bg-blue-100"
                onClick={() => setSelectedService(service as string)}
              >
                {service}
              </button>
            ))}
            <button onClick={onClose} className="text-red-500 mt-4">
              Batal
            </button>
          </>
        ) : (
          <BookingModal
            profile={profile}
            service={selectedService}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
