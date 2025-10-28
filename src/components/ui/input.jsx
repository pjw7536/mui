"use client"

import React from "react"
import OutlinedInput from "@mui/material/OutlinedInput"

import { cn } from "@/lib/utils"

export const Input = React.forwardRef(function Input(
  { className, type = "text", size = "small", fullWidth = false, ...props },
  ref
) {
  return (
    <OutlinedInput
      ref={ref}
      type={type}
      size={size}
      fullWidth={fullWidth}
      className={cn("rounded-lg bg-background", className)}
      {...props}
    />
  )
})
