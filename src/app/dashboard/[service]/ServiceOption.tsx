import { useState } from "react";
import BookingModal from "./BookingModal";

const serviceOptions: Record<string, string[]> = {
  Nurse: ["Perawatan Luka", "Perawatan Lansia", "Layanan Kesehatan Anak"],
  Physiotherapist: [
    "Terapi untuk Lansia",
    "Pemulihan Pasca Stroke",
    "Pemulihan Setelah Cedera",
  ],
  Doctor: ["Pemeriksaan Umum", "Pemeriksaan Khusus"],
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
      <div className="fixed top-0 left-0 px-3 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <p className="text-red-500">Kategori layanan tidak ditemukan!</p>
          <button onClick={onClose} className="text-blue-500 mt-4">
            Kembali
          </button>
        </div>
      </div>
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
                onClick={() => setSelectedService(service)}
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
