"use client"

import React from "react"
import MuiCheckbox from "@mui/material/Checkbox"

import { cn } from "@/lib/utils"

export const Checkbox = React.forwardRef(function Checkbox(
  { className, indeterminate = false, checked, defaultChecked, onCheckedChange, ...props },
  ref
) {
  return (
    <MuiCheckbox
      ref={ref}
      indeterminate={indeterminate}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={(event, nextChecked) => {
        onCheckedChange?.(nextChecked)
      }}
      className={cn(className)}
      {...props}
    />
  )
})
