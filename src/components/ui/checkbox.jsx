"use client"

import React from "react"

import { cn } from "@/lib/utils"

export const Checkbox = React.forwardRef(function Checkbox(
  { className, indeterminate = false, checked, defaultChecked, onCheckedChange, ...props },
  ref
) {
  const internalRef = React.useRef(null)
  const mergedRef = React.useCallback(
    (node) => {
      internalRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  React.useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <input
      ref={mergedRef}
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-input bg-background text-primary transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={(event) => {
        onCheckedChange?.(event.target.checked)
      }}
      {...props}
    />
  )
})
