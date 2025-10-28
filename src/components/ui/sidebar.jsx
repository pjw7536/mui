"use client"

import React from "react"

import { cn } from "@/lib/utils"

export const SidebarProvider = React.forwardRef(function SidebarProvider(
  { className, style, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      style={style}
      className={cn("flex min-h-screen w-full bg-background text-foreground", className)}
      {...props}
    >
      {children}
    </div>
  )
})

export const SidebarInset = React.forwardRef(function SidebarInset(
  { className, children, as = "main", ...props },
  ref
) {
  const component = as ?? "main"
  return React.createElement(
    component,
    {
      ref,
      className: cn("flex min-h-screen flex-1 flex-col bg-background", className),
      ...props,
    },
    children
  )
})
