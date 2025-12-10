import { useEffect, useState } from 'react';

const useCountdown = (targetDate: string) => {
  // Hitung selisih waktu (milisetik)
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    // Update setiap 1 detik (1000ms)
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    // Cleanup: Matikan timer kalau komponen hilang (biar gak bocor memory)
    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

// Fungsi helper buat hitung hari, jam, menit, detik dari milidetik
const getReturnValues = (countDown: number) => {
  // Kalau waktu habis, return 0 semua
  if (countDown < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export { useCountdown };