"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, Play, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock JD data
const mockJDs = [
  { id: "1", title: "Senior Software Engineer", skills: ["React", "Node.js", "TypeScript"] },
  { id: "2", title: "Data Analyst", skills: ["Python", "SQL", "Tableau"] },
  { id: "3", title: "Product Manager", skills: ["Product Strategy", "Agile", "Analytics"] },
  { id: "4", title: "UI/UX Designer", skills: ["Figma", "Design Systems", "User Research"] },
]

interface UploadedFile {
  id: string
  file: File
  status: "pending" | "uploading" | "uploaded" | "error"
  progress: number
}

export default function ResumeUploadPage() {
  const router = useRouter()
  const [selectedJD, setSelectedJD] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files).filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword",
    )

    handleFiles(files)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "pending",
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate file upload
    newFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "uploading" } : file)))

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30

      setUploadedFiles((prev) =>
        prev.map((file) => (file.id === fileId ? { ...file, progress: Math.min(progress, 100) } : file)),
      )

      if (progress >= 100) {
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((file) => (file.id === fileId ? { ...file, status: "uploaded", progress: 100 } : file)),
        )
      }
    }, 200)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const runEvaluation = async () => {
    if (!selectedJD || uploadedFiles.length === 0) return

    setIsEvaluating(true)

    // Simulate evaluation process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsEvaluating(false)
    router.push("/results")
  }

  const selectedJDData = mockJDs.find((jd) => jd.id === selectedJD)
  const uploadedCount = uploadedFiles.filter((f) => f.status === "uploaded").length
  const canRunEvaluation = selectedJD && uploadedCount > 0

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Upload Resumes</h1>
                <p className="text-muted-foreground">
                  Upload candidate resumes for evaluation against job requirements
                </p>
              </div>
            </div>

            {/* JD Selection */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Select Job Description</CardTitle>
                <CardDescription>Choose the JD to evaluate resumes against</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedJD} onValueChange={setSelectedJD}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a job description..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockJDs.map((jd) => (
                      <SelectItem key={jd.id} value={jd.id}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{jd.title}</span>
                          <span className="text-xs text-muted-foreground">
                            Key skills: {jd.skills.slice(0, 3).join(", ")}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedJDData && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Selected: {selectedJDData.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJDData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Upload Resume Files</CardTitle>
                <CardDescription>Drag and drop PDF or DOCX files, or click to browse</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-border/80"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-lg font-medium">
                        {isDragOver ? "Drop files here" : "Drag & drop resume files"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or <span className="text-primary font-medium">click to browse</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX files up to 10MB each</p>
                    </div>
                  </div>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="font-medium text-sm">Uploaded Files ({uploadedFiles.length})</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((uploadedFile) => (
                        <div key={uploadedFile.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="flex-shrink-0">
                            {uploadedFile.status === "uploaded" ? (
                              <CheckCircle className="h-5 w-5 text-accent" />
                            ) : uploadedFile.status === "error" ? (
                              <AlertCircle className="h-5 w-5 text-destructive" />
                            ) : (
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-muted-foreground">
                                {(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                              {uploadedFile.status === "uploading" && (
                                <div className="flex-1 max-w-32">
                                  <Progress value={uploadedFile.progress} className="h-1" />
                                </div>
                              )}
                              <Badge
                                variant={
                                  uploadedFile.status === "uploaded"
                                    ? "default"
                                    : uploadedFile.status === "error"
                                      ? "destructive"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {uploadedFile.status === "uploading"
                                  ? `${Math.round(uploadedFile.progress)}%`
                                  : uploadedFile.status}
                              </Badge>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(uploadedFile.id)}
                            className="flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Run Evaluation */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Ready to Evaluate?</h3>
                    <p className="text-sm text-muted-foreground">
                      {uploadedCount > 0 && selectedJD
                        ? `${uploadedCount} resume${uploadedCount > 1 ? "s" : ""} will be evaluated against "${selectedJDData?.title}"`
                        : "Select a JD and upload resumes to begin evaluation"}
                    </p>
                  </div>

                  <Button
                    size="lg"
                    onClick={runEvaluation}
                    disabled={!canRunEvaluation || isEvaluating}
                    className="px-8 py-3 text-base font-medium bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isEvaluating ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Evaluating Resumes...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-5 w-5" />
                        Run Evaluation
                      </>
                    )}
                  </Button>

                  {!canRunEvaluation && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      {!selectedJD && <span>• Select a JD</span>}
                      {uploadedCount === 0 && <span>• Upload at least one resume</span>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
