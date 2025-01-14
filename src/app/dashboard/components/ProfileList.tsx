import Image from "next/image";

interface Profile {
  name: string;
  rating: number;
  price: string;
  img: string;
}

const profiles: Record<string, Profile[]> = {
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
      img: "./terapi1.jpeg",
    },
    {
      name: "Physio Sarah",
      rating: 4.9,
      price: "150,000",
      img: "./terapi2.jpeg",
    },
  ],
  "Doctor Consultation": [
    { name: "Dr. Smith", rating: 4.5, price: "25,000", img: "./dokter1.jpeg" },
    { name: "Dr. Emily", rating: 4.7, price: "30,000", img: "./dokter2.jpeg" },
  ],
  "Ambulance Service": [
    {
      name: "Ambulance A",
      rating: 4.9,
      price: "200,000",
      img: "./ambulan.jpeg",
    },
    {
      name: "Ambulance B",
      rating: 4.8,
      price: "250,000",
      img: "./ambulan.jpeg",
    },
  ],
};

interface ProfileListProps {
  service: string;
  onBack: () => void;
}

export default function ProfileList({ service, onBack }: ProfileListProps) {
  const data = profiles[service] || [];

  return (
    <div>
      <button
        className="bg-green-600 text-white py-2 px-4 rounded mb-4"
        onClick={onBack}
      >
        Back to Dashboard
      </button>
      <h2 className="text-xl font-semibold mb-4">{service}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((profile) => (
          <div
            key={profile.name}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            <Image
              width={100}
              height={100}
              src={profile.img}
              alt={profile.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="font-semibold">{profile.name}</h3>
            <p className="text-sm text-yellow-500">⭐ {profile.rating}</p>
            <p className="text-sm text-gray-600">Price: {profile.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
