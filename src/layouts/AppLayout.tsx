import { Outlet } from 'react-router-dom'
import BottomNav from '../components/navigation/BottomNav'

export default function AppLayout() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
      <Outlet />
      <BottomNav />
    </div>
  )
}
