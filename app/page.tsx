import { DashboardHeader } from "@/components/dashboard-header"
import { SentimentIndicator } from "@/components/sentiment-indicator"
import { CommunityIdeas } from "@/components/community-ideas"
import { BlogDrafts } from "@/components/blog-drafts"
import { SocialPosts } from "@/components/social-posts"
import { CodeExamples } from "@/components/code-examples"

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <SentimentIndicator />
          <CommunityIdeas />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BlogDrafts />
          <SocialPosts />
          <CodeExamples />
        </div>
      </main>
    </div>
  )
}
