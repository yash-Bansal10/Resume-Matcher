"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Download, Eye, Share, ArrowLeft, MoreHorizontal, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    candidateName: "Sarah Johnson",
    resumeFile: "sarah_johnson_resume.pdf",
    jobRole: "Senior Software Engineer",
    relevanceScore: 92,
    verdict: "High",
    location: "San Francisco, CA",
    missingSkills: ["Kubernetes", "GraphQL"],
    improvementFeedback: "Strong technical background. Consider gaining experience with container orchestration.",
    appliedDate: "2024-01-15",
  },
  {
    id: 2,
    candidateName: "Michael Chen",
    resumeFile: "michael_chen_resume.pdf",
    jobRole: "Senior Software Engineer",
    relevanceScore: 78,
    verdict: "Medium",
    location: "New York, NY",
    missingSkills: ["AWS", "TypeScript", "Docker"],
    improvementFeedback: "Good programming skills but lacks cloud experience. Recommend AWS certification.",
    appliedDate: "2024-01-14",
  },
  {
    id: 3,
    candidateName: "Emily Rodriguez",
    resumeFile: "emily_rodriguez_resume.pdf",
    jobRole: "Data Analyst",
    relevanceScore: 95,
    verdict: "High",
    location: "Austin, TX",
    missingSkills: ["R"],
    improvementFeedback: "Excellent analytical skills and Python expertise. Perfect fit for the role.",
    appliedDate: "2024-01-13",
  },
  {
    id: 4,
    candidateName: "David Kim",
    resumeFile: "david_kim_resume.pdf",
    jobRole: "Product Manager",
    relevanceScore: 65,
    verdict: "Medium",
    location: "Seattle, WA",
    missingSkills: ["Agile", "A/B Testing", "Analytics"],
    improvementFeedback: "Strong business background but limited product management experience.",
    appliedDate: "2024-01-12",
  },
  {
    id: 5,
    candidateName: "Lisa Wang",
    resumeFile: "lisa_wang_resume.pdf",
    jobRole: "Data Analyst",
    relevanceScore: 45,
    verdict: "Low",
    location: "Chicago, IL",
    missingSkills: ["Python", "SQL", "Tableau", "Statistics"],
    improvementFeedback: "Entry-level candidate. Needs significant upskilling in data analysis tools.",
    appliedDate: "2024-01-11",
  },
  {
    id: 6,
    candidateName: "James Wilson",
    resumeFile: "james_wilson_resume.pdf",
    jobRole: "Senior Software Engineer",
    relevanceScore: 88,
    verdict: "High",
    location: "Boston, MA",
    missingSkills: ["React Native"],
    improvementFeedback: "Solid full-stack developer with strong backend skills. Great candidate.",
    appliedDate: "2024-01-10",
  },
]

const jobRoles = ["All Roles", "Senior Software Engineer", "Data Analyst", "Product Manager"]
const verdicts = ["All Verdicts", "High", "Medium", "Low"]
const locations = [
  "All Locations",
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Chicago, IL",
  "Boston, MA",
]

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJobRole, setSelectedJobRole] = useState("All Roles")
  const [selectedVerdict, setSelectedVerdict] = useState("All Verdicts")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [scoreRange, setScoreRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)

  // Filter results based on current filters
  const filteredResults = mockResults.filter((result) => {
    const matchesSearch =
      result.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesJobRole = selectedJobRole === "All Roles" || result.jobRole === selectedJobRole
    const matchesVerdict = selectedVerdict === "All Verdicts" || result.verdict === selectedVerdict
    const matchesLocation = selectedLocation === "All Locations" || result.location === selectedLocation
    const matchesScore = result.relevanceScore >= scoreRange[0] && result.relevanceScore <= scoreRange[1]

    return matchesSearch && matchesJobRole && matchesVerdict && matchesLocation && matchesScore
  })

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "High":
        return "bg-accent text-accent-foreground"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
      case "Low":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const exportResults = (format: "csv" | "pdf") => {
    // Simulate export functionality
    console.log(`Exporting ${filteredResults.length} results as ${format.toUpperCase()}`)
    // In a real app, this would trigger a download
  }

  const downloadResume = (filename: string) => {
    // Simulate resume download
    console.log(`Downloading resume: ${filename}`)
  }

  const shareCandidate = (candidateId: number) => {
    // Simulate sharing functionality
    console.log(`Sharing candidate ${candidateId}`)
  }

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
                  <h1 className="text-3xl font-bold text-foreground">Results Dashboard</h1>
                  <p className="text-muted-foreground">
                    Review and manage candidate evaluations ({filteredResults.length} results)
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => exportResults("csv")}>Export Shortlist (CSV)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportResults("pdf")}>Export Shortlist (PDF)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => exportResults("csv")}>Export Feedback (CSV)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Filters */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters & Search</CardTitle>
                  <Button variant="ghost" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="mr-2 h-4 w-4" />
                    {showFilters ? "Hide" : "Show"} Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates or job roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Role</label>
                      <Select value={selectedJobRole} onValueChange={setSelectedJobRole}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {jobRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Verdict</label>
                      <Select value={selectedVerdict} onValueChange={setSelectedVerdict}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {verdicts.map((verdict) => (
                            <SelectItem key={verdict} value={verdict}>
                              {verdict}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Score Range: {scoreRange[0]}% - {scoreRange[1]}%
                      </label>
                      <Slider
                        value={scoreRange}
                        onValueChange={setScoreRange}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Table */}
            <Card className="border-border/50">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead className="w-[180px]">Candidate Name</TableHead>
                        <TableHead className="w-[150px]">Resume File</TableHead>
                        <TableHead className="w-[180px]">Job Role</TableHead>
                        <TableHead className="w-[120px]">Score</TableHead>
                        <TableHead className="w-[100px]">Verdict</TableHead>
                        <TableHead className="w-[200px]">Missing Skills</TableHead>
                        <TableHead className="w-[300px]">Feedback</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResults.map((result) => (
                        <TableRow key={result.id} className="border-border/50 hover:bg-muted/30">
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-medium">{result.candidateName}</p>
                              <p className="text-xs text-muted-foreground">{result.location}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => downloadResume(result.resumeFile)}
                              className="h-auto p-1 text-xs hover:text-primary"
                            >
                              <FileText className="mr-1 h-3 w-3" />
                              {result.resumeFile.length > 15
                                ? `${result.resumeFile.substring(0, 15)}...`
                                : result.resumeFile}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{result.jobRole}</p>
                              <p className="text-xs text-muted-foreground">
                                Applied: {new Date(result.appliedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{result.relevanceScore}%</span>
                              </div>
                              <Progress value={result.relevanceScore} className="h-2 w-full" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getVerdictColor(result.verdict)}>{result.verdict}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {result.missingSkills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {result.missingSkills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{result.missingSkills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-xs text-muted-foreground line-clamp-2">{result.improvementFeedback}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => downloadResume(result.resumeFile)}
                                className="h-8 w-8"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => shareCandidate(result.id)}
                                className="h-8 w-8"
                              >
                                <Share className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Send Feedback
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredResults.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No results match your current filters.</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedJobRole("All Roles")
                        setSelectedVerdict("All Verdicts")
                        setSelectedLocation("All Locations")
                        setScoreRange([0, 100])
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
