import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      {badge && (
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          style={{
            background: light ? 'rgba(255,255,255,0.15)' : 'rgba(6,95,70,0.1)',
            color: light ? '#fbbf24' : '#065f46',
            border: `1px solid ${light ? 'rgba(251,191,36,0.3)' : 'rgba(6,95,70,0.2)'}`,
          }}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl font-bold leading-tight',
          light ? 'text-white' : 'text-emerald-900'
        )}
        style={{ fontFamily: 'Cinzel, serif' }}
      >
        {title}{' '}
        {highlight && (
          <span
            className="gold-text"
            style={{
              background: 'linear-gradient(135deg, #d97706, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {highlight}
          </span>
        )}
      </h2>
      {/* Gold divider */}
      <div
        className={cn('h-1 rounded-full mt-4 mb-5', centered ? 'mx-auto' : '')}
        style={{
          width: '80px',
          background: 'linear-gradient(90deg, #d97706, #f59e0b)',
        }}
      />
      {subtitle && (
        <p
          className={cn(
            'text-lg max-w-2xl leading-relaxed',
            centered && 'mx-auto',
            light ? 'text-emerald-100' : 'text-gray-600'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
