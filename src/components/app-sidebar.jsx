import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { getDistinctLineIds } from "@/features/line-dashboard/api"

export async function AppSidebar({ currentLine, activeSection = "dashboard" }) {
  const lineIds = await getDistinctLineIds()

  return (
    <aside
      className="hidden h-full shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex"
      style={{ width: "var(--sidebar-width, 320px)" }}
    >
      <Stack spacing={3} className="w-full p-4">
        <Box>
          <Typography variant="overline" className="text-xs font-semibold uppercase text-muted-foreground">
            Control Center
          </Typography>
          <Typography variant="h6" className="font-semibold text-base">
            Line Operations
          </Typography>
        </Box>

        <Divider className="border-sidebar-border" />

        <List
          dense
          disablePadding
          subheader={
            <ListSubheader disableSticky component="div" className="mb-1 pl-0 text-xs font-semibold uppercase text-muted-foreground">
              Lines
            </ListSubheader>
          }
        >
          {lineIds.map((lineId) => {
            const dashboardHref = `/${encodeURIComponent(lineId)}/dashboard`
            const analyticsHref = `/${encodeURIComponent(lineId)}/analytics`
            const isCurrentLine = currentLine === lineId
            const isDashboardActive = isCurrentLine && activeSection === "dashboard"
            const isAnalyticsActive = isCurrentLine && activeSection === "analytics"

            return (
              <Box
                key={lineId}
                className="mb-2 rounded-lg border border-transparent"
                data-current-line={isCurrentLine ? "true" : undefined}
              >
                <ListItemButton
                  component="a"
                  href={dashboardHref}
                  selected={isCurrentLine}
                  className="rounded-lg"
                >
                  <ListItemText
                    primary={
                      <span className="text-sm font-medium">
                        {lineId}
                        {isCurrentLine ? <span className="ml-2 text-xs text-muted-foreground">(current)</span> : null}
                      </span>
                    }
                    secondary={<span className="text-xs text-muted-foreground">Dashboard overview</span>}
                  />
                </ListItemButton>
                {isCurrentLine ? (
                  <List component="div" disablePadding className="pl-4">
                    <ListItemButton
                      component="a"
                      href={dashboardHref}
                      dense
                      className="rounded-lg text-sm"
                      selected={isDashboardActive}
                    >
                      <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href={analyticsHref}
                      dense
                      className="rounded-lg text-sm"
                      selected={isAnalyticsActive}
                    >
                      <ListItemText primary="Analytics" />
                    </ListItemButton>
                  </List>
                ) : null}
              </Box>
            )
          })}
          {lineIds.length === 0 ? (
            <Box className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
              No production lines found.
            </Box>
          ) : null}
        </List>
      </Stack>
    </aside>
  )
}
