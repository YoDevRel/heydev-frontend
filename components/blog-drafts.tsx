import { Edit, Check, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function BlogDrafts() {
  // Mock data
  const drafts = [
    {
      id: 1,
      title: "Introducing Our New API Features",
      excerpt:
        "We're excited to announce several new features to our API that will make development faster and more intuitive...",
      status: "draft",
    },
    {
      id: 2,
      title: "Best Practices for Serverless Functions",
      excerpt: "Learn how to optimize your serverless functions for better performance and lower costs...",
      status: "ready",
    },
  ]

  return (
    <Card className="h-[500px] flex flex-col bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="text-gray-400">Blog Post Drafts</CardTitle>
        <CardDescription>Review and approve blog content</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {drafts.map((draft) => (
            <div key={draft.id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-100">{draft.title}</h3>
                <Badge
                  variant="outline"
                  className={draft.status === "draft" ? "bg-gray-700 text-gray-300" : "bg-purple-900 text-purple-300"}
                >
                  {draft.status === "draft" ? "Draft" : "Ready to Publish"}
                </Badge>
              </div>
              <p className="text-sm text-gray-300 mb-3 line-clamp-3">{draft.excerpt}</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button variant="default" size="sm" className="bg-gray-600 hover:bg-gray-700 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" />
                  Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" size="sm">
          View All Drafts
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
