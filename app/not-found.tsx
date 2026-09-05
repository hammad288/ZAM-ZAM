import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' }}>
      <div className="text-center text-white">
        <div className="text-8xl mb-6">🕋</div>
        <h1 className="text-6xl font-black mb-4" style={{ fontFamily: 'Cinzel, serif', color: '#fbbf24' }}>404</h1>
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Page Not Found</h2>
        <p className="text-emerald-200 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let us help you find your way to the holy land.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-gold px-8 py-3"
            style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}>
            Go Home
          </Link>
          <Link href="/hajj" className="btn-outline-green px-8 py-3"
            style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}>
            View Hajj Packages
          </Link>
        </div>
      </div>
    </div>
  )
}
