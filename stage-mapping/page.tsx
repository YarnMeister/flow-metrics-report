import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Trash2, Save, Calendar } from "lucide-react"
import Link from "next/link"

const mappingVersions = [
  {
    id: "v1",
    version: "1.0",
    effectiveDate: "2024-01-01",
    createdBy: "Admin",
    status: "Active",
  },
  {
    id: "v2",
    version: "1.1",
    effectiveDate: "2024-02-15",
    createdBy: "Admin",
    status: "Draft",
  },
]

const canonicalMappings = [
  {
    id: "1",
    canonicalStage: "Lead Generated",
    startPipeline: "Sales Pipeline",
    startStage: "Lead In",
    endPipeline: "Sales Pipeline",
    endStage: "Qualified",
  },
  {
    id: "2",
    canonicalStage: "Qualification",
    startPipeline: "Sales Pipeline",
    startStage: "Qualified",
    endPipeline: "Sales Pipeline",
    endStage: "Proposal Made",
  },
  {
    id: "3",
    canonicalStage: "Proposal Sent",
    startPipeline: "Sales Pipeline",
    startStage: "Proposal Made",
    endPipeline: "Sales Pipeline",
    endStage: "Negotiation",
  },
  {
    id: "4",
    canonicalStage: "Negotiation",
    startPipeline: "Sales Pipeline",
    startStage: "Negotiation",
    endPipeline: "Sales Pipeline",
    endStage: "Won",
  },
  {
    id: "5",
    canonicalStage: "Order Received",
    startPipeline: "Sales Pipeline",
    startStage: "Won",
    endPipeline: "Fulfillment Pipeline",
    endStage: "Goods Ordered",
  },
  {
    id: "6",
    canonicalStage: "Procurement",
    startPipeline: "Fulfillment Pipeline",
    startStage: "Goods Ordered",
    endPipeline: "Fulfillment Pipeline",
    endStage: "In Production",
  },
  {
    id: "7",
    canonicalStage: "Manufacturing",
    startPipeline: "Fulfillment Pipeline",
    startStage: "In Production",
    endPipeline: "Fulfillment Pipeline",
    endStage: "Shipped",
  },
  {
    id: "8",
    canonicalStage: "Delivery",
    startPipeline: "Fulfillment Pipeline",
    startStage: "Shipped",
    endPipeline: "Fulfillment Pipeline",
    endStage: "Paid",
  },
]

// Canonical stages available for mapping
const canonicalStages = [
  "Lead Generated",
  "Qualification",
  "Proposal Sent",
  "Negotiation",
  "Order Received",
  "Procurement",
  "Manufacturing",
  "Delivery",
  "Payment",
]

const pipelineStages = {
  "Sales Pipeline": ["Lead In", "Qualified", "Proposal Made", "Negotiation", "Won"],
  "Fulfillment Pipeline": ["Goods Ordered", "In Production", "Shipped", "Paid"],
}

export default function StageMappingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-xl font-bold">Stage Mapping Configuration</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Mapping Version Management</h2>
          <p className="text-muted-foreground">
            Create and manage versions of your stage mapping configurations with effective dates.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Create New Version</CardTitle>
            <CardDescription>Save current mapping configuration as a new version</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Version Number</label>
                <Input placeholder="e.g., 1.2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Effective Date</label>
                <Input type="date" />
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save as New Version
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Version History</CardTitle>
            <CardDescription>View and manage existing mapping versions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mappingVersions.map((version) => (
                <div key={version.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Version {version.version}</div>
                      <div className="text-sm text-muted-foreground">
                        Effective: {version.effectiveDate} • Created by: {version.createdBy}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        version.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {version.status}
                    </span>
                    <Button variant="outline" size="sm">
                      Load
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Current Mappings</h2>
          <p className="text-muted-foreground">
            Define how canonical stages map to start and end stages across your pipelines.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Add New Canonical Stage Mapping</CardTitle>
            <CardDescription>Map a canonical stage to its start and end pipeline stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Canonical Stage</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select canonical stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {canonicalStages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Start Stage</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pipeline</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pipeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(pipelineStages).map((pipeline) => (
                          <SelectItem key={pipeline} value={pipeline}>
                            {pipeline}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stage</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lead In">Lead In</SelectItem>
                        <SelectItem value="Qualified">Qualified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm">End Stage</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pipeline</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pipeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(pipelineStages).map((pipeline) => (
                          <SelectItem key={pipeline} value={pipeline}>
                            {pipeline}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stage</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Qualified">Qualified</SelectItem>
                        <SelectItem value="Won">Won</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Mapping
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Canonical Stage Mappings</CardTitle>
            <CardDescription>Current mappings showing start and end stages for each canonical stage</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
              {canonicalMappings.map((mapping) => (
                <Card key={mapping.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Canonical Stage:</span>
                        <div className="font-medium text-primary">{mapping.canonicalStage}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Start:</span>
                          <div className="text-sm">{mapping.startPipeline}</div>
                          <div className="font-medium">{mapping.startStage}</div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">End:</span>
                          <div className="text-sm">{mapping.endPipeline}</div>
                          <div className="font-medium">{mapping.endStage}</div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Canonical Stage</th>
                      <th className="text-left py-3 px-4 font-medium">Start Pipeline</th>
                      <th className="text-left py-3 px-4 font-medium">Start Stage</th>
                      <th className="text-left py-3 px-4 font-medium">End Pipeline</th>
                      <th className="text-left py-3 px-4 font-medium">End Stage</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canonicalMappings.map((mapping) => (
                      <tr key={mapping.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-primary">{mapping.canonicalStage}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{mapping.startPipeline}</td>
                        <td className="py-3 px-4">{mapping.startStage}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{mapping.endPipeline}</td>
                        <td className="py-3 px-4">{mapping.endStage}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Configuration Help</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Canonical Stage:</strong> A standardized lifecycle stage that represents a business process phase
            </p>
            <p>
              <strong>Start Stage:</strong> The pipeline stage where this canonical stage begins (e.g., "Lead Generated"
              starts with "Lead In")
            </p>
            <p>
              <strong>End Stage:</strong> The pipeline stage where this canonical stage ends (e.g., "Lead Generated"
              ends with "Qualified")
            </p>
            <p>
              <strong>Versions:</strong> Save mapping configurations with effective dates to track changes over time
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
