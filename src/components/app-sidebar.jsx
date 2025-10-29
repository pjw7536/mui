import { getDistinctLineIds } from "@/features/line-dashboard/api"

export async function AppSidebar({ currentLine, activeSection = "dashboard" }) {
  const lineIds = await getDistinctLineIds()

  return (
    <aside
      className="hidden h-full shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex"
      style={{ width: "var(--sidebar-width, 320px)" }}
    >
      <div className="flex w-full flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Control Center</p>
          <h2 className="text-base font-semibold">Line Operations</h2>
        </div>

        <div className="h-px bg-sidebar-border/60" />

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Lines</p>
          <ul className="flex flex-col gap-2">
            {lineIds.map((lineId) => {
              const dashboardHref = `/${encodeURIComponent(lineId)}/dashboard`
              const analyticsHref = `/${encodeURIComponent(lineId)}/analytics`
              const isCurrentLine = currentLine === lineId
              const isDashboardActive = isCurrentLine && activeSection === "dashboard"
              const isAnalyticsActive = isCurrentLine && activeSection === "analytics"

              return (
                <li key={lineId} className="rounded-lg" data-current-line={isCurrentLine ? "true" : undefined}>
                  <a
                    href={dashboardHref}
                    className={
                      "flex w-full flex-col gap-1 rounded-lg border border-transparent bg-sidebar/40 px-3 py-2 text-sm transition-colors " +
                      "hover:border-sidebar-border hover:bg-sidebar/70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                    }
                    aria-current={isCurrentLine ? "page" : undefined}
                  >
                    <span className="font-medium">
                      {lineId}
                      {isCurrentLine ? <span className="ml-2 text-xs text-muted-foreground">(current)</span> : null}
                    </span>
                    <span className="text-xs text-muted-foreground">Dashboard overview</span>
                  </a>
                  {isCurrentLine ? (
                    <ul className="mt-2 flex flex-col gap-1 border-l border-sidebar-border/60 pl-4 text-sm">
                      <li>
                        <a
                          href={dashboardHref}
                          className={`block rounded-md px-2 py-1 transition-colors hover:bg-sidebar/60 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sidebar-ring ${
                            isDashboardActive ? "bg-sidebar-primary/10 font-medium" : ""
                          }`}
                          aria-current={isDashboardActive ? "page" : undefined}
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href={analyticsHref}
                          className={`block rounded-md px-2 py-1 transition-colors hover:bg-sidebar/60 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sidebar-ring ${
                            isAnalyticsActive ? "bg-sidebar-primary/10 font-medium" : ""
                          }`}
                          aria-current={isAnalyticsActive ? "page" : undefined}
                        >
                          Analytics
                        </a>
                      </li>
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ul>
          {lineIds.length === 0 ? (
            <div className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
              No production lines found.
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
