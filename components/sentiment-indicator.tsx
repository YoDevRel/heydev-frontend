import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SentimentIndicatorProps {
  value: number // 0-1 scale
}

export function SentimentIndicator({ value }: SentimentIndicatorProps) {
  // Ensure value is between 0 and 1
  const normalizedValue = Math.max(0, Math.min(1, value))

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
