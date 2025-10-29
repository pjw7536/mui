"use client"

import React from "react"

import { cn } from "@/lib/utils"

const VARIANTS = {
  default:
    "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  primary:
    "inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  outline:
    "inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  ghost:
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  text:
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  link:
    "inline-flex items-center justify-center rounded-full px-0 py-2 text-sm font-medium text-primary underline-offset-4 transition hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
}

const SIZES = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-6 text-base",
}

export const Button = React.forwardRef(function Button(
  { variant = "default", size = "md", className, type = "button", ...props },
  ref
) {
  const baseStyles = VARIANTS[variant] ?? VARIANTS.default
  const sizeStyles = SIZES[size] ?? SIZES.md

  return (
    <button ref={ref} type={type} className={cn(baseStyles, sizeStyles, className)} {...props} />
  )
})
