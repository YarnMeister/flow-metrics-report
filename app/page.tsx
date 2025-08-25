"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const sampleDeals = {
  "7d": [
    { id: "D001", metric: "Lead Conversion Time", startDate: "2024-01-15", endDate: "2024-01-18", days: 3 },
    { id: "D002", metric: "Lead Conversion Time", startDate: "2024-01-16", endDate: "2024-01-28", days: 12 },
    { id: "D003", metric: "Quote Conversion Time", startDate: "2024-01-17", endDate: "2024-01-25", days: 8 },
  ],
  "14d": [
    { id: "D001", metric: "Lead Conversion Time", startDate: "2024-01-15", endDate: "2024-01-18", days: 3 },
    { id: "D002", metric: "Lead Conversion Time", startDate: "2024-01-16", endDate: "2024-01-28", days: 12 },
    { id: "D004", metric: "Lead Conversion Time", startDate: "2024-01-10", endDate: "2024-01-25", days: 15 },
    { id: "D003", metric: "Quote Conversion Time", startDate: "2024-01-17", endDate: "2024-01-25", days: 8 },
    { id: "D005", metric: "Quote Conversion Time", startDate: "2024-01-12", endDate: "2024-01-14", days: 2 },
  ],
  // More sample data for other periods...
}

const calculateKPIs = (period: string) => {
  const deals = sampleDeals[period as keyof typeof sampleDeals] || []

  const metrics = [
    "Lead Conversion Time",
    "Quote Conversion Time",
    "Order Conversion Time",
    "Procurement Lead Time",
    "Manufacturing Lead Time",
    "Delivery Lead Time",
    "Payment Lead Time",
  ]

  return metrics.map((metric) => {
    const metricDeals = deals.filter((deal) => deal.metric === metric)
    if (metricDeals.length === 0) {
      // Fallback to static data if no deals for this metric
      const staticData = {
        "Lead Conversion Time": { average: 12, best: 3, worst: 45, trend: "up" },
        "Quote Conversion Time": { average: 8, best: 2, worst: 28, trend: "down" },
        "Order Conversion Time": { average: 15, best: 5, worst: 60, trend: "up" },
        "Procurement Lead Time": { average: 22, best: 10, worst: 90, trend: "stable" },
        "Manufacturing Lead Time": { average: 35, best: 20, worst: 120, trend: "down" },
        "Delivery Lead Time": { average: 7, best: 2, worst: 21, trend: "up" },
        "Payment Lead Time": { average: 18, best: 1, worst: 90, trend: "stable" },
      }
      return { title: metric, ...staticData[metric as keyof typeof staticData] }
    }

    const days = metricDeals.map((deal) => deal.days)
    const average = Math.round(days.reduce((sum, d) => sum + d, 0) / days.length)
    const best = Math.min(...days)
    const worst = Math.max(...days)

    return {
      title: metric,
      average,
      best,
      worst,
      trend: "stable" as const,
    }
  })
}

function SparklineIndicator({ trend }: { trend: string }) {
  const color = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"
  return (
    <div className={`flex items-center ${color}`}>
      <TrendingUp className="h-4 w-4" />
      <div className="ml-2 text-xs">{trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}</div>
    </div>
  )
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const kpiData = calculateKPIs(selectedPeriod)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">RTSE</span>
              </div>
              <h1 className="text-xl font-bold">Flow Efficiency</h1>
            </div>
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/timeline">Timeline</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/stage-mapping">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Lead Time Overview</h2>
            <p className="text-muted-foreground">Track efficiency across your sales pipeline stages</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Period:</span>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="14d">Last 14 days</SelectItem>
                <SelectItem value="1m">Last 1 month</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">{kpi.average} days</div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-green-600">Best: {kpi.best}d</div>
                    <div className="text-red-600">Worst: {kpi.worst}d</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Trend</span>
                    <SparklineIndicator trend={kpi.trend} />
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <Link href={`/metric-detail?metric=${encodeURIComponent(kpi.title)}&period=${selectedPeriod}`}>
                        More info
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/stage-mapping">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Configure Stages</span>
                </CardTitle>
                <CardDescription>Map Pipedrive stages to canonical lifecycle stages</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </main>
    </div>
  )
}
