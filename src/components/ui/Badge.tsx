import * as React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', style, ...props }, ref) => {
    const variants = {
      default: { backgroundColor: '#3b82f6', color: 'white' },
      secondary: { backgroundColor: '#f3f4f6', color: '#374151' },
      destructive: { backgroundColor: '#ef4444', color: 'white' },
      outline: { border: '1px solid #d1d5db', backgroundColor: 'transparent', color: '#374151' },
    };

    return (
      <div
        ref={ref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '9999px',
          padding: '0.125rem 0.75rem',
          fontSize: '0.75rem',
          fontWeight: '600',
          ...variants[variant],
          ...style
        }}
        className={className}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }