"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ServiceOptions from "./ServiceOption";


// TypeScript types
type ServiceData = Record<
  string,
  { title: string; description: string; image: string }
>;
type ProfilesData = Record<
  string,
  { name: string; rating: number; price: string; img: string }[]
>;

// Data services
const services: ServiceData = {
  "nurse-service": {
    title: "Nurse Service",
    description: "Professional nursing care at your home.",
    image: "/perawat.jpeg",
  },
  physiotherapist: {
    title: "Physiotherapist",
    description: "Specialized therapy for your better health.",
    image: "/terapi.jpeg",
  },
};

// Data profiles
const profiles: ProfilesData = {
  "Nurse Service": [
    {
      name: "Nurse Anna",
      rating: 4.8,
      price: "150,000",
      img: "/perawat1.jpeg",
    },
    {
      name: "Nurse John",
      rating: 4.6,
      price: "150,000",
      img: "/perawat2.jpeg",
    },
  ],
  Physiotherapist: [
    {
      name: "Physio Mike",
      rating: 4.7,
      price: "150,000",
      img: "/terapi1.jpeg",
    },
    {
      name: "Physio Sarah",
      rating: 4.9,
      price: "150,000",
      img: "/terapi2.jpeg",
    },
  ],
};

export default function ServicePage() {
  const router = useRouter();
  const params = useParams();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  // Pastikan params.service ada
  const serviceKey = params.service as string; // Tipe casting ke string
  const service = services[serviceKey];

  if (!service) {
    return <div>Service not found!</div>;
  }

  // Ambil profil berdasarkan judul layanan
  const serviceProfiles = profiles[service.title] || [];

  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-4 text-blue-500 underline"
      >
        Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="mb-6">{service.description}</p>
      <div className="grid grid-cols-1 gap-4">
        {serviceProfiles.map((profile, index) => (
          <div
            key={index}
            className="border flex flex-col items-center justify-center rounded-lg p-4 shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedProfile(profile.name)}
          >
            <Image
              src={profile.img}
              alt={profile.name}
              width={200}
              height={150}
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p className="text-yellow-400">⭐ {profile.rating.toFixed(1)}</p>
            <p>Price: Rp {profile.price}</p>
          </div>
        ))}
      </div>

      {selectedProfile && (
        <ServiceOptions
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}
