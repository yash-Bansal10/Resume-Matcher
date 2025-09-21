"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Upload, BarChart3, TrendingUp, Menu, X, Sparkles } from "lucide-react"
import { GeometricPattern, DataVisualization } from "./geometric-illustrations"

const navigation = [
  {
    name: "Add New JD",
    href: "/jd/new",
    icon: Plus,
    visualization: "processing" as const,
  },
  {
    name: "Upload Resumes",
    href: "/resumes/upload",
    icon: Upload,
    visualization: "processing" as const,
  },
  {
    name: "Results",
    href: "/results",
    icon: BarChart3,
    visualization: "matching" as const,
  },
  {
    name: "Insights",
    href: "/insights",
    icon: TrendingUp,
    visualization: "analytics" as const,
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden hover:bg-primary/10 hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Card className="h-full rounded-none border-r bg-sidebar/95 backdrop-blur-sm shadow-2xl">
          <div className="flex h-full flex-col relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <GeometricPattern variant="circuit" size="lg" className="absolute top-0 right-0" />
              <GeometricPattern variant="dots" size="md" className="absolute bottom-0 left-0" />
            </div>

            {/* Enhanced Logo/Header */}
            <div className="flex h-20 items-center px-6 border-b border-sidebar-border/50 relative">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent glow-primary">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gradient">ATS Dashboard</h1>
                  <p className="text-xs text-sidebar-foreground/60">Intelligent Recruitment</p>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation */}
            <nav className="flex-1 space-y-3 p-6 relative">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 relative overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg glow-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:shadow-md hover:scale-105",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {isActive && (
                      <div className="absolute inset-0 opacity-10">
                        <GeometricPattern variant="waves" size="sm" className="w-full h-full" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "p-2 rounded-lg transition-all duration-300",
                        isActive ? "bg-white/20" : "bg-sidebar-accent/20 group-hover:bg-primary/20",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1 relative z-10">
                      <div className="font-semibold">{item.name}</div>
                      <div
                        className={cn("text-xs opacity-70", isActive ? "text-white/80" : "text-sidebar-foreground/60")}
                      >
                        {item.name === "Add New JD" && "Create job descriptions"}
                        {item.name === "Upload Resumes" && "Process candidates"}
                        {item.name === "Results" && "View matches"}
                        {item.name === "Insights" && "Analytics & trends"}
                      </div>
                    </div>

                    <div className="opacity-30 group-hover:opacity-60 transition-opacity">
                      <DataVisualization type={item.visualization} className="w-6 h-6" />
                    </div>
                  </Link>
                )
              })}
            </nav>

            <div className="p-6 border-t border-sidebar-border/50 relative">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <GeometricPattern variant="nodes" size="sm" className="w-full h-full" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded-md bg-gradient-to-br from-primary to-accent">
                      <TrendingUp className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-primary">AI Powered</span>
                  </div>
                  <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
                    Advanced matching algorithms for better recruitment outcomes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
