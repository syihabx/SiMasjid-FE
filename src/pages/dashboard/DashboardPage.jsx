import Sidebar from '../../components/dashboard/Sidebar'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total Keuangan</h2>
            <p className="text-gray-600">Rp 15.000.000</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Kegiatan Mendatang</h2>
            <p className="text-gray-600">3 Kegiatan</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Total Inventaris</h2>
            <p className="text-gray-600">125 Barang</p>
          </div>
        </div>
      </div>
    </div>
  )
}
