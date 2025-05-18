"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Calendar, MessageSquare, Edit, Trash2, Share } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/layout"

interface SocialPost {
  id: string
  content: string
  platform: "twitter" | "linkedin"
  scheduledDate: string | null
  status: "draft" | "scheduled" | "published"
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  } | null
}

export default function SocialPostsPage() {
  // Mock data for social posts
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: "1",
      content: "Excited to announce our new API documentation is now live! Check it out at docs.example.com #DevTools #API",
      platform: "twitter",
      scheduledDate: "2025-05-20T10:00:00",
      status: "scheduled",
      engagement: null
    },
    {
      id: "2",
      content: "We're hosting a webinar on best practices for integrating our SDK. Join us next Tuesday at 2 PM PST to learn tips and tricks from our engineering team.",
      platform: "linkedin",
      scheduledDate: null,
      status: "draft",
      engagement: null
    },
    {
      id: "3",
      content: "Just released v2.3 with performance improvements and new features! Our users are reporting 30% faster response times. #TechUpdates",
      platform: "twitter",
      scheduledDate: null,
      status: "published",
      engagement: {
        likes: 45,
        comments: 12,
        shares: 23
      }
    }
  ])

  // Function to get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      default:
        return null;
    }
  }

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-200 text-yellow-800";
      case "scheduled":
        return "bg-blue-200 text-blue-800";
      case "published":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  }

  return (
    <Layout currentPath="/social-posts">
      <Card className="bg-gray-800 border-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle>Review Social Posts</CardTitle>
          <CardDescription>
            Manage your social media content across platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 rounded-lg border border-gray-700 bg-gray-750 hover:bg-gray-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-full ${post.platform === 'twitter' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-800/30 text-blue-300'}`}>
                      {getPlatformIcon(post.platform)}
                    </div>
                    <h3 className="font-medium text-white">
                      {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)} Post
                    </h3>
                  </div>
                  <Badge className={getStatusColor(post.status)}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-gray-300 mb-3 pl-7">{post.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400 flex items-center">
                    {post.scheduledDate ? (
                      <>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Scheduled: {new Date(post.scheduledDate).toLocaleString()}</span>
                      </>
                    ) : post.engagement ? (
                      <div className="flex items-center gap-3">
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {post.engagement.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {post.engagement.comments}
                        </span>
                        <span className="flex items-center">
                          <Share className="h-3 w-3 mr-1" />
                          {post.engagement.shares}
                        </span>
                      </div>
                    ) : (
                      <span>Draft</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-blue-700 hover:text-white">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {post.status === "draft" && (
                      <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-green-700 hover:text-white">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    )}
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
