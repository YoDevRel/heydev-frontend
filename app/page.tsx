import { Layout } from "@/components/layout"
import { SentimentIndicator } from "@/components/sentiment-indicator"
import { CommunityIdeas } from "@/components/community-ideas"
import { BlogDrafts } from "@/components/blog-drafts"
import { SocialPosts } from "@/components/social-posts"
import { CodeExamples } from "@/components/code-examples"

export default function Dashboard() {
  return (
    <Layout currentPath="/">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SentimentIndicator />
        <BlogDrafts />
        <SocialPosts />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommunityIdeas />
        <CodeExamples />
      </div>
    </Layout>
  )
}
