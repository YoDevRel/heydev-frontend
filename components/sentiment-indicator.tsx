"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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
        const res = await fetch("http://149.248.37.184:3000/sentiment")
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = await res.json()
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

  // Calculate color gradient from red to blue
  const getColor = (value: number) => {
    // Red to purple to blue gradient
    if (value < 0.5) {
      // Red to purple (0 to 0.5)
      const r = 255 - Math.round(80 * (value * 2))
      const g = 0 + Math.round(91 * (value * 2))
      const b = 0 + Math.round(246 * (value * 2))
      return `rgb(${r}, ${g}, ${b})`
    } else {
      // Purple to blue (0.5 to 1)
      const r = 175 - Math.round(120 * (value - 0.5) * 2)
      const g = 91 + Math.round(39 * (value - 0.5) * 2)
      const b = 246
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
        <CardTitle className="flex items-center justify-between">
          Community Sentiment
          <span
            className={cn(
              "text-sm font-medium px-2.5 py-0.5 rounded-full",
              normalizedValue < 0.3
                ? "bg-red-100 text-red-800"
                : normalizedValue < 0.6
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800",
            )}
          >
            {getSentimentText(normalizedValue)}
          </span>
        </CardTitle>
        <CardDescription>
          Overall community sentiment based on social media, forums, and GitHub interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${percentage}%`,
                backgroundColor: sentimentColor,
              }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span>Neutral</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Positive</span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <span className="text-3xl font-bold" style={{ color: sentimentColor }}>
              {percentage}%
            </span>
          </div>

          <div className="pt-3 border-t border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Top Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { text: "documentation", sentiment: "positive" },
                { text: "API", sentiment: "positive" },
                { text: "performance", sentiment: "negative" },
                { text: "helpful", sentiment: "positive" },
                { text: "bugs", sentiment: "negative" },
                { text: "intuitive", sentiment: "positive" },
                { text: "slow", sentiment: "negative" },
                { text: "community", sentiment: "positive" },
              ].map((keyword, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${
                    keyword.sentiment === "positive"
                      ? "bg-purple-900/50 text-purple-300"
                      : "bg-gray-700/50 text-gray-300"
                  }`}
                >
                  {keyword.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
