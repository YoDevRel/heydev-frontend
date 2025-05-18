"use client"
import { useEffect, useState } from "react"
import { ArrowRight, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CommunityIdeas() {

  const [ideas, setIdeas] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch("http://149.248.37.184:3000/product_ideas")
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const jsonIdeas = (await res.json())
        setIdeas(jsonIdeas)
        console.log(jsonIdeas)

        setError(null)
      } catch (err) {
        setError((err as Error).message)
      }
    }

    fetchIdeas() // initial load
    const id = setInterval(fetchIdeas, 60_000)
    return () => clearInterval(id)
  })

  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-bold">
          <Lightbulb className="h-5 w-5 text-purple-400" />
          Bug Fixes & Community Ideas
        </CardTitle>
        <CardDescription>Top suggestions and bug reports from the community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {ideas.map((idea) => (
            <div key={idea.id} className="border-gray-700 rounded-lg p-3 hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-100">{idea.title}</h3>
                {idea.prd ? (
                  <Badge variant="outline" className="bg-purple-900 text-purple-300 hover:bg-purple-800">
                    PRD Ready
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-700 text-gray-300 hover:bg-gray-600">
                    Needs PRD
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-300 mb-2">{idea.summary}</p>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900">
                  {idea.prd ? "View PRD" : "Generate PRD"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button 
          variant="outline" 
          className="w-full bg-gray-700 text-white hover:bg-purple-800 hover:text-white transition-colors duration-300" 
          size="sm"
        >
          View All Ideas
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter> */}
    </Card>
  )
}
