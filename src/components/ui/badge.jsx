"use client"

import React from "react"

import { cn } from "@/lib/utils"

const VARIANTS = {
  default: "bg-muted text-foreground",
  outline: "border border-input bg-transparent text-foreground",
}

const COLOR_OVERRIDES = {
  default: "",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/20 text-secondary-foreground",
  destructive: "bg-destructive/10 text-destructive",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
}

export const Badge = React.forwardRef(function Badge(
  { className, color = "default", variant = "default", children, ...props },
  ref
) {
  const baseVariant = VARIANTS[variant] ?? VARIANTS.default
  const colorStyles = COLOR_OVERRIDES[color] ?? COLOR_OVERRIDES.default

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        baseVariant,
        colorStyles,
        className
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1">{children}</span>
    </span>
  )
})
