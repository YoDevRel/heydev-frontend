import { Twitter, Linkedin, ArrowRight, Calendar, MessageSquare, Share, Bell, Video } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function SocialPosts() {
  // Mock data
  const draftCount = 2 // Number of social post drafts ready for review

  return (
    <Card className="h-[400px] flex flex-col bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-bold text-2xl">
          <MessageSquare className="h-6 w-6 text-purple-400" />
          Social Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center p-4">
        <div className="mb-4">
          <div className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors text-center flex flex-col items-center">
            <div className="bg-purple-900/30 p-2 rounded-full mb-2">
              <Bell className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-medium text-white mb-1">Social Drafts</h3>
            <div className="mb-3">
              <span className="text-2xl font-bold text-purple-400">{draftCount}</span>
              <span className="text-gray-300 text-sm ml-1">pending</span>
            </div>
            <Link href="/social-posts">
              <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-purple-800 hover:text-white transition-colors">
                <Share className="h-4 w-4 mr-2" />
                Review Posts
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-3">
          <h3 className="font-medium text-white text-center text-sm mb-3">Quick Links</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-purple-800 hover:text-white transition-colors flex items-center justify-center gap-1">
              <Twitter className="h-4 w-4 mr-1" />
              Twitter
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-purple-800 hover:text-white transition-colors flex items-center justify-center gap-1">
              <Linkedin className="h-4 w-4 mr-1" />
              LinkedIn
            </Button>
          </div>
        </div>
      </CardContent>

    </Card>
  )
}
