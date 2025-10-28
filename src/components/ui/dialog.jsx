"use client"

import React from "react"
import MuiDialog from "@mui/material/Dialog"
import MuiDialogActions from "@mui/material/DialogActions"
import MuiDialogContent from "@mui/material/DialogContent"
import MuiDialogTitle from "@mui/material/DialogTitle"
import Box from "@mui/material/Box"

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

export const DialogContent = React.forwardRef(function DialogContent(
  { className, maxWidth = "sm", children, ...props },
  ref
) {
  const { open, setOpen } = useDialogContext()

  return (
    <MuiDialog
      ref={ref}
      open={open}
      onClose={() => setOpen(false)}
      maxWidth={maxWidth}
      fullWidth
      {...props}
    >
      <MuiDialogContent dividers className={cn("flex flex-col gap-3", className)}>
        {children}
      </MuiDialogContent>
    </MuiDialog>
  )
})

export const DialogHeader = React.forwardRef(function DialogHeader({ className, ...props }, ref) {
  return <Box ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
})

export const DialogTitle = React.forwardRef(function DialogTitle({ className, ...props }, ref) {
  return <MuiDialogTitle ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
})

export const DialogFooter = React.forwardRef(function DialogFooter({ className, ...props }, ref) {
  return (
    <MuiDialogActions
      ref={ref}
      className={cn("flex flex-wrap justify-end gap-2 pt-4", className)}
      {...props}
    />
  )
})
