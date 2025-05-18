"use client"
import { useEffect, useState } from "react"
import { ArrowRight, Lightbulb } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function CommunityIdeas() {
  // Number of new ideas
  const newIdeasCount = 2;

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

  // Get badge color based on idea type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-green-900 text-green-300";
      case "bug":
        return "bg-red-900 text-red-300";
      case "improvement":
        return "bg-blue-900 text-blue-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 font-bold text-2xl">
              <Lightbulb className="h-6 w-6 text-purple-400" />
              Bug Fixes & Community Ideas
            </CardTitle>
          </div>
          {newIdeasCount > 0 && (
            <div>
              <span className="text-2xl font-bold text-purple-400">{newIdeasCount}</span>
              <span className="text-gray-300 text-sm ml-1 align-bottom">new</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          {ideas.slice(0, 2).map((idea) => (
            <div key={idea.id} className="border-gray-700 rounded-lg p-3 hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-100 text-sm truncate max-w-[70%]">{idea.title}</h3>
                <Badge variant="outline" className={`${getTypeColor(idea.type || 'feature')} text-xs`}>
                  {idea.type ? idea.type.charAt(0).toUpperCase() + idea.type.slice(1) : 'Feature'}
                </Badge>
              </div>
              <p className="text-sm text-gray-300 line-clamp-1">{idea.summary}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 mt-auto">
        <Link href="/community-ideas" className="w-full">
          <Button 
            variant="outline" 
            className="w-full bg-gray-700 text-white hover:bg-purple-800 hover:text-white transition-colors duration-300" 
            size="sm"
          >
            View All Ideas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
