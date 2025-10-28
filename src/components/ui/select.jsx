"use client"

import React from "react"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import MuiSelect from "@mui/material/Select"

import { cn } from "@/lib/utils"

function isComponentOfType(element, displayName) {
  return React.isValidElement(element) && element.type?.displayName === displayName
}

export function Select({ value, defaultValue, onValueChange, label, disabled = false, children }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const isControlled = value !== undefined
  const actualValue = isControlled ? value : internalValue

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

  const sizeProp =
    triggerProps.size === "sm"
      ? "small"
      : triggerProps.size === "lg"
        ? "medium"
        : triggerProps.size === "md"
          ? "medium"
          : "small"
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

  const renderValue = (selected) => {
    if (selected === "" || selected === null || selected === undefined) {
      return placeholder || "Select…"
    }
    const match = items.find((item) => item.props.value === selected)
    return match?.props?.children ?? selected
  }

  return (
    <FormControl
      size={sizeProp}
      disabled={disabled}
      className={cn("min-w-[10rem]", triggerProps.className)}
    >
      {label ? <InputLabel id={labelId}>{label}</InputLabel> : null}
      <MuiSelect
        labelId={labelId}
        value={actualValue}
        displayEmpty
        onChange={handleChange}
        renderValue={renderValue}
        aria-label={triggerProps["aria-label"]}
      >
        {placeholder ? (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        ) : null}
        {items.map((item) =>
          React.cloneElement(item, {
            key: item.props.value,
          })
        )}
      </MuiSelect>
    </FormControl>
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

export function SelectItem({ value, children, className, ...props }) {
  return (
    <MenuItem value={value} className={cn(className)} {...props}>
      {children}
    </MenuItem>
  )
}
SelectItem.displayName = "SelectItem"

export function SelectValue() {
  return null
}
SelectValue.displayName = "SelectValue"
