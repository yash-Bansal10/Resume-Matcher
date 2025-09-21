"use client"

interface GeometricPatternProps {
  variant?: "circuit" | "nodes" | "grid" | "waves" | "dots"
  className?: string
  size?: "sm" | "md" | "lg"
}

export function GeometricPattern({ variant = "circuit", className = "", size = "md" }: GeometricPatternProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  }

  const patterns = {
    circuit: (
      <svg viewBox="0 0 200 200" className={`${sizeClasses[size]} ${className}`} fill="none">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Circuit board pattern */}
        <path
          d="M20 20 L180 20 L180 60 L140 60 L140 100 L180 100 L180 180 L20 180 L20 140 L60 140 L60 100 L20 100 Z"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M60 60 L140 60 M100 20 L100 180 M20 100 L180 100"
          stroke="url(#circuitGradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Circuit nodes */}
        <circle cx="60" cy="60" r="4" fill="hsl(var(--primary))" />
        <circle cx="140" cy="60" r="4" fill="hsl(var(--accent))" />
        <circle cx="60" cy="140" r="4" fill="hsl(var(--accent))" />
        <circle cx="140" cy="140" r="4" fill="hsl(var(--primary))" />
        <circle cx="100" cy="100" r="6" fill="hsl(var(--primary))" />
      </svg>
    ),

    nodes: (
      <svg viewBox="0 0 200 200" className={`${sizeClasses[size]} ${className}`} fill="none">
        <defs>
          <linearGradient id="nodesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Network connections */}
        <path d="M50 50 L150 50 L100 150 Z" stroke="url(#nodesGradient)" strokeWidth="1.5" fill="none" />
        <path d="M50 150 L150 150 L100 50 Z" stroke="url(#nodesGradient)" strokeWidth="1.5" fill="none" />
        <path d="M50 50 L50 150 M150 50 L150 150" stroke="url(#nodesGradient)" strokeWidth="1" strokeOpacity="0.5" />

        {/* Network nodes */}
        <circle cx="50" cy="50" r="8" fill="hsl(var(--primary))" />
        <circle cx="150" cy="50" r="6" fill="hsl(var(--accent))" />
        <circle cx="100" cy="150" r="10" fill="hsl(var(--primary))" />
        <circle cx="50" cy="150" r="5" fill="hsl(var(--accent))" />
        <circle cx="150" cy="150" r="7" fill="hsl(var(--primary))" />
      </svg>
    ),

    grid: (
      <svg viewBox="0 0 200 200" className={`${sizeClasses[size]} ${className}`} fill="none">
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Grid pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gridGradient)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#grid)" />

        {/* Highlighted squares */}
        <rect x="40" y="40" width="40" height="40" fill="hsl(var(--primary))" fillOpacity="0.2" />
        <rect x="120" y="80" width="40" height="40" fill="hsl(var(--accent))" fillOpacity="0.3" />
        <rect x="80" y="120" width="40" height="40" fill="hsl(var(--primary))" fillOpacity="0.15" />
      </svg>
    ),

    waves: (
      <svg viewBox="0 0 200 200" className={`${sizeClasses[size]} ${className}`} fill="none">
        <defs>
          <linearGradient id="wavesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Wave patterns */}
        <path d="M0 100 Q50 50 100 100 T200 100" stroke="url(#wavesGradient)" strokeWidth="3" fill="none" />
        <path
          d="M0 120 Q50 80 100 120 T200 120"
          stroke="url(#wavesGradient)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.7"
        />
        <path
          d="M0 80 Q50 40 100 80 T200 80"
          stroke="url(#wavesGradient)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.5"
        />
        <path
          d="M0 140 Q50 110 100 140 T200 140"
          stroke="url(#wavesGradient)"
          strokeWidth="1.5"
          fill="none"
          strokeOpacity="0.3"
        />
      </svg>
    ),

    dots: (
      <svg viewBox="0 0 200 200" className={`${sizeClasses[size]} ${className}`} fill="none">
        <defs>
          <radialGradient id="dotsGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Dot pattern */}
        {Array.from({ length: 8 }, (_, i) =>
          Array.from({ length: 8 }, (_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={25 + j * 25}
              cy={25 + i * 25}
              r={Math.random() * 3 + 1}
              fill="url(#dotsGradient)"
              opacity={0.3 + Math.random() * 0.4}
            />
          )),
        )}

        {/* Highlighted dots */}
        <circle cx="75" cy="75" r="6" fill="hsl(var(--primary))" />
        <circle cx="125" cy="125" r="8" fill="hsl(var(--accent))" />
        <circle cx="125" cy="75" r="4" fill="hsl(var(--primary))" />
        <circle cx="75" cy="125" r="5" fill="hsl(var(--accent))" />
      </svg>
    ),
  }

  return patterns[variant]
}

interface FloatingElementsProps {
  className?: string
}

export function FloatingElements({ className = "" }: FloatingElementsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Floating geometric shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 opacity-20 animate-pulse">
        <GeometricPattern variant="circuit" size="sm" />
      </div>
      <div className="absolute top-32 right-20 w-12 h-12 opacity-15 animate-bounce" style={{ animationDuration: "3s" }}>
        <GeometricPattern variant="nodes" size="sm" />
      </div>
      <div
        className="absolute bottom-20 left-32 w-20 h-20 opacity-10 animate-pulse"
        style={{ animationDuration: "4s" }}
      >
        <GeometricPattern variant="dots" size="sm" />
      </div>
      <div
        className="absolute bottom-32 right-10 w-14 h-14 opacity-25 animate-bounce"
        style={{ animationDuration: "2.5s" }}
      >
        <GeometricPattern variant="waves" size="sm" />
      </div>

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-xl animate-pulse"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-gradient-to-tr from-accent/15 to-primary/5 rounded-full blur-2xl animate-pulse"
        style={{ animationDuration: "8s" }}
      />
    </div>
  )
}

interface DataVisualizationProps {
  type: "processing" | "matching" | "analytics"
  className?: string
}

export function DataVisualization({ type, className = "" }: DataVisualizationProps) {
  const visualizations = {
    processing: (
      <svg viewBox="0 0 120 120" className={`w-24 h-24 ${className}`} fill="none">
        <defs>
          <linearGradient id="processingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>

        {/* Processing visualization */}
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="url(#processingGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10 5"
          className="animate-spin"
          style={{ animationDuration: "3s" }}
        />
        <circle
          cx="60"
          cy="60"
          r="35"
          stroke="url(#processingGradient)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 4"
          className="animate-spin"
          style={{ animationDuration: "2s", animationDirection: "reverse" }}
        />
        <circle
          cx="60"
          cy="60"
          r="20"
          stroke="url(#processingGradient)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="6 3"
          className="animate-spin"
          style={{ animationDuration: "1.5s" }}
        />
        <circle cx="60" cy="60" r="8" fill="url(#processingGradient)" className="animate-pulse" />
      </svg>
    ),

    matching: (
      <svg viewBox="0 0 120 120" className={`w-24 h-24 ${className}`} fill="none">
        <defs>
          <linearGradient id="matchingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>

        {/* Matching visualization */}
        <path
          d="M20 60 Q60 20 100 60 Q60 100 20 60"
          stroke="url(#matchingGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <circle
          cx="20"
          cy="60"
          r="6"
          fill="hsl(var(--primary))"
          className="animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <circle
          cx="100"
          cy="60"
          r="6"
          fill="hsl(var(--accent))"
          className="animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          cx="60"
          cy="35"
          r="4"
          fill="hsl(var(--primary))"
          className="animate-bounce"
          style={{ animationDelay: "0.25s" }}
        />
        <circle
          cx="60"
          cy="85"
          r="4"
          fill="hsl(var(--accent))"
          className="animate-bounce"
          style={{ animationDelay: "0.75s" }}
        />
      </svg>
    ),

    analytics: (
      <svg viewBox="0 0 120 120" className={`w-24 h-24 ${className}`} fill="none">
        <defs>
          <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>

        {/* Analytics bars */}
        <rect
          x="20"
          y="80"
          width="8"
          height="20"
          fill="url(#analyticsGradient)"
          className="animate-pulse"
          style={{ animationDelay: "0s" }}
        />
        <rect
          x="35"
          y="60"
          width="8"
          height="40"
          fill="url(#analyticsGradient)"
          className="animate-pulse"
          style={{ animationDelay: "0.2s" }}
        />
        <rect
          x="50"
          y="40"
          width="8"
          height="60"
          fill="url(#analyticsGradient)"
          className="animate-pulse"
          style={{ animationDelay: "0.4s" }}
        />
        <rect
          x="65"
          y="70"
          width="8"
          height="30"
          fill="url(#analyticsGradient)"
          className="animate-pulse"
          style={{ animationDelay: "0.6s" }}
        />
        <rect
          x="80"
          y="50"
          width="8"
          height="50"
          fill="url(#analyticsGradient)"
          className="animate-pulse"
          style={{ animationDelay: "0.8s" }}
        />

        {/* Trend line */}
        <path
          d="M24 84 L39 64 L54 44 L69 74 L84 54"
          stroke="url(#analyticsGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
      </svg>
    ),
  }

  return visualizations[type]
}
