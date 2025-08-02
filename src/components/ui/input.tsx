import * as React from "react"

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, style, ...props }, ref) => {
  return (
    <input
      type={type}
      style={{
        display: 'flex',
        height: '2.5rem',
        width: '100%',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        padding: '0 0.75rem',
        fontSize: '0.875rem',
        outline: 'none',
        ...style
      }}
      className={className}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }