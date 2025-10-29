"use client"

import React from "react"

import { cn } from "@/lib/utils"

export const Input = React.forwardRef(function Input(
  { className, type = "text", size = "small", fullWidth = false, ...props },
  ref
) {
  const sizeClasses =
    size === "small"
      ? "h-9 px-3 text-sm"
      : size === "medium"
        ? "h-10 px-3.5 text-base"
        : "h-11 px-4 text-base"

  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "rounded-lg border border-input bg-background text-sm shadow-sm transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses,
        fullWidth ? "w-full" : undefined,
        className
      )}
      {...props}
    />
  )
})
