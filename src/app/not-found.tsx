import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(900px_420px_at_10%_-10%,_rgba(0,110,182,0.08),_transparent_60%),radial-gradient(900px_420px_at_110%_10%,_rgba(176,203,31,0.12),_transparent_60%)]">
      <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-primaryBlue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 h-64 w-64 rounded-full bg-primaryGreen/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-12 h-24 w-24 -translate-x-1/2 rounded-full bg-primaryRed/10 blur-2xl" />

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:py-20">
        <div className="grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1fr_1fr]">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primaryBlue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primaryBlue">
              <span className="h-2 w-2 rounded-full bg-primaryBlue" />
              404 tidak ditemukan
            </div>
            <h1 className="mt-4 text-6xl font-extrabold tracking-tight text-primaryBlue sm:text-7xl">
              404
            </h1>
            <p className="mt-3 text-lg font-semibold text-gray-800 sm:text-xl">
              Halaman tidak ditemukan
            </p>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
            </p>
            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              Kembali ke dashboard untuk melanjutkan.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-primaryBlue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker"
              >
                Kembali ke Dashboard
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
              >
                Lihat Profil
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-10 rounded-full bg-primaryBlue/10 blur-3xl" />
            <div className="relative flex h-72 w-full max-w-md items-center justify-center rounded-[36px] border border-gray-200/80 bg-white/90 shadow-[0_28px_60px_-46px_rgba(15,23,42,0.7)] backdrop-blur sm:h-80">
              <div className="text-center">
                <div className="text-[5rem] font-extrabold leading-none tracking-tight text-primaryBlue sm:text-[7rem]">
                  404
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Tidak ditemukan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
