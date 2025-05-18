"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Code, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/layout"

interface CodeExample {
  id: string;
  title: string;
  summary: string;
  language: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default function CodeExamplesPage() {
  // Mock data for code examples
  const [examples, setExamples] = useState<CodeExample[]>([
    {
      id: "1",
      title: "Authentication Example",
      summary: "How to implement user authentication with our SDK",
      language: "typescript",
      content: `import { auth } from '@/lib/auth';\n\nasync function authenticate() {\n  const user = await auth.signIn({\n    email,\n    password\n  });\n  return user;\n}`,
      tags: ["authentication", "user", "login"],
      created_at: "2025-04-10T14:48:00",
      updated_at: "2025-05-01T09:15:00"
    },
    {
      id: "2",
      title: "API Route Example",
      summary: "Creating a basic API route with our framework",
      language: "typescript",
      content: `export async function GET(request: Request) {\n  const data = await fetchData();\n  return Response.json(data);\n}`,
      tags: ["api", "routes", "backend"],
      created_at: "2025-04-15T10:30:00",
      updated_at: "2025-04-15T10:30:00"
    },
    {
      id: "3",
      title: "Data Fetching with Hooks",
      summary: "Using our custom hooks for data fetching",
      language: "typescript",
      content: `import { useData } from '@/hooks/data';\n\nfunction ProductList() {\n  const { data, loading, error } = useData('/api/products');\n  \n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>Error: {error.message}</p>;\n  \n  return (\n    <ul>\n      {data.map(product => (\n        <li key={product.id}>{product.name}</li>\n      ))}\n    </ul>\n  );\n}`,
      tags: ["hooks", "data-fetching", "frontend"],
      created_at: "2025-04-20T16:22:00",
      updated_at: "2025-05-05T11:45:00"
    },
    {
      id: "4",
      title: "WebSocket Integration",
      summary: "How to set up real-time communication with WebSockets",
      language: "javascript",
      content: `import { createWebSocketClient } from '@/lib/websocket';\n\nconst socket = createWebSocketClient('wss://api.example.com/ws');\n\nsocket.on('connect', () => {\n  console.log('Connected to WebSocket server');\n});\n\nsocket.on('message', (data) => {\n  console.log('Received message:', data);\n});\n\nsocket.on('disconnect', () => {\n  console.log('Disconnected from WebSocket server');\n});`,
      tags: ["websocket", "real-time", "communication"],
      created_at: "2025-04-25T09:10:00",
      updated_at: "2025-04-25T09:10:00"
    },
    {
      id: "5",
      title: "Form Validation",
      summary: "Implementing form validation with our validation library",
      language: "typescript",
      content: `import { useForm } from '@/lib/forms';\n\nfunction ContactForm() {\n  const { register, handleSubmit, errors } = useForm();\n  \n  const onSubmit = (data) => {\n    console.log('Form submitted:', data);\n  };\n  \n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input\n        {...register('email', { \n          required: 'Email is required',\n          pattern: {\n            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,\n            message: 'Invalid email address'\n          }\n        })}\n      />\n      {errors.email && <p>{errors.email.message}</p>}\n      \n      <button type="submit">Submit</button>\n    </form>\n  );\n}`,
      tags: ["forms", "validation", "frontend"],
      created_at: "2025-05-01T14:30:00",
      updated_at: "2025-05-10T16:20:00"
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const languages = Array.from(new Set(examples.map(ex => ex.language)))

  // Filter examples based on search term and selected language
  const filteredExamples = examples.filter(example => {
    const matchesSearch = searchTerm === "" || 
      example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      example.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      example.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesLanguage = selectedLanguage === null || example.language === selectedLanguage
    
    return matchesSearch && matchesLanguage
  })

  // Function to copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Code copied to clipboard!")
      })
      .catch(err => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <Layout currentPath="/code-examples">
      <Card className="bg-gray-800 border-gray-700 text-gray-100 mb-6">
        <CardHeader>
          <CardTitle>Search Code Examples</CardTitle>
          <CardDescription>
            Find code examples by keyword, language, or tag
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search examples..."
                className="w-full pl-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">Language:</span>
              <select 
                className="bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedLanguage || ""}
                onChange={(e) => setSelectedLanguage(e.target.value || null)}
              >
                <option value="">All</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredExamples.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700 text-gray-100 p-8 text-center">
            <p className="text-gray-400">No code examples found matching your criteria</p>
          </Card>
        ) : (
          filteredExamples.map((example) => (
            <Card key={example.id} className="bg-gray-800 border-gray-700 text-gray-100">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{example.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {example.summary}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-gray-700 text-gray-300">
                    {example.language}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-200 rounded-md p-4 font-mono text-sm mb-4 overflow-x-auto">
                  <pre>{example.content}</pre>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {example.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-purple-900/30 text-purple-300 hover:bg-purple-800/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div>
                    Updated: {new Date(example.updated_at).toLocaleDateString()}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gray-700 hover:bg-purple-800 hover:text-white"
                    onClick={() => copyToClipboard(example.content)}
                  >
                    <Copy className="h-3.5 w-3.5 mr-2" />
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Layout>
  )
}
