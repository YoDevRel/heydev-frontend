"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, ThumbsUp, MessageSquare, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/layout"

interface CommunityIdea {
  id: string;
  title: string;
  summary: string;
  description: string;
  votes: number;
  comments: number;
  status: "new" | "under_review" | "planned" | "in_progress" | "completed" | "declined";
  prd: boolean;
  type: "feature" | "bug" | "improvement";
  created_at: string;
}

export default function CommunityIdeasPage() {
  const [ideas, setIdeas] = useState<CommunityIdea[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true)
        const res = await fetch("http://149.248.37.184:3000/product_ideas")
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const jsonIdeas = await res.json()
        setIdeas(jsonIdeas)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchIdeas()
  }, [])

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-200 text-blue-800";
      case "under_review":
        return "bg-purple-200 text-purple-800";
      case "planned":
        return "bg-yellow-200 text-yellow-800";
      case "in_progress":
        return "bg-orange-200 text-orange-800";
      case "completed":
        return "bg-green-200 text-green-800";
      case "declined":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }

  // Function to get type badge color
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

  // Filter ideas based on selected filter
  const filteredIdeas = filter === "all" 
    ? ideas 
    : ideas.filter(idea => 
        filter === "prd_ready" 
          ? idea.prd 
          : filter === "needs_prd" 
            ? !idea.prd 
            : idea.type === filter
      );

  return (
    <Layout currentPath="/community-ideas">
      <Card className="bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-400" />
            Bug Fixes & Community Ideas
          </CardTitle>
          <CardDescription>
            Browse and manage suggestions and bug reports from the community
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className={`${filter === 'all' ? 'bg-purple-800 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`${filter === 'feature' ? 'bg-purple-800 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilter('feature')}
            >
              Features
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`${filter === 'bug' ? 'bg-purple-800 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilter('bug')}
            >
              Bugs
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`${filter === 'improvement' ? 'bg-purple-800 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilter('improvement')}
            >
              Improvements
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`${filter === 'prd_ready' ? 'bg-purple-800 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilter('prd_ready')}
            >
              PRD Ready
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`${filter === 'needs_prd' ? 'bg-purple-800 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFilter('needs_prd')}
            >
              Needs PRD
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-400">Loading community ideas...</p>
          ) : error ? (
            <p className="text-red-400 font-medium">Error loading ideas: {error}</p>
          ) : (
            <div className="space-y-4">
              {filteredIdeas.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No ideas match the selected filter</p>
              ) : (
                filteredIdeas.map((idea) => (
                  <div key={idea.id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className={getTypeColor(idea.type || 'feature')}>
                          {idea.type ? idea.type.charAt(0).toUpperCase() + idea.type.slice(1) : 'Feature'}
                        </Badge>
                        <h3 className="font-medium text-white">{idea.title}</h3>
                      </div>
                      <Badge className={getStatusColor(idea.status || 'new')}>
                        {idea.status ? idea.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'New'}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-3">{idea.summary}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {idea.votes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          {idea.comments || 0}
                        </span>
                        <span className="text-gray-500">
                          Created: {idea.created_at ? new Date(idea.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {idea.prd ? (
                          <Button variant="outline" size="sm" className="bg-purple-900 text-purple-300 hover:bg-purple-800">
                            <FileText className="h-4 w-4 mr-1" />
                            Generate PRD
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="bg-gray-700 text-gray-300 hover:bg-purple-800 hover:text-white">
                            <FileText className="h-4 w-4 mr-1" />
                            Generate PRD
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}
