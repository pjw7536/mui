"use client"

import React from "react"
import Chip from "@mui/material/Chip"

import { cn } from "@/lib/utils"

const VARIANT_MAP = {
  outline: "outlined",
  default: "filled",
}

export const Badge = React.forwardRef(function Badge(
  { className, color = "default", variant = "default", children, ...props },
  ref
) {
  const muiVariant = VARIANT_MAP[variant] ?? "filled"

  return (
    <Chip
      ref={ref}
      variant={muiVariant}
      color={color === "default" ? undefined : color}
      className={cn("rounded-full px-1.5 text-xs font-medium", className)}
      label={<span className="inline-flex items-center gap-1">{children}</span>}
      {...props}
    />
  )
})
