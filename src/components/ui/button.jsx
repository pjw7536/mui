"use client"

import React from "react"
import MuiButton from "@mui/material/Button"

import { cn } from "@/lib/utils"

const VARIANT_MAP = {
  default: "contained",
  primary: "contained",
  outline: "outlined",
  outlined: "outlined",
  ghost: "text",
  text: "text",
  link: "text",
}

const SIZE_MAP = {
  sm: "small",
  md: "medium",
  lg: "large",
}

export const Button = React.forwardRef(function Button(
  { variant = "default", size = "md", className, disableElevation = true, ...props },
  ref
) {
  const muiVariant = VARIANT_MAP[variant] ?? "contained"
  const muiSize = SIZE_MAP[size] ?? "medium"

  return (
    <MuiButton
      ref={ref}
      variant={muiVariant}
      size={muiSize}
      disableElevation={disableElevation}
      className={cn("normal-case", className)}
      {...props}
    />
  )
})
