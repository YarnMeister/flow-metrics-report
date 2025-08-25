"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// Sample deals data for detail view
const detailDeals = {
  "Lead Conversion Time": [
    { id: "D001", startDate: "2024-01-15", endDate: "2024-01-18", days: 3, status: "best" },
    { id: "D002", startDate: "2024-01-16", endDate: "2024-01-28", days: 12, status: "normal" },
    { id: "D004", startDate: "2024-01-10", endDate: "2024-01-25", days: 15, status: "normal" },
    { id: "D007", startDate: "2024-01-05", endDate: "2024-02-19", days: 45, status: "worst" },
    { id: "D008", startDate: "2024-01-12", endDate: "2024-01-20", days: 8, status: "normal" },
  ],
  "Quote Conversion Time": [
    { id: "D003", startDate: "2024-01-17", endDate: "2024-01-19", days: 2, status: "best" },
    { id: "D005", startDate: "2024-01-12", endDate: "2024-01-20", days: 8, status: "normal" },
    { id: "D006", startDate: "2024-01-08", endDate: "2024-01-15", days: 7, status: "normal" },
    { id: "D009", startDate: "2024-01-01", endDate: "2024-01-29", days: 28, status: "worst" },
  ],
  // Add more metrics as needed
}

function MetricDetailContent() {
  const searchParams = useSearchParams()
  const metric = searchParams.get("metric") || "Lead Conversion Time"
  const period = searchParams.get("period") || "7d"

  const deals = detailDeals[metric as keyof typeof detailDeals] || []
  const average = deals.length > 0 ? Math.round(deals.reduce((sum, deal) => sum + deal.days, 0) / deals.length) : 0
  const best = deals.length > 0 ? Math.min(...deals.map((d) => d.days)) : 0
  const worst = deals.length > 0 ? Math.max(...deals.map((d) => d.days)) : 0

  const periodLabels = {
    "7d": "Last 7 days",
    "14d": "Last 14 days",
    "1m": "Last 1 month",
    "3m": "Last 3 months",
    "6m": "Last 6 months",
    "12m": "Last 12 months",
  }

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
            <div>
              <h1 className="text-xl font-bold">{metric}</h1>
              <p className="text-sm text-muted-foreground">{periodLabels[period as keyof typeof periodLabels]}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{average} days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-600">Best Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{best} days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-red-600">Worst Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{worst} days</div>
            </CardContent>
          </Card>
        </div>

        {/* Deals Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Individual Deal Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Deal ID</th>
                    <th className="text-left py-3 px-2 font-medium">Start Date</th>
                    <th className="text-left py-3 px-2 font-medium">End Date</th>
                    <th className="text-left py-3 px-2 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr
                      key={deal.id}
                      className={`border-b hover:bg-muted/50 ${
                        deal.status === "best"
                          ? "bg-green-50 dark:bg-green-950/20"
                          : deal.status === "worst"
                            ? "bg-red-50 dark:bg-red-950/20"
                            : ""
                      }`}
                    >
                      <td className="py-3 px-2 font-mono text-sm">{deal.id}</td>
                      <td className="py-3 px-2 text-sm">{deal.startDate}</td>
                      <td className="py-3 px-2 text-sm">{deal.endDate}</td>
                      <td
                        className={`py-3 px-2 text-sm font-medium ${
                          deal.status === "best" ? "text-green-600" : deal.status === "worst" ? "text-red-600" : ""
                        }`}
                      >
                        {deal.days} days
                        {deal.status === "best" && (
                          <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                            BEST
                          </span>
                        )}
                        {deal.status === "worst" && (
                          <span className="ml-2 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                            WORST
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function MetricDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MetricDetailContent />
    </Suspense>
  )
}
