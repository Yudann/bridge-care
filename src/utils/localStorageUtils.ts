import localforage from "localforage";

type Booking = {
  username: string;
  profile: string;
  service: string;
  serviceType: string;
  date: string;
};

// Menyimpan data ke LocalStorage
export const saveToLocalStorage = async (key: string, data: Booking[]): Promise<void> => {
  try {
    await localforage.setItem(key, data);
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
  }
};

// Mengambil data dari LocalStorage
export const getFromLocalStorage = async (key: string): Promise<Booking[]> => {
  try {
    const data = await localforage.getItem<Booking[]>(key);
    return data || [];
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return [];
  }
};
// Hapus data dari LocalForage
export const removeFromLocalStorage = async (key: string): Promise<void> => {
  try {
    await localforage.removeItem(key);
  } catch (error) {
    console.error("Gagal menghapus data:", error);
  }
};
