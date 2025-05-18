"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout } from "@/components/layout"

export default function SentimentDetailsPage() {
  const [topicSentiments, setTopicSentiments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopicSentiments = async () => {
      try {
        setLoading(true)
        const resTopicSentiment = await fetch("http://149.248.37.184:3000/topic_sentiment")
        if (!resTopicSentiment.ok) throw new Error(`Request failed: ${resTopicSentiment.status}`)
        const jsonresTopicSentiment = (await resTopicSentiment.json()).sort((a: any, b: any) => {
          return a.overall_sentiment_0_to_1 - b.overall_sentiment_0_to_1
        })
        setTopicSentiments(jsonresTopicSentiment)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchTopicSentiments()
  }, [])

  // Function to get color based on sentiment value
  const getSentimentColor = (value: number) => {
    if (value < 0.3) return "text-red-500"
    if (value < 0.6) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <Layout currentPath="/sentiment-details">
      <Card className="bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle>Low Sentiment Topics</CardTitle>
          <CardDescription>
            Detailed breakdown of topics with low sentiment scores based on community feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-400">Loading sentiment data...</p>
          ) : error ? (
            <p className="text-red-400 font-medium">Error loading sentiment data: {error}</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="font-medium text-gray-300">Sentiment Score</div>
                <div className="font-medium text-gray-300 md:col-span-2">Topic</div>
              </div>
              <div className="space-y-2">
                {topicSentiments.map((topic, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 rounded-md bg-gray-750 border border-gray-700">
                    <div className={`font-bold ${getSentimentColor(topic.overall_sentiment_0_to_1)}`}>
                      {(topic.overall_sentiment_0_to_1 * 100).toFixed(1)}%
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-medium text-white">{topic.topic_title}</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {topic.rationale || "No description available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}
