"use client"

import { useState, useRef, useEffect } from "react"
import { Maximize2, Minimize2, Send, Bot, Sparkles, RefreshCw, DownloadCloud, Trash2, BarChart3, FileText, Users, Code } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useCopilotChat } from "@copilotkit/react-core"
import { CopilotChat } from "@copilotkit/react-ui"
import "@copilotkit/react-ui/styles.css"
import { cn } from "@/lib/utils"

const INSTRUCTION_TEMPLATE = `
You are a helpful assistant. Your task is to analyze the provided dataset and provide insights based on the user's request.

# Community Sentiment
This is a 0 - 1 scale where 0 is negative and 1 is positive and summarizes the overall sentiment of the community averaged across all topics.
| community_sentiment_value |
| ------------------------- |
| {community_sentiment_value} |




# Topic Sentiment
This is a 0 - 1 scale where 0 is negative and 1 is positive and summarizes the overall sentiment of the community averaged across all posts for a single topic.

| id | overall_sentiment_0_to_1 | rationale | topic_title | topic_summary |
| ---- | ------------------------- | --------- | ----------- | ------------- |
{topic_sentiment_rows}



# Product Ideas
This is a list of product ideas generated from the community feedback.

| id | title | summary |
| ---- | ----- | ------- |
{product_ideas_rows}

# Content
This is a list of content generated from the community feedback and recent product changelogs.

| id | channel | type | title | summary | content |
| ---- | ------- | ---- | ----- | ------- | ------- |
{content_rows}
`
function buildDatasetInstructions(dataset: any) {
  const { sentiment, topic_sentiment, product_ideas, content } = dataset

  console.log(dataset)

  const communitySentimentValue = sentiment[0]?.community_sentiment
  const topicSentimentRows = topic_sentiment.map((item) => {
    return `| ${item.id} | ${item.overall_sentiment_0_to_1} | ${item.rationale} | ${item.topic_title} | ${item.summary} |`
  }).join("\n")

  const productIdeasRows = product_ideas.map((item) => {
    return `| ${item.id} | ${item.title} | ${item.summary} |`
  }).join("\n")

  const contentRows = content.map((item) => {
    return `| ${item.id} | ${item.channel} | ${item.type} | ${item.title} | ${item.summary} | ${item.content} |`
  }).join("\n")

  console.log("communitySentimentValue", communitySentimentValue)
  return INSTRUCTION_TEMPLATE.replace("{community_sentiment_value}", communitySentimentValue)
    .replace("{topic_sentiment_rows}", topicSentimentRows)
    .replace("{product_ideas_rows}", productIdeasRows)
    .replace("{content_rows}", contentRows)
}

export function AgentInterface() {
  const [isExpanded, setIsExpanded] = useState(false) 
  const [instructions, setInstructions] = useState('') 
  const [userName, setUserName] = useState("NAME")
  const [isLoading, setIsLoading] = useState(false)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [repoUrl, setRepoUrl] = useState("")
  const [startDate, setStartDate] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  const customStyles = {
    '--copilot-chat-bg': '#1f2937', 
    '--copilot-chat-border': '#374151', 
    '--copilot-chat-input-bg': '#374151', 
    '--copilot-chat-input-text': '#f9fafb', 
    '--copilot-chat-user-bubble-bg': '#9333ea', 
    '--copilot-chat-user-bubble-text': '#ffffff', 
    '--copilot-chat-assistant-bubble-bg': '#4b5563', 
    '--copilot-chat-assistant-bubble-text': '#f3f4f6', 
    '--copilot-chat-send-button': '#9333ea', 
    '--copilot-chat-send-button-hover': '#7e22ce', 
  } as React.CSSProperties

  const { } = useCopilotChat();

  const baseUrl = "http://149.248.37.184:3000"

  useEffect(() => {
    const fetchDataset = async () => {
      const getData = async (path: string) => {
        try {
          const res = await fetch(`${baseUrl}/${path}`);
          if (!res.ok) throw new Error(`Request failed: ${res.status}`);
          return res.json();          // ← no extra parens needed
        } catch (err) {
          console.error("Error fetching data:", err);
          return null;                // return something so Promise.all always resolves
        }
      };

      try {
        // fire all four requests at once
        const [
          sentiment,
          topicSentiment,
          productIdeas,
          content,
        ] = await Promise.all([
          getData("sentiment"),
          getData("topic_sentiment"),
          getData("product_ideas"),
          getData("content"),
        ]);

        const newDataset = {
          sentiment,
          topic_sentiment: topicSentiment,
          product_ideas: productIdeas,
          content,
        };

        const instructions = buildDatasetInstructions(newDataset);
        console.log(instructions);
        setInstructions(instructions);

      } catch (err) {
        // this catches only if Promise.all rejects (e.g. network failure)
        console.error("Dataset fetch failed:", err);
      }
    };

    fetchDataset();




    if (activeFeature) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [activeFeature])

  const handleFeatureClick = (feature: string) => {
    setActiveFeature(feature)
  }

  const handleAnalyzeRepository = () => {
    if (!repoUrl || !startDate) {
      alert("Please provide both repository URL and start date.");
      return;
    }
    console.log("Analyzing repository:", { repoUrl, startDate })
    setActiveFeature("Repository Analysis Triggered"); 
  }



  return (
    <div className="p-4 md:p-20 space-y-6 text-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Hello, {userName} 👋</h1>
          <p className="text-gray-400 text-xl mt-1">Let's get started with your DevRel tasks.</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="text-gray-400 hover:text-white md:hidden" 
        >
          {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </Button>
      </div>

      
      <Card className={cn(
        "bg-gray-800 border-gray-700 text-gray-100 flex flex-col shadow-lg",
        isExpanded ? 'h-full' : 'h-[600px]' 
      )}>
        <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            <div>
              <CardTitle className="text-xl font-medium text-white">What can I help you with today?</CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[200px] border-r border-gray-700 p-4 flex flex-col gap-2 bg-gray-900/50">
            <div className="mt-auto pt-4 border-t border-gray-700 flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="justify-start text-sm h-9 text-gray-400 hover:bg-gray-700 hover:text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                New Chat
              </Button>
              <Button variant="ghost" size="sm" className="justify-start text-sm h-9 text-gray-400 hover:bg-gray-700 hover:text-white">
                <DownloadCloud className="h-4 w-4 mr-2" />
                Export Chat
              </Button>
              <Button variant="ghost" size="sm" className="justify-start text-sm h-9 text-gray-400 hover:bg-gray-700 hover:text-red-500">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Chat
              </Button>
            </div>
          </div>
          
          <CardContent className="flex-1 p-0 overflow-hidden" ref={chatContainerRef}>
            <div className="h-full flex flex-col rounded-lg overflow-hidden" style={customStyles}>
              {isLoading && (
                <div className="absolute inset-0 bg-gray-800/80 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                    <p className="text-sm text-gray-300">Loading {activeFeature}...</p>
                  </div>
                </div>
              )}
              <CopilotChat
                className="h-full"
                labels={{
                  initial: "Welcome! I'm just fetching the latest insights for you...",
                }}
                instructions={instructions}
              />
            </div>
          </CardContent>
        </div>
        
        <CardFooter className="px-6 py-4 border-t border-gray-700 bg-gray-800/90 flex justify-between items-center">
          <div></div> 
        </CardFooter>
      </Card>

      {/* Configure Repository Analysis Card */}
      <Card className="bg-gray-800 border-gray-700 shadow-lg mt-32"> 
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-xl font-medium text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            Configure Repository Analysis
          </CardTitle>
          <CardDescription className="text-gray-400 text-xs mt-1">
            Provide a GitHub repository URL and a start date for the analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-300 mb-1.5">
                GitHub Repository URL
              </label>
              <Input 
                id="repoUrl" 
                type="url" 
                placeholder="https://github.com/your-org/your-repo" 
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1.5">
                Start Date for Analysis
              </label>
              <Input 
                id="startDate" 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500 text-sm w-full appearance-none"
              />
            </div>
            <Button 
              onClick={handleAnalyzeRepository}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm h-10"
            >
              Analyze Repository
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
