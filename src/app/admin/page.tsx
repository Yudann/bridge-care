"use client";

import { useRouter } from "next/navigation";
import ServiceCard from "../dashboard/components/ServiceCard";

const services = [
  {
    title: "Nurse Service",
    description: "Lihat Data Pesanan",
    image: "/perawat.jpeg",
    slug: "nurse-service",
  },
  {
    title: "Physiotherapist",
    description: "Lihat Data Pesanan",
    image: "/terapi.jpeg",
    slug: "physiotherapist",
  },
  {
    title: "Doctor Consultation",
    description: "Lihat Data Pesanan",
    image: "/dokter.jpeg",
    slug: "doctor-consultation",
  },
  {
    title: "Ambulance Service",
    description: "Lihat Data Pesanan",
    image: "/ambulan.jpeg",
    slug: "ambulance-service",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Welcome to Bridge Care Admin Panel!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            image={service.image}
            onClick={() => router.push(`/admin/${service.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}
