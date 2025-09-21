"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Upload, BarChart3, TrendingUp, Users, FileText, CheckCircle, Clock, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Enhanced Welcome Section with gradient text */}
            <div className="space-y-4 relative">
              <div className="absolute inset-0 -z-10 opacity-30">
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent glow-primary">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gradient">Welcome to ATS Dashboard</h1>
              </div>
              <p className="text-muted-foreground text-xl max-w-2xl">
                Streamline your recruitment process with intelligent candidate matching powered by advanced AI
              </p>
            </div>

            {/* Enhanced Quick Stats with premium cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total JDs</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 group-hover:glow-primary transition-all duration-300">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">24</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <p className="text-xs text-accent font-medium">+3 from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resumes Processed</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 group-hover:glow-accent transition-all duration-300">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">1,247</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <p className="text-xs text-accent font-medium">+180 this week</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Matches</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">89</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">7.1% match rate</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gradient">12</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-orange-500" />
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Requires attention</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Quick Actions with premium styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl">Quick Actions</span>
                  </CardTitle>
                  <CardDescription className="text-base">Get started with common tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/jd/new">
                    <Button
                      className="w-full justify-start h-12 text-left bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:from-blue-500/20 hover:to-blue-600/20 hover:border-blue-500/40 transition-all duration-300"
                      variant="outline"
                    >
                      <div className="p-1.5 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 mr-3">
                        <Plus className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Create New Job Description</div>
                        <div className="text-xs text-muted-foreground">Define requirements and skills</div>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/resumes/upload">
                    <Button
                      className="w-full justify-start h-12 text-left bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/20 hover:from-green-500/20 hover:to-emerald-600/20 hover:border-green-500/40 transition-all duration-300"
                      variant="outline"
                    >
                      <div className="p-1.5 rounded-md bg-gradient-to-br from-green-500 to-emerald-600 mr-3">
                        <Upload className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Upload Resume Batch</div>
                        <div className="text-xs text-muted-foreground">Process multiple candidates</div>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/results">
                    <Button
                      className="w-full justify-start h-12 text-left bg-gradient-to-r from-purple-500/10 to-violet-600/10 border-purple-500/20 hover:from-purple-500/20 hover:to-violet-600/20 hover:border-purple-500/40 transition-all duration-300"
                      variant="outline"
                    >
                      <div className="p-1.5 rounded-md bg-gradient-to-br from-purple-500 to-violet-600 mr-3">
                        <BarChart3 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">View Latest Results</div>
                        <div className="text-xs text-muted-foreground">Analyze candidate matches</div>
                      </div>
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-primary">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl">Recent Activity</span>
                  </CardTitle>
                  <CardDescription className="text-base">Latest system updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">Software Engineer JD</p>
                          <p className="text-xs text-muted-foreground">45 resumes processed</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Complete</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-500/5 to-blue-600/5 border border-blue-500/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">Data Analyst Role</p>
                          <p className="text-xs text-muted-foreground">Processing...</p>
                        </div>
                      </div>
                      <div className="w-24">
                        <Progress value={65} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">65%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-500/5 to-violet-500/5 border border-purple-500/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">Product Manager</p>
                          <p className="text-xs text-muted-foreground">12 high matches found</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">New</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
