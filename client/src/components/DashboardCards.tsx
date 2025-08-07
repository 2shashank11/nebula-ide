import {
  IconFileCode,
  IconCalendarEvent,
  IconFolderOpen,
  IconLayoutDashboard,
  IconTrendingUp,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DashboardCards() {

// {
//   totalProjects: 16,
//   totalFiles: 42,
//   lastProject: "nebula-cli-tool",
//   lastOpenedAt: "2025-06-12T10:33:00Z",
//   createdAt: "2024-01-12T09:00:00Z"
// }

  return (
    <div className="min-h-[90vh] w-full bg-background py-6 px-6 md:px-10 lg:px-20">
      <h2 className="mb-10 text-3xl font-bold tracking-tight text-center text-foreground">
        Your Developer Summary
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Projects */}
        <Card className="transition-all duration-300 hover:scale-[1.015] hover:shadow-xl bg-gradient-to-tr from-primary/10 to-card backdrop-blur-lg border border-primary/10">
          <CardHeader>
            <CardDescription>Total Projects</CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">16</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp className="mr-1 size-4" />
                +3 this month
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Active projects <IconLayoutDashboard className="size-4" />
            </div>
            <p className="text-muted-foreground">Up from 13 last month</p>
          </CardFooter>
        </Card>

        {/* Total Files Uploaded */}
        <Card className="transition-all duration-300 hover:scale-[1.015] hover:shadow-xl bg-gradient-to-tr from-secondary/10 to-card backdrop-blur-lg border border-secondary/10">
          <CardHeader>
            <CardDescription>Total Files</CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">42</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp className="mr-1 size-4" />
                +5 this week
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Files in IDE <IconFileCode className="size-4" />
            </div>
            <p className="text-muted-foreground">Includes code, media, and docs</p>
          </CardFooter>
        </Card>

        {/* Last Opened Project */}
        <Card className="transition-all duration-300 hover:scale-[1.015] hover:shadow-xl bg-gradient-to-tr from-accent/10 to-card backdrop-blur-lg border border-accent/10">
          <CardHeader>
            <CardDescription>Last Opened</CardDescription>
            <CardTitle className="text-xl font-semibold line-clamp-1">
              nebula-cli-tool
            </CardTitle>
            <CardAction>
              <Badge variant="outline">Just now</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Opened recently <IconFolderOpen className="size-4" />
            </div>
            <p className="text-muted-foreground">3 minutes ago</p>
          </CardFooter>
        </Card>

        {/* Account Created */}
        <Card className="transition-all duration-300 hover:scale-[1.015] hover:shadow-xl bg-gradient-to-tr from-muted/10 to-card backdrop-blur-lg border border-muted/10">
          <CardHeader>
            <CardDescription>Account Created</CardDescription>
            <CardTitle className="text-3xl font-bold text-foreground">
              Jan 12, 2024
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconCalendarEvent className="mr-1 size-4" />
                6 months ago
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Welcome aboard! 🎉
            </div>
            <p className="text-muted-foreground">Thanks for building with us</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
