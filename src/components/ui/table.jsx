"use client"

import React from "react"
import MuiTable from "@mui/material/Table"
import MuiTableBody from "@mui/material/TableBody"
import MuiTableCell from "@mui/material/TableCell"
import MuiTableContainer from "@mui/material/TableContainer"
import MuiTableHead from "@mui/material/TableHead"
import MuiTableRow from "@mui/material/TableRow"

import { cn } from "@/lib/utils"

export const Table = React.forwardRef(function Table({ className, stickyHeader = false, ...props }, ref) {
  return (
    <MuiTableContainer className={cn(className)}>
      <MuiTable ref={ref} stickyHeader={stickyHeader} size="small" {...props} />
    </MuiTableContainer>
  )
})

export const TableHeader = React.forwardRef(function TableHeader({ className, ...props }, ref) {
  return <MuiTableHead ref={ref} className={cn(className)} {...props} />
})

export const TableBody = React.forwardRef(function TableBody({ className, ...props }, ref) {
  return <MuiTableBody ref={ref} className={cn(className)} {...props} />
})

export const TableRow = React.forwardRef(function TableRow({ className, hover = true, ...props }, ref) {
  return <MuiTableRow ref={ref} hover={hover} className={cn(className)} {...props} />
})

export const TableHead = React.forwardRef(function TableHead({ className, ...props }, ref) {
  return (
    <MuiTableCell
      ref={ref}
      component="th"
      scope="col"
      className={cn("font-semibold", className)}
      {...props}
    />
  )
})

export const TableCell = React.forwardRef(function TableCell({ className, ...props }, ref) {
  return <MuiTableCell ref={ref} className={cn(className)} {...props} />
})
