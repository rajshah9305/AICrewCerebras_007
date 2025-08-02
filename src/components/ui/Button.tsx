import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', style, ...props }, ref) => {
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    };
    
    const variants = {
      default: { backgroundColor: '#3b82f6', color: 'white' },
      destructive: { backgroundColor: '#ef4444', color: 'white' },
      outline: { border: '1px solid #d1d5db', backgroundColor: 'white', color: '#374151' },
      secondary: { backgroundColor: '#f3f4f6', color: '#374151' },
      ghost: { backgroundColor: 'transparent', color: '#6b7280' },
      link: { color: '#3b82f6', textDecoration: 'underline' },
    };
    
    const sizes = {
      default: { height: '2.5rem', padding: '0 1rem' },
      sm: { height: '2.25rem', padding: '0 0.75rem' },
      lg: { height: '2.75rem', padding: '0 2rem' },
      icon: { height: '2.5rem', width: '2.5rem' },
    };

    return (
      <button
        style={{
          ...baseStyle,
          ...variants[variant],
          ...sizes[size],
          ...style
        }}
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }