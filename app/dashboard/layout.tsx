import { getCurrentUser } from '@/lib/auth/helpers'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  // Si no hay usuario, redirigir a login (en producción)
  // if (!user) {
  //   redirect('/login')
  // }

  // Para DEMO, usar usuario mock si no hay usuario
  if (!user) {
    redirect('/')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar userRole={user.rol} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={user} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
