import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full w-full bg-white flex flex-col justify-center items-center">
      <h1 className="text-[4rem] font-bold">404</h1>
      <p>Halaman yang anda cari tidak ditemukan</p>
      <Link href="/" className="px-8 py-3 bg-green-400 rounded-full">
        Back To Home
      </Link>
    </div>
  );
}
