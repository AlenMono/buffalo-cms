import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<
  {
    ref?: React.Ref<HTMLTextAreaElement>
    placeholder?: string
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ref, placeholder, ...props }) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[227px] w-full rounded border border-gold-light bg-surface px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      placeholder={placeholder}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
