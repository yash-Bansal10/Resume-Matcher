"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, Eye, ArrowLeft, Briefcase, Star, GraduationCap, Zap, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewJDPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: "",
    mustHaveSkills: [] as string[],
    goodToHaveSkills: [] as string[],
    qualification: "",
  })

  const [newMustHaveSkill, setNewMustHaveSkill] = useState("")
  const [newGoodToHaveSkill, setNewGoodToHaveSkill] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addSkill = (type: "mustHave" | "goodToHave", skill: string) => {
    if (!skill.trim()) return

    if (type === "mustHave") {
      setFormData((prev) => ({
        ...prev,
        mustHaveSkills: [...prev.mustHaveSkills, skill.trim()],
      }))
      setNewMustHaveSkill("")
    } else {
      setFormData((prev) => ({
        ...prev,
        goodToHaveSkills: [...prev.goodToHaveSkills, skill.trim()],
      }))
      setNewGoodToHaveSkill("")
    }
  }

  const removeSkill = (type: "mustHave" | "goodToHave", index: number) => {
    if (type === "mustHave") {
      setFormData((prev) => ({
        ...prev,
        mustHaveSkills: prev.mustHaveSkills.filter((_, i) => i !== index),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        goodToHaveSkills: prev.goodToHaveSkills.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("JD Data:", formData)
    setIsLoading(false)

    // Show success and redirect
    router.push("/jd/list")
  }

  const handleKeyPress = (e: React.KeyboardEvent, type: "mustHave" | "goodToHave") => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (type === "mustHave") {
        addSkill("mustHave", newMustHaveSkill)
      } else {
        addSkill("goodToHave", newGoodToHaveSkill)
      }
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Enhanced Header with gradient background */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl"></div>
              </div>

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
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gradient">Create New Job Description</h1>
                    <p className="text-muted-foreground text-lg">Define the requirements for your open position</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Enhanced Job Title Card */}
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    Job Title
                  </CardTitle>
                  <CardDescription className="text-base">Enter the position title you're hiring for</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="e.g., Senior Software Engineer, Data Analyst, Product Manager"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                    className="text-base h-12 bg-gradient-to-r from-background to-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </CardContent>
              </Card>

              {/* Enhanced Experience Card */}
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    Experience Required
                  </CardTitle>
                  <CardDescription className="text-base">
                    Specify the experience level or years required
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="e.g., 3-5 years, Entry Level, Senior Level"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    className="text-base h-12 bg-gradient-to-r from-background to-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </CardContent>
              </Card>

              {/* Enhanced Must-have Skills Card */}
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-pink-600">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    Must-have Skills
                  </CardTitle>
                  <CardDescription className="text-base">Essential skills that candidates must possess</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter a required skill and press Enter"
                      value={newMustHaveSkill}
                      onChange={(e) => setNewMustHaveSkill(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, "mustHave")}
                      className="flex-1 h-12 bg-gradient-to-r from-background to-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                    />
                    <Button
                      type="button"
                      onClick={() => addSkill("mustHave", newMustHaveSkill)}
                      size="icon"
                      className="h-12 w-12 bg-gradient-to-br from-primary to-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>

                  {formData.mustHaveSkills.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {formData.mustHaveSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-500/20 text-red-600 dark:text-red-400 hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300"
                        >
                          <Zap className="h-3 w-3" />
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill("mustHave", index)}
                            className="ml-1 hover:bg-red-500/20 rounded-full p-1 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced Good-to-have Skills Card */}
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    Good-to-have Skills
                  </CardTitle>
                  <CardDescription className="text-base">
                    Additional skills that would be beneficial but not mandatory
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter a preferred skill and press Enter"
                      value={newGoodToHaveSkill}
                      onChange={(e) => setNewGoodToHaveSkill(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, "goodToHave")}
                      className="flex-1 h-12 bg-gradient-to-r from-background to-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                    />
                    <Button
                      type="button"
                      onClick={() => addSkill("goodToHave", newGoodToHaveSkill)}
                      size="icon"
                      className="h-12 w-12 bg-gradient-to-br from-purple-500 to-violet-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>

                  {formData.goodToHaveSkills.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {formData.goodToHaveSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400 hover:from-purple-500/20 hover:to-violet-500/20 transition-all duration-300"
                        >
                          <Sparkles className="h-3 w-3" />
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill("goodToHave", index)}
                            className="ml-1 hover:bg-purple-500/20 rounded-full p-1 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced Qualification Card */}
              <Card className="shadow-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-border hover:bg-card hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    Qualification Requirements
                  </CardTitle>
                  <CardDescription className="text-base">
                    Educational background and certifications required
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="e.g., Bachelor's degree in Computer Science or related field, relevant certifications..."
                    value={formData.qualification}
                    onChange={(e) => setFormData((prev) => ({ ...prev, qualification: e.target.value }))}
                    className="min-h-[120px] text-base bg-gradient-to-r from-background to-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 resize-none"
                    required
                  />
                </CardContent>
              </Card>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 sm:flex-none h-14 text-base bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Saving JD...
                    </>
                  ) : (
                    <>
                      <Save className="mr-3 h-5 w-5" />
                      Save Job Description
                    </>
                  )}
                </Button>

                <Link href="/jd/list" className="flex-1 sm:flex-none">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full h-14 text-base bg-gradient-to-r from-background to-muted/20 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <Eye className="mr-3 h-5 w-5" />
                    View All JDs
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
