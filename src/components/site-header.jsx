import Link from "next/link"
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
      <div className="flex flex-col gap-1">
        <nav aria-label="breadcrumb">
          <ol className="flex items-center gap-2 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground">
              ›
            </li>
            <li className="text-muted-foreground">Line {lineId}</li>
          </ol>
        </nav>
        <h1 className="text-lg font-semibold leading-tight md:text-xl">Production line {lineId}</h1>
        <p className="text-sm text-muted-foreground">Last updated {updatedLabel}</p>
      </div>
      <div className="hidden items-center gap-2 md:flex">
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
      </div>
    </header>
  )
}
