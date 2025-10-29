"use client"

import React from "react"

import { cn } from "@/lib/utils"

function isComponentOfType(element, displayName) {
  return React.isValidElement(element) && element.type?.displayName === displayName
}

const SIZE_MAP = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-4 text-base",
}

export function Select({ value, defaultValue, onValueChange, label, disabled = false, children }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const isControlled = value !== undefined
  const actualValue = isControlled ? value ?? "" : internalValue

  const { triggerProps, placeholder, items } = React.useMemo(() => {
    const nextTriggerProps = {}
    const nextItems = []
    let nextPlaceholder = ""

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return
      if (isComponentOfType(child, "SelectTrigger")) {
        Object.assign(nextTriggerProps, child.props)
        React.Children.forEach(child.props.children, (triggerChild) => {
          if (isComponentOfType(triggerChild, "SelectValue")) {
            nextPlaceholder = triggerChild.props?.placeholder ?? ""
          }
        })
      } else if (isComponentOfType(child, "SelectContent")) {
        React.Children.forEach(child.props.children, (contentChild) => {
          if (isComponentOfType(contentChild, "SelectItem")) {
            nextItems.push(contentChild)
          }
        })
      }
    })

    return { triggerProps: nextTriggerProps, placeholder: nextPlaceholder, items: nextItems }
  }, [children])

  const sizeClasses = SIZE_MAP[triggerProps.size] ?? SIZE_MAP.sm
  const labelId = label ? `${label.toLowerCase().replace(/\s+/g, "-")}-label` : undefined

  const handleChange = React.useCallback(
    (event) => {
      const nextValue = event.target.value
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [isControlled, onValueChange]
  )

  const hasValue = actualValue !== "" && actualValue !== null && actualValue !== undefined

  const selectElement = (
    <select
      id={triggerProps.id}
      aria-label={triggerProps["aria-label"]}
      aria-labelledby={labelId}
      className={cn(
        "w-full appearance-none rounded-lg border border-input bg-background text-left text-sm shadow-sm transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses,
        triggerProps.className
      )}
      value={actualValue}
      onChange={handleChange}
      disabled={disabled}
    >
      <option value="" disabled={placeholder !== ""}>
        {placeholder || "Select…"}
      </option>
      {items.map((item) => (
        <option key={item.props.value} value={item.props.value} disabled={item.props.disabled}>
          {item.props.children}
        </option>
      ))}
    </select>
  )

  return (
    <div className={cn("relative flex min-w-[10rem] flex-col", triggerProps.wrapperClassName)}>
      {label ? (
        <label htmlFor={triggerProps.id} id={labelId} className="mb-1 text-xs font-medium text-muted-foreground">
          {label}
        </label>
      ) : null}
      <div className="relative w-full">
        {selectElement}
        {!hasValue && placeholder ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {placeholder}
          </span>
        ) : null}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
Select.displayName = "Select"

export function SelectTrigger(props) {
  return null
}
SelectTrigger.displayName = "SelectTrigger"

export function SelectContent({ children }) {
  return <>{children}</>
}
SelectContent.displayName = "SelectContent"

export function SelectItem({ value, children, disabled }) {
  return <option value={value} disabled={disabled}>{children}</option>
}
SelectItem.displayName = "SelectItem"

export function SelectValue() {
  return null
}
SelectValue.displayName = "SelectValue"
