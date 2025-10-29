"use client"

import React from "react"

import { cn } from "@/lib/utils"

export const Card = React.forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("rounded-2xl border border-border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
})

export const CardHeader = React.forwardRef(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex flex-col gap-1 p-6", className)} {...props} />
})

export const CardContent = React.forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex flex-col gap-3 p-6 pt-0", className)} {...props} />
})

export const CardFooter = React.forwardRef(function CardFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex items-center gap-2 p-6 pt-0", className)} {...props} />
})

export const CardTitle = React.forwardRef(function CardTitle({ className, ...props }, ref) {
  return <h2 ref={ref} className={cn("text-lg font-semibold leading-tight", className)} {...props} />
})

export const CardDescription = React.forwardRef(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
})

export const CardAction = React.forwardRef(function CardAction({ className, ...props }, ref) {
  return <div ref={ref} className={cn("ml-auto", className)} {...props} />
})
