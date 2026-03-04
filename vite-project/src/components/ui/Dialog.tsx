import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as React from "react"
import { XIcon } from "lucide-react"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
      <DialogPrimitive.Content
        ref={ref}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg ${className ?? ""}`}
        {...props}
      >
        {children}
            <DialogPrimitive.Close asChild>
			    <button className="absolute right-2.5 top-2.5 inline-flex size-5 appearance-none items-center justify-center rounded-md text-gray-400 cursor-pointer hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
				    aria-label="Close">
					    <XIcon className="h-4 w-4"/>
                </button>
            </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>((props, ref) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className="text-lg font-semibold"
      {...props}
    />
  )
})

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>((props, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className="text-sm text-gray-500"
      {...props}
    />
  )
})