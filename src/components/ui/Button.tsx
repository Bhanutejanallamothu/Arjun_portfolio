import * as React from "react"
import { cn } from "../../lib/utils"
import "./Button.css"

const variantClasses = {
  default: "ui-button--default",
  noShadow: "ui-button--noShadow",
  neutral: "ui-button--neutral",
  reverse: "ui-button--reverse",
} as const

const sizeClasses = {
  default: "ui-button--size-default",
  sm: "ui-button--size-sm",
  lg: "ui-button--size-lg",
  icon: "ui-button--size-icon",
} as const

type ButtonVariant = keyof typeof variantClasses
type ButtonSize = keyof typeof sizeClasses

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn("ui-button", variantClasses[variant], sizeClasses[size], className)

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(classes, children.props.className),
      })
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button }
