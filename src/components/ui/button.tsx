import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        sm: 'h-9 px-3 text-sm',
        default: 'h-10 px-4',
        md: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
        lg: 'h-11 px-8',
      },
      variant: {
        primary: 'bg-gold text-white hover:bg-gold',
        'primary-outline':
          'bg-transparent border border-gold text-gold-deep hover:bg-gold hover:border-gold hover:text-white',
        default: 'bg-brand text-white hover:bg-brand-darkest',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-secondary',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border-2 border-secondary-foreground text-brand bg-transparent hover:bg-brand-light',
        'outline-white': 'border border-white bg-transparent hover:bg-white hover:text-primary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
