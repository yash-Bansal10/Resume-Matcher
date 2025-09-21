"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart as BarChart3,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  TrendingUp,
  Users,
  FileText,
  Target,
  ArrowLeft,
  Calendar,
  Download,
  PieChartIcon,
  Activity,
  Sparkles,
  Zap,
} from "lucide-react"
import Link from "next/link"

// Mock analytics data
const resumesPerJD = [
  { name: "Senior Software Engineer", resumes: 145, applications: 89 },
  { name: "Data Analyst", resumes: 98, applications: 67 },
  { name: "Product Manager", resumes: 76, applications: 45 },
  { name: "UI/UX Designer", resumes: 54, applications: 32 },
  { name: "DevOps Engineer", resumes: 43, applications: 28 },
]

const verdictDistribution = [
  { name: "High Fit", value: 23, percentage: 18.4, color: "hsl(var(--accent))" },
  { name: "Medium Fit", value: 67, percentage: 53.6, color: "hsl(45, 93%, 47%)" },
  { name: "Low Fit", value: 35, percentage: 28.0, color: "hsl(var(--destructive))" },
]

const topMissingSkills = [
  { skill: "Kubernetes", count: 34, percentage: 68 },
  { skill: "AWS", count: 28, percentage: 56 },
  { skill: "Docker", count: 25, percentage: 50 },
  { skill: "GraphQL", count: 22, percentage: 44 },
  { skill: "TypeScript", count: 19, percentage: 38 },
  { skill: "React Native", count: 16, percentage: 32 },
  { skill: "Machine Learning", count: 14, percentage: 28 },
  { skill: "A/B Testing", count: 12, percentage: 24 },
]

const monthlyTrends = [
  { month: "Oct", applications: 89, shortlisted: 23 },
  { month: "Nov", applications: 124, shortlisted: 31 },
  { month: "Dec", applications: 156, shortlisted: 42 },
  { month: "Jan", applications: 187, shortlisted: 48 },
]

export default function InsightsPage() {
  const totalResumes = resumesPerJD.reduce((sum, item) => sum + item.resumes, 0)
  const totalApplications = resumesPerJD.reduce((sum, item) => sum + item.applications, 0)
  const averageMatchRate = ((verdictDistribution[0].value / totalApplications) * 100).toFixed(1)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Enhanced Header with gradient background */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link href="/">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent glow-primary">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-gradient">Insights & Analytics</h1>
                      <p className="text-muted-foreground text-lg">Track recruitment performance and identify trends</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Select defaultValue="last-30-days">
                    <SelectTrigger className="w-44 h-11 bg-gradient-to-r from-background to-muted/20 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7-days">Last 7 days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 days</SelectItem>
                      <SelectItem value="last-year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="h-11 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 group-hover:glow-primary transition-all duration-300">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">{totalResumes}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <p className="text-xs text-accent font-medium">+12% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Applications Processed</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 group-hover:glow-accent transition-all duration-300">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">{totalApplications}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <p className="text-xs text-accent font-medium">+8% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Match Rate</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">{averageMatchRate}%</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">+2.1% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active JDs</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">{resumesPerJD.length}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Sparkles className="h-3 w-3 text-orange-500" />
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">2 new this month</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Resumes per JD Chart */}
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    Resumes per Job Description
                  </CardTitle>
                  <CardDescription className="text-base">Total resumes received for each position</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/5 to-blue-600/5 border border-blue-500/10">
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart3 data={resumesPerJD} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis
                          dataKey="name"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "12px",
                            boxShadow: "0 8px 32px hsl(var(--foreground) / 0.1)",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        <Bar dataKey="resumes" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                      </BarChart3>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Verdict Distribution Pie Chart */}
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
                      <PieChartIcon className="h-5 w-5 text-white" />
                    </div>
                    Candidate Fit Distribution
                  </CardTitle>
                  <CardDescription className="text-base">Breakdown of candidate evaluation results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/5 to-violet-500/5 border border-purple-500/10">
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart>
                        <defs>
                          <linearGradient id="highFit" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                          </linearGradient>
                          <linearGradient id="mediumFit" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#d97706" stopOpacity={1} />
                          </linearGradient>
                          <linearGradient id="lowFit" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#dc2626" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                        <Pie
                          data={[
                            { ...verdictDistribution[0], color: "url(#highFit)" },
                            { ...verdictDistribution[1], color: "url(#mediumFit)" },
                            { ...verdictDistribution[2], color: "url(#lowFit)" },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={130}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {verdictDistribution.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={index === 0 ? "url(#highFit)" : index === 1 ? "url(#mediumFit)" : "url(#lowFit)"}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "12px",
                            boxShadow: "0 8px 32px hsl(var(--foreground) / 0.1)",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      {verdictDistribution.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${index === 0 ? "bg-green-500" : index === 1 ? "bg-yellow-500" : "bg-red-500"}`}
                          />
                          <span className="text-sm font-medium">
                            {item.name}: {item.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Top Missing Skills */}
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-pink-600">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    Top Missing Skills
                  </CardTitle>
                  <CardDescription className="text-base">
                    Most commonly missing skills across candidates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-red-500/5 to-pink-500/5 border border-red-500/10">
                    <div className="space-y-5">
                      {topMissingSkills.map((item, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge
                                className={`text-xs px-2 py-1 ${index < 3 ? "bg-gradient-to-r from-red-500 to-pink-600 text-white" : "bg-red-500/10 text-red-600 border-red-500/20"}`}
                              >
                                #{index + 1}
                              </Badge>
                              <span className="font-semibold text-sm">{item.skill}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-gradient">{item.count}</span>
                              <span className="text-xs text-muted-foreground ml-1">candidates</span>
                            </div>
                          </div>
                          <div className="relative">
                            <Progress value={item.percentage} className="h-3" />
                            <div
                              className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Monthly Trends */}
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    Monthly Application Trends
                  </CardTitle>
                  <CardDescription className="text-base">
                    Applications received and shortlisted over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10">
                    <ResponsiveContainer width="100%" height={320}>
                      <LineChart data={monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="shortlistedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#059669" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "12px",
                            boxShadow: "0 8px 32px hsl(var(--foreground) / 0.1)",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="applications"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2, fill: "#ffffff" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="shortlisted"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 2, fill: "#ffffff" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500" />
                        <span className="text-sm font-medium">Applications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500" />
                        <span className="text-sm font-medium">Shortlisted</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Summary Insights */}
            <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-primary">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  Key Insights & Recommendations
                </CardTitle>
                <CardDescription className="text-base">
                  AI-powered insights based on your recruitment data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-sm text-green-600 dark:text-green-400">High Demand Skills</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Kubernetes and AWS are the most sought-after skills. Consider offering training programs to bridge
                      this gap.
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20 shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-sm text-blue-600 dark:text-blue-400">Recruitment Efficiency</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your high match rate of {averageMatchRate}% indicates excellent JD quality and candidate sourcing.
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20 shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-sm text-yellow-600 dark:text-yellow-400">Growth Trend</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Applications have increased 12% this month. Consider scaling your evaluation process.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
