"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Edit, Trash2, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/layout"
import { MarkdownModal } from "@/components/ui/markdown-modal"

interface BlogDraft {
  id: string
  title: string
  excerpt: string
  date: string
  inserted?: string // ISO datetime with timezone
  status: "draft" | "review" | "published"
  wordCount: number
}

export default function BlogDraftsPage() {
  const [drafts, setDrafts] = useState<BlogDraft[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previewDraft, setPreviewDraft] = useState<BlogDraft | null>(null)
  const [previewContent, setPreviewContent] = useState<string>("")
  const [rawData, setRawData] = useState<any[]>([])

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        setLoading(true)
        const res = await fetch("http://149.248.37.184:3000/content")
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        setRawData(data)
        // Filter and map to BlogDraft shape
        let blogDrafts = data
          // .filter((item: any) => item.type === "blog" && item.status !== "published") // adjust filter as needed
          .map((item: any) => ({
            id: String(item.id),
            title: item.title,
            excerpt: item.summary,
            date: item.updated_at || item.created_at || "",
            inserted: item.inserted || item.inserted_at || "",
            status: item.status || "draft",
            wordCount: item.content ? item.content.split(/\s+/).length : 0,
          }))
        // Sort by inserted (newest first), fallback to date
        blogDrafts = blogDrafts.sort((a: BlogDraft, b: BlogDraft) => {
          const aTime = a.inserted ? new Date(a.inserted).getTime() : (a.date ? new Date(a.date).getTime() : 0)
          const bTime = b.inserted ? new Date(b.inserted).getTime() : (b.date ? new Date(b.date).getTime() : 0)
          return bTime - aTime
        })
        setDrafts(blogDrafts)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchDrafts()
  }, [])

  // Always update previewContent when previewDraft changes
  useEffect(() => {
    if (previewDraft) {
      const found = rawData.find((item: any) => String(item.id) === previewDraft.id)
      setPreviewContent(found?.content || "No content available.")
    } else {
      setPreviewContent("")
    }
  }, [previewDraft, rawData])

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
          {loading ? (
            <p className="text-gray-400">Loading blog drafts...</p>
          ) : error ? (
            <p className="text-red-400 font-medium">Error loading drafts: {error}</p>
          ) : (
            <div className="space-y-4">
              {drafts.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No blog drafts found</p>
              ) : (
                drafts.map((draft, idx) => (
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
                        <span>Last updated: {draft.inserted ? new Date(draft.inserted).toLocaleString() : (draft.date ? new Date(draft.date).toLocaleDateString() : "N/A")}</span>
                        <span className="mx-2">•</span>
                        <span>{draft.wordCount} words</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-gray-600"
                          onClick={() => setPreviewDraft(draft)}
                        >
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
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <MarkdownModal
        open={!!previewDraft}
        onClose={() => setPreviewDraft(null)}
        title={previewDraft?.title}
        markdown={previewContent}
      />
    </Layout>
  )
}
