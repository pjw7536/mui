"use client"

import React from "react"

import { cn } from "@/lib/utils"

export const TableContainer = React.forwardRef(function TableContainer({ className, ...props }, ref) {
  return <div ref={ref} className={cn("w-full overflow-auto", className)} {...props} />
})

export const Table = React.forwardRef(function Table({ className, stickyHeader = false, ...props }, ref) {
  return (
    <table
      ref={ref}
      className={cn("w-full border-collapse text-sm", stickyHeader ? "[--table-sticky:true]" : undefined, className)}
      {...props}
    />
  )
})

export const TableHeader = React.forwardRef(function TableHeader({ className, ...props }, ref) {
  return <thead ref={ref} className={cn(className)} {...props} />
})

export const TableBody = React.forwardRef(function TableBody({ className, ...props }, ref) {
  return <tbody ref={ref} className={cn(className)} {...props} />
})

export const TableRow = React.forwardRef(function TableRow({ className, hover = true, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn(hover ? "transition-colors hover:bg-muted/40" : undefined, className)}
      {...props}
    />
  )
})

export const TableHead = React.forwardRef(function TableHead({ className, ...props }, ref) {
  return (
    <th
      ref={ref}
      scope="col"
      className={cn("whitespace-nowrap border-b border-border bg-muted/30 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground", className)}
      {...props}
    />
  )
})

export const TableCell = React.forwardRef(function TableCell({ className, ...props }, ref) {
  return <td ref={ref} className={cn("border-b border-border px-4 py-3", className)} {...props} />
})
