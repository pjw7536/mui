"use client"

import React from "react"
import { Tooltip as RechartsTooltip } from "recharts"

import { cn } from "@/lib/utils"

export const ChartContainer = React.forwardRef(function ChartContainer(
  { config = {}, className, style, children, ...props },
  ref
) {
  const cssVars = React.useMemo(() => {
    const entries = Object.entries(config)
    if (entries.length === 0) return {}
    return entries.reduce((acc, [key, value]) => {
      if (value?.color) {
        acc[`--color-${key}`] = value.color
      }
      return acc
    }, {})
  }, [config])

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{ ...cssVars, ...style }}
      {...props}
    >
      {children}
    </div>
  )
})

export function ChartTooltip(props) {
  return <RechartsTooltip {...props} />
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  formatter,
  className,
}) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const computedLabel = labelFormatter ? labelFormatter(label) : label

  return (
    <div
      className={cn(
        "min-w-[160px] rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-lg",
        className
      )}
    >
      <p className="mb-2 text-sm font-semibold">{computedLabel}</p>
      <div className="flex flex-col gap-1 text-sm">
        {payload.map((entry) => {
          const formatted = formatter
            ? formatter(entry.value, entry.name, entry)
            : [entry.value, entry.name]
          const valueLabel = Array.isArray(formatted) ? formatted[0] : entry.value
          const nameLabel = Array.isArray(formatted) ? formatted[1] : entry.name
          return (
            <div key={entry.dataKey ?? entry.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: entry.color ?? "var(--primary)" }}
              />
              <span className="font-medium">{nameLabel}</span>
              <span className="ml-auto tabular-nums">{valueLabel}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
