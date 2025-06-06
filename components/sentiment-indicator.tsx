"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SentimentIndicatorProps {
  /**
   * Optional value in the 0-1 range. If omitted, the component fetches the
   * live score from the public API and refreshes it every 60 s.
   */
  value?: number
}

export function SentimentIndicator({ value }: SentimentIndicatorProps) {
  const [sentiment, setSentiment] = useState<number | null>(
    value !== undefined ? Math.max(0, Math.min(1, value)) : null,
  )
  const [error, setError] = useState<string | null>(null)

  // Fetch only if the caller didn’t pass a value

  useEffect(() => {
    if (value !== undefined) return // controlled externally

    const fetchSentiment = async () => {
      try {
        const resSentiment = await fetch("http://149.248.37.184:3000/sentiment")
        if (!resSentiment.ok) throw new Error(`Request failed: ${resSentiment.status}`)
        const json = await resSentiment.json()
        const v = Number(json?.[0]?.community_sentiment)
        if (isNaN(v)) throw new Error("Invalid payload shape from API")
        setSentiment(Math.max(0, Math.min(1, v)))

        setError(null)
      } catch (err) {
        setError((err as Error).message)
      }
    }

    fetchSentiment() // initial load
    const id = setInterval(fetchSentiment, 60_000)
    return () => clearInterval(id)
  }, [value])

  if (error)
    return (
      <Card className="bg-gray-800 border-gray-700 text-gray-100 p-6">
        <p className="text-red-400 font-medium">Error loading sentiment: {error}</p>
      </Card>
    )

  if (sentiment === null)
    return (
      <Card className="bg-gray-800 border-gray-700 text-gray-100 p-6">
        <p className="text-gray-400">Loading sentiment…</p>
      </Card>
    )

  // Ensure value is between 0 and 1
  const normalizedValue = Math.max(0, Math.min(1, sentiment))

  // Calculate color gradient from red to yellow to green
  const getColor = (value: number) => {
    // Tailwind colors for consistency
    const redColor = { r: 239, g: 68, b: 68 }     // red-500
    const yellowColor = { r: 234, g: 179, b: 8 }  // yellow-500
    const greenColor = { r: 34, g: 197, b: 94 }   // green-500
    
    if (value < 0.5) {
      // Red to yellow (0 to 0.5)
      const ratio = value * 2 // 0 to 1 for this range
      const r = Math.round(redColor.r + (yellowColor.r - redColor.r) * ratio)
      const g = Math.round(redColor.g + (yellowColor.g - redColor.g) * ratio)
      const b = Math.round(redColor.b + (yellowColor.b - redColor.b) * ratio)
      return `rgb(${r}, ${g}, ${b})`
    } else {
      // Yellow to green (0.5 to 1)
      const ratio = (value - 0.5) * 2 // 0 to 1 for this range
      const r = Math.round(yellowColor.r + (greenColor.r - yellowColor.r) * ratio)
      const g = Math.round(yellowColor.g + (greenColor.g - yellowColor.g) * ratio)
      const b = Math.round(yellowColor.b + (greenColor.b - yellowColor.b) * ratio)
      return `rgb(${r}, ${g}, ${b})`
    }
  }

  const sentimentColor = getColor(normalizedValue)
  const percentage = Math.round(normalizedValue * 100)

  // Determine sentiment text
  const getSentimentText = (value: number) => {
    if (value < 0.3) return "Needs Attention"
    if (value < 0.6) return "Neutral"
    if (value < 0.8) return "Positive"
    return "Excellent"
  }

  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-bold text-2xl">
          <BarChart3 className="h-6 w-6 text-purple-400" />
          Community Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-8 mt-2">
          <span
            className={cn(
              "text-sm font-medium px-3 py-1 rounded-full",
              normalizedValue < 0.3
                ? "bg-red-100 text-red-800"
                : normalizedValue < 0.6
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800",
            )}
          >
            {getSentimentText(normalizedValue)}
          </span>
        </div>
        <div className="space-y-5 py-1">
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-white"
              style={{
                width: `${percentage}%`
              }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Neutral</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Positive</span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <span className="text-3xl font-bold text-white">
              {percentage}%
            </span>
          </div>

          <div className="pt-3 border-t border-gray-700">
            <div className="flex justify-center">
              <Link href="/sentiment-details">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-8 bg-gray-700 text-white hover:bg-purple-800 hover:text-white transition-colors"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
