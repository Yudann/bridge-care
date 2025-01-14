"use client";

import { useRouter } from "next/navigation";
import ServiceCard from "./components/ServiceCard";

const services = [
  {
    title: "Nurse Service",
    description: "Professional nursing care at your home.",
    image: "/perawat.jpeg",
    slug: "nurse-service",
  },
  {
    title: "Physiotherapist",
    description: "Specialized therapy for your better health.",
    image: "/terapi.jpeg",
    slug: "physiotherapist",
  },
  {
    title: "Doctor Consultation",
    description: "Consultation with experienced doctors.",
    image: "/dokter.jpeg",
    slug: "doctor-consultation",
  },
  {
    title: "Ambulance Service",
    description: "Quick and reliable emergency ambulance.",
    image: "/ambulan.jpeg",
    slug: "ambulance-service",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to Bridge Care</h2>
      <p className="mb-6">Select a service:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            image={service.image}
            onClick={() => router.push(`/dashboard/${service.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}