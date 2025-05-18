"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Loader2, X, Maximize2, Minimize2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


// Define message types
type MessageRole = "user" | "assistant" | "system"

interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  status?: "loading" | "complete" | "error"
  actions?: AgentAction[]
}

interface AgentAction {
  id: string
  label: string
  description?: string
  type: "primary" | "secondary" | "destructive"
  target?: string
}

export function AgentInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! How goes it? What would you like to do today?",
      timestamp: new Date(),
      actions: [
        {
          id: "sentiment",
          label: "Check Community Sentiment",
          description: "View the latest community sentiment analysis",
          type: "primary",
        },
        {
          id: "ideas",
          label: "Review New Ideas",
          description: "See the latest community ideas and bug reports",
          type: "primary",
        },
        {
          id: "content",
          label: "Generate Content",
          description: "Create blog posts or social media content",
          type: "primary",
        },
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    // Add user message to the chat
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (would connect to actual backend in production)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSimulatedResponse(input),
        timestamp: new Date(),
        actions: getSimulatedActions(input),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Handle action button clicks
  const handleActionClick = (actionId: string) => {
    const action = messages
      .flatMap((msg) => msg.actions || [])
      .find((a) => a.id === actionId)

    if (!action) return

    // Simulate user selecting an action
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `I want to ${action.label.toLowerCase()}`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response to the action
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getActionResponse(actionId),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  // Simulate responses based on input (would be replaced by actual AI in production)
  const getSimulatedResponse = (input: string) => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes("sentiment") || lowerInput.includes("community feeling")) {
      return "The overall community sentiment is currently at 72%, which is in the 'Positive' range. There's been a 5% increase over the last week. Would you like to see more details or take any actions based on this?"
    }
    
    if (lowerInput.includes("idea") || lowerInput.includes("suggestion") || lowerInput.includes("bug")) {
      return "There are 2 new community ideas that have been submitted. The most popular one is about adding a dark mode to the API documentation. Would you like me to generate a PRD for this idea?"
    }
    
    if (lowerInput.includes("blog") || lowerInput.includes("post") || lowerInput.includes("content")) {
      return "I can help you create blog content. What topic would you like to write about? I can suggest topics based on trending discussions in your community."
    }
    
    if (lowerInput.includes("code") || lowerInput.includes("example")) {
      return "I can help you find or create code examples. What language or framework are you interested in?"
    }
    
    return "I can help you with community sentiment analysis, idea management, content creation, and code examples. What would you like to focus on?"
  }

  // Simulate actions based on input
  const getSimulatedActions = (input: string): AgentAction[] => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes("sentiment")) {
      return [
        {
          id: "view-sentiment-details",
          label: "View Detailed Report",
          type: "primary",
        },
        {
          id: "analyze-trends",
          label: "Analyze Sentiment Trends",
          type: "secondary",
        }
      ]
    }
    
    if (lowerInput.includes("idea") || lowerInput.includes("bug")) {
      return [
        {
          id: "view-all-ideas",
          label: "View All Ideas",
          type: "primary",
        },
        {
          id: "generate-prd",
          label: "Generate PRD",
          type: "secondary",
        }
      ]
    }
    
    if (lowerInput.includes("blog") || lowerInput.includes("content")) {
      return [
        {
          id: "generate-blog-post",
          label: "Generate Blog Post",
          type: "primary",
        },
        {
          id: "create-social-post",
          label: "Create Social Post",
          type: "secondary",
        }
      ]
    }
    
    return []
  }

  // Get response for action clicks
  const getActionResponse = (actionId: string): string => {
    switch (actionId) {
      case "sentiment":
        return "The overall community sentiment is currently at 72%, which is in the 'Positive' range. There's been a 5% increase over the last week. The most positive topics are about the new API documentation and the community events. The areas that need attention are installation issues and error handling."
      
      case "ideas":
        return "Here are the latest community ideas:\n\n1. Add dark mode to API documentation (15 votes)\n2. Improve error messages for beginners (12 votes)\n3. Create more video tutorials (8 votes)\n\nWould you like me to generate a PRD for any of these ideas?"
      
      case "content":
        return "I can help you create content. What type of content would you like to generate?\n\n- Blog post\n- Social media update\n- Documentation\n- Release notes"
      
      case "view-sentiment-details":
        return "Here's a detailed breakdown of community sentiment:\n\n- Overall: 72% (Positive)\n- Documentation: 85% (Excellent)\n- API: 76% (Positive)\n- Installation: 45% (Needs Attention)\n- Support: 68% (Positive)\n\nThe main issues reported in the 'Needs Attention' areas are related to confusing error messages and installation problems on Windows."
      
      case "generate-prd":
        return "I'll help you create a PRD for the dark mode documentation feature. Here's an outline:\n\n1. Problem Statement\n2. User Stories\n3. Requirements\n4. Design Considerations\n5. Success Metrics\n\nWould you like me to expand on any of these sections?"
      
      default:
        return "I can help you with that. What specific information or actions would you like me to take?"
    }
  }

  return (
    <Card className={`bg-gray-800 border-gray-700 text-gray-100 flex flex-col ${isExpanded ? 'h-full' : 'h-[600px]'}`}>
      <CardHeader className="flex flex-row items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" />
            <AvatarFallback className="bg-purple-600 text-white">HD</AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg font-medium">HeyDev Agent</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white"
        >
          {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              
              {message.actions && message.actions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.actions.map((action) => (
                    <Button
                      key={action.id}
                      size="sm"
                      variant={action.type === "primary" ? "default" : "outline"}
                      className={
                        action.type === "primary"
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-gray-700 hover:bg-purple-800 hover:text-white"
                      }
                      onClick={() => handleActionClick(action.id)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 max-w-[80%] rounded-lg p-4">
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="border-t border-gray-700 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex w-full items-center space-x-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full rounded-md bg-gray-700 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            {input && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setInput("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
