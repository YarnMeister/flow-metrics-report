import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Clock, CheckCircle, Circle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Sample deal data
const deals = [
  { id: "1", name: "Acme Corp - Software License", value: "$50,000" },
  { id: "2", name: "TechStart - Consulting Services", value: "$25,000" },
  { id: "3", name: "Global Inc - Hardware Purchase", value: "$75,000" },
]

// Sample timeline data for selected deal
const timelineStages = [
  {
    name: "Lead Generated",
    startDate: "2024-01-15T09:00:00Z",
    endDate: "2024-01-15T09:00:00Z",
    duration: 0,
    status: "completed",
  },
  {
    name: "Qualification",
    startDate: "2024-01-15T09:00:00Z",
    endDate: "2024-01-18T17:00:00Z",
    duration: 3,
    status: "completed",
  },
  {
    name: "Proposal Sent",
    startDate: "2024-01-18T17:00:00Z",
    endDate: "2024-01-25T14:30:00Z",
    duration: 7,
    status: "completed",
  },
  {
    name: "Negotiation",
    startDate: "2024-01-25T14:30:00Z",
    endDate: "2024-02-02T16:00:00Z",
    duration: 8,
    status: "completed",
  },
  {
    name: "Order Received",
    startDate: "2024-02-02T16:00:00Z",
    endDate: "2024-02-05T10:00:00Z",
    duration: 3,
    status: "completed",
  },
  {
    name: "Procurement",
    startDate: "2024-02-05T10:00:00Z",
    endDate: null,
    duration: 12, // current duration
    status: "current",
  },
  {
    name: "Manufacturing",
    startDate: null,
    endDate: null,
    duration: 0,
    status: "future",
  },
  {
    name: "Delivery",
    startDate: null,
    endDate: null,
    duration: 0,
    status: "future",
  },
  {
    name: "Payment",
    startDate: null,
    endDate: null,
    duration: 0,
    status: "future",
  },
]

function StageIcon({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case "current":
      return <AlertCircle className="h-5 w-5 text-blue-500" />
    default:
      return <Circle className="h-5 w-5 text-gray-400" />
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return "—"
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Pipeline Stage Timeline</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Deal Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Deal</label>
          <Select defaultValue="1">
            <SelectTrigger className="w-full md:w-96">
              <SelectValue placeholder="Choose a deal to view timeline" />
            </SelectTrigger>
            <SelectContent>
              {deals.map((deal) => (
                <SelectItem key={deal.id} value={deal.id}>
                  <div className="flex flex-col">
                    <span>{deal.name}</span>
                    <span className="text-sm text-muted-foreground">{deal.value}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Deal Lifecycle Stages</h2>

          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden space-y-4">
            {timelineStages.map((stage, index) => (
              <Card
                key={index}
                className={`${
                  stage.status === "completed"
                    ? "border-green-200 bg-green-50/50"
                    : stage.status === "current"
                      ? "border-blue-200 bg-blue-50/50"
                      : "border-gray-200 bg-gray-50/50"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <StageIcon status={stage.status} />
                    <CardTitle className="text-base">{stage.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Started:</span>
                      <div className="font-medium">{formatDate(stage.startDate)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ended:</span>
                      <div className="font-medium">{formatDate(stage.endDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{stage.duration > 0 ? `${stage.duration} days` : "—"}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Timeline - Horizontal */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200"></div>

              {/* Timeline Stages */}
              <div className="grid grid-cols-9 gap-2">
                {timelineStages.map((stage, index) => (
                  <div key={index} className="relative">
                    {/* Stage Dot */}
                    <div className="flex justify-center mb-4">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          stage.status === "completed"
                            ? "bg-green-500 border-green-500"
                            : stage.status === "current"
                              ? "bg-blue-500 border-blue-500"
                              : "bg-white border-gray-300"
                        }`}
                      ></div>
                    </div>

                    {/* Stage Card */}
                    <Card
                      className={`${
                        stage.status === "completed"
                          ? "border-green-200"
                          : stage.status === "current"
                            ? "border-blue-200"
                            : "border-gray-200"
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs text-center">{stage.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs text-center space-y-1">
                        <div className="text-muted-foreground">{formatDate(stage.startDate)}</div>
                        <div className="text-muted-foreground">{formatDate(stage.endDate)}</div>
                        <div className="font-medium">{stage.duration > 0 ? `${stage.duration}d` : "—"}</div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">33 days</div>
              <p className="text-xs text-muted-foreground">From lead to current stage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Completed Stages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 / 9</div>
              <p className="text-xs text-muted-foreground">Pipeline progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Current Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 days</div>
              <p className="text-xs text-muted-foreground">In procurement</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
