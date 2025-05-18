"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Edit, Trash2, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/layout"

interface BlogDraft {
  id: string
  title: string
  excerpt: string
  date: string
  status: "draft" | "review" | "published"
  wordCount: number
}

export default function BlogDraftsPage() {
  // Mock data for blog drafts
  const [drafts, setDrafts] = useState<BlogDraft[]>([
    {
      id: "1",
      title: "Getting Started with Our API",
      excerpt: "A comprehensive guide to help new developers integrate with our platform quickly and efficiently.",
      date: "2025-05-15",
      status: "draft",
      wordCount: 1250
    },
    {
      id: "2",
      title: "New Features in v2.3",
      excerpt: "Exploring the latest updates and improvements in our latest release, including performance enhancements.",
      date: "2025-05-12",
      status: "review",
      wordCount: 980
    },
    {
      id: "3",
      title: "Best Practices for Authentication",
      excerpt: "Security tips and implementation guidelines for using our authentication system correctly.",
      date: "2025-05-10",
      status: "draft",
      wordCount: 1540
    }
  ])

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-200 text-yellow-800"
      case "review":
        return "bg-blue-200 text-blue-800"
      case "published":
        return "bg-green-200 text-green-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  return (
    <Layout currentPath="/blog-drafts">
      <Card className="bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle>Review Drafts</CardTitle>
          <CardDescription>
            Manage your blog post drafts and prepare them for publication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {drafts.map((draft) => (
              <div key={draft.id} className="p-4 rounded-lg border border-gray-700 bg-gray-750 hover:bg-gray-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-white">{draft.title}</h3>
                  <Badge className={getStatusColor(draft.status)}>
                    {draft.status.charAt(0).toUpperCase() + draft.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-gray-300 mb-3">{draft.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    <span>Last updated: {draft.date}</span>
                    <span className="mx-2">•</span>
                    <span>{draft.wordCount} words</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-gray-600">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-blue-700 hover:text-white">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-red-700 hover:text-white">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}
