"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockJDs = [
  {
    id: 1,
    jobTitle: "Senior Software Engineer",
    experience: "5-7 years",
    mustHaveSkills: ["React", "Node.js", "TypeScript", "AWS"],
    goodToHaveSkills: ["GraphQL", "Docker", "Kubernetes"],
    qualification: "Bachelor's in Computer Science or related field",
    createdAt: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    jobTitle: "Data Analyst",
    experience: "2-4 years",
    mustHaveSkills: ["Python", "SQL", "Tableau", "Statistics"],
    goodToHaveSkills: ["R", "Machine Learning", "Power BI"],
    qualification: "Bachelor's in Data Science, Statistics, or related field",
    createdAt: "2024-01-12",
    status: "Active",
  },
  {
    id: 3,
    jobTitle: "Product Manager",
    experience: "4-6 years",
    mustHaveSkills: ["Product Strategy", "Agile", "Analytics", "Stakeholder Management"],
    goodToHaveSkills: ["Technical Background", "Design Thinking", "A/B Testing"],
    qualification: "MBA or Bachelor's in Business, Engineering, or related field",
    createdAt: "2024-01-10",
    status: "Draft",
  },
]

export default function JDListPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Job Descriptions</h1>
                  <p className="text-muted-foreground">Manage your job requirements and specifications</p>
                </div>
              </div>

              <Link href="/jd/new">
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New JD
                </Button>
              </Link>
            </div>

            {/* Search and Filters */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search job descriptions..." className="pl-10" />
                  </div>
                  <Button variant="outline">Filter</Button>
                </div>
              </CardContent>
            </Card>

            {/* JD List */}
            <div className="grid gap-6">
              {mockJDs.map((jd) => (
                <Card key={jd.id} className="border-border/50 hover:border-border transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{jd.jobTitle}</CardTitle>
                        <CardDescription className="text-base">
                          Experience: {jd.experience} • Created: {new Date(jd.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={jd.status === "Active" ? "default" : "secondary"}>{jd.status}</Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-2">Must-have Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {jd.mustHaveSkills.map((skill, index) => (
                          <Badge key={index} variant="default" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-2">Good-to-have Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {jd.goodToHaveSkills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-2">Qualification</h4>
                      <p className="text-sm text-muted-foreground">{jd.qualification}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
