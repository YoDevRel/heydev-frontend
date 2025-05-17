import { Twitter, Linkedin, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SocialPosts() {
  // Mock data
  const posts = [
    {
      id: 1,
      channel: "twitter",
      summary: "Introducing Our New API Features",
      content:
        "🚀 Excited to announce our new API features! Check out our latest blog post to learn how these updates will make your development experience even better. #DevTools #API",
    },
    {
      id: 2,
      channel: "linkedin",
      summary: "Best Practices for Serverless Functions",
      content:
        "We've just published a new guide on optimizing serverless functions. Learn how to improve performance while reducing costs. Link to the full article in comments!",
    },
  ]

  return (
    <Card className="h-[500px] flex flex-col bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="text-purple-500">Social Posts</CardTitle>
        <CardDescription>Manage social media content</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="outline"
                  className={
                    post.channel === "twitter"
                      ? "bg-gray-700 text-gray-300 flex items-center gap-1"
                      : "bg-gray-700 text-gray-300 flex items-center gap-1"
                  }
                >
                  {post.channel === "twitter" ? (
                    <>
                      <Twitter className="h-3 w-3" />
                      Twitter
                    </>
                  ) : (
                    <>
                      <Linkedin className="h-3 w-3" />
                      LinkedIn
                    </>
                  )}
                </Badge>
                <span className="text-xs text-gray-400">Connected to: {post.summary}</span>
              </div>
              <p className="text-sm text-gray-300 mb-3 border-l-2 border-gray-700 pl-3">{post.content}</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Schedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" size="sm">
          View All Posts
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
