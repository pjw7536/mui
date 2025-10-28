import Link from "next/link"
import Box from "@mui/material/Box"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

function formatUpdatedAt(input) {
  if (!input) return "No recent updates"
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return "No recent updates"
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function SiteHeader({ lineId, lastUpdatedAt }) {
  const updatedLabel = formatUpdatedAt(lastUpdatedAt)

  return (
    <header
      className="flex h-[var(--header-height,80px)] items-center justify-between border-b border-border bg-background px-6"
      role="banner"
    >
      <Stack spacing={1}>
        <Breadcrumbs separator="›" aria-label="breadcrumb" className="text-xs text-muted-foreground">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Typography component="span" className="text-muted-foreground">
            Line {lineId}
          </Typography>
        </Breadcrumbs>
        <Typography variant="h5" className="font-semibold">
          Production line {lineId}
        </Typography>
        <Typography variant="body2" className="text-sm text-muted-foreground">
          Last updated {updatedLabel}
        </Typography>
      </Stack>
      <Box className="hidden gap-2 md:flex">
        <Link
          href={`/${encodeURIComponent(lineId)}/dashboard`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Dashboard
        </Link>
        <Link
          href={`/${encodeURIComponent(lineId)}/analytics`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Analytics
        </Link>
      </Box>
    </header>
  )
}
