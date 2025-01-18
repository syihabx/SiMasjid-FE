
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { name: 'Daily Task', href: '/daily-task', icon: 'task' },
  { name: 'Inventaris', href: '/inventory', icon: 'inventory' },
  { name: 'Keuangan', href: '/keuangan', icon: 'attach_money' },
  { name: 'Pengaturan', href: '/pengaturan', icon: 'settings' }
]

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useSelector(state => state.auth)
  if (!user) return null
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-mg border-r border-gray-200 z-20 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute -left-12 top-2 p-2 text-white lg:hidden"
          >
            <span className="material-icons">close</span>
          </button>
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold">SIMASJID</h1>
          {user && (
            <p className="text-sm text-gray-600 mt-1">
              {user.email}
            </p>
          )}
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <span className="material-icons mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
        </div>
      </div>
    </>
  )
}
