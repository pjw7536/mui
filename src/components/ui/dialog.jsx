"use client"

import React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

const DialogContext = React.createContext(null)

function useDialogContext() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog component must be used within a <Dialog />")
  }
  return context
}

export function Dialog({ open, defaultOpen = false, onOpenChange, children }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = open !== undefined
  const actualOpen = isControlled ? open : internalOpen

  const setOpen = React.useCallback(
    (nextOpen) => {
      if (!isControlled) {
        setInternalOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  const contextValue = React.useMemo(
    () => ({ open: actualOpen, setOpen }),
    [actualOpen, setOpen]
  )

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>
}

export const DialogTrigger = React.forwardRef(function DialogTrigger(
  { asChild = false, children, onClick, ...props },
  ref
) {
  const { setOpen } = useDialogContext()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: (event) => {
        children.props.onClick?.(event)
        onClick?.(event)
        if (!event.defaultPrevented) {
          setOpen(true)
        }
      },
    })
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          setOpen(true)
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
})

const MAX_WIDTH_MAP = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
}

export const DialogContent = React.forwardRef(function DialogContent(
  { className, maxWidth = "sm", children, ...props },
  ref
) {
  const { open, setOpen } = useDialogContext()
  const contentRef = React.useRef(null)
  const combinedRef = React.useCallback(
    (node) => {
      contentRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
      }
    }

    const previouslyFocused = document.activeElement

    const timer = window.setTimeout(() => {
      contentRef.current?.focus({ preventScroll: true })
    }, 0)

    document.addEventListener("keydown", handleKeyDown)
    document.body.classList.add("overflow-hidden")

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener("keydown", handleKeyDown)
      document.body.classList.remove("overflow-hidden")
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [open, setOpen])

  if (!open) {
    return null
  }

  const maxWidthClass = MAX_WIDTH_MAP[maxWidth] ?? MAX_WIDTH_MAP.sm

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => {
          setOpen(false)
        }}
      />
      <div
        ref={combinedRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full rounded-2xl border border-border bg-background p-6 shadow-xl outline-none",
          maxWidthClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  )
})

export const DialogHeader = React.forwardRef(function DialogHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
})

export const DialogTitle = React.forwardRef(function DialogTitle({ className, ...props }, ref) {
  return <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
})

export const DialogFooter = React.forwardRef(function DialogFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex flex-wrap justify-end gap-2 pt-4", className)} {...props} />
})
