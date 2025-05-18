import { Bell, Search, Home, BarChart3, FileText, Users, MessageSquare, Code, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface DashboardHeaderProps {
  currentPath?: string
}

export function DashboardHeader({ currentPath = "/" }: DashboardHeaderProps) {
  return (
    <header className="bg-gray-800 border-gray-700 py-2 px-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-purple-500">HeyDev</h1>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input type="search" placeholder="Search..." className="w-full pl-9 bg-gray-700 border-gray-700" />
          </div>

          <Button variant="outline" size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <nav className="flex items-center space-x-1 overflow-x-auto pb-2">
        {[
          { name: "Dashboard", icon: Home, href: "/" },
          { name: "Community Sentiment", icon: BarChart3, href: "/sentiment-details" },
          { name: "Community Ideas", icon: Users, href: "/community-ideas" },
          { name: "Blog Posts", icon: FileText, href: "/blog-drafts" },
          { name: "Social", icon: MessageSquare, href: "/social-posts" },
          { name: "Code", icon: Code, href: "/code-examples" },
        ].map((item) => (
          <Link href={item.href} key={item.name}>
            <Button
              variant={currentPath === item.href ? "default" : "ghost"}
              className={`flex items-center gap-2 ${currentPath === item.href ? "bg-purple-600 hover:bg-purple-700" : "text-gray-300 hover:text-purple-400"}`}
              size="sm"
            >
              <item.icon size={16} />
              <span>{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
    </header>
  )
}
