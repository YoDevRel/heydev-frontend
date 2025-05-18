import { ArrowRight, FileText, Video, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function BlogDrafts() {
  // Mock data
  const draftCount = 3 // Number of drafts ready for review

  return (
    <Card className="h-[400px] flex flex-col bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="text-gray-100 font-bold">Blog Post Drafts</CardTitle>
        <CardDescription>Manage and create blog content</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors text-center flex flex-col items-center">
            <div className="bg-purple-900/30 p-2 rounded-full mb-2">
              <Bell className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-medium text-white mb-1">New Post Drafts</h3>
            <div className="mb-3">
              <span className="text-2xl font-bold text-purple-400">{draftCount}</span>
              <span className="text-gray-300 text-sm ml-1">pending</span>
            </div>
            <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-purple-800 hover:text-white transition-colors">
              <FileText className="h-4 w-4 mr-2" />
              Review Drafts
            </Button>
          </div>
          
          <div className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors text-center flex flex-col items-center">
            <div className="bg-gray-700/50 p-2 rounded-full mb-2">
              <Video className="h-6 w-6 text-gray-300" />
            </div>
            <h3 className="font-medium text-white mb-1">Create from Media</h3>
            <div className="text-xs text-gray-300 mb-3">
              <div>Generate from</div>
              <div>video/audio</div>
            </div>
            <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-purple-800 hover:text-white transition-colors">
              <Video className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </div>
        </div>
      </CardContent>

    </Card>
  )
}
