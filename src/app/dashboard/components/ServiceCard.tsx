import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

export default function ServiceCard({
  title,
  description,
  image,
  onClick,
}: ServiceCardProps) {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow cursor-pointer text-center"
      onClick={onClick}
    >
      <Image
        width={100}
        height={100}
        src={image}
        alt={title}
        className="w-20 h-20 mx-auto rounded-full mb-4"
      />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
