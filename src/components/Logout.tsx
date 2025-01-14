"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { IoIosLogOut } from "react-icons/io";

export default function Logout() {
  const router = useRouter();
  const pathname = usePathname(); // Mendapatkan path halaman saat ini
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    Cookies.remove("username");
    setShowModal(false);
    router.push("/"); // Redirect ke halaman utama
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const isLoggedIn = Cookies.get("username");

  // Jangan tampilkan tombol logout di halaman tertentu
  if (!isLoggedIn || pathname === "/" || pathname === "/register") return null;

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        <IoIosLogOut size={25} className="cursor-pointer fill-red-600" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black z-[99999] bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-black">
              Apakah Anda yakin ingin logout?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded bg-gray-400 hover:bg-gray-500"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border rounded bg-red-600 text-white hover:bg-red-700"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
