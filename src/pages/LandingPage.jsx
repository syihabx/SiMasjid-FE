import Header from '../components/layout/Header'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Selamat Datang di SIMASJID
            </h1>
            <p className="text-gray-600 mb-8">
              Sistem Informasi Terpadu untuk Pengelolaan Masjid
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Manajemen Keuangan</h2>
                <p className="text-gray-600">
                  Laporan keuangan transparan dan terintegrasi
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Jadwal Kegiatan</h2>
                <p className="text-gray-600">
                  Pengelolaan jadwal kegiatan masjid yang terstruktur
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Inventaris Masjid</h2>
                <p className="text-gray-600">
                  Sistem pencatatan dan manajemen inventaris masjid
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
