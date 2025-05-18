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
  const [examples, setExamples] = useState<CodeExample[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndExtractExamples = async () => {
      setLoading(true)
      try {
        const res = await fetch("http://149.248.37.184:3000/content")
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        // Only consider drafts with markdown code blocks
        const codeExamples: CodeExample[] = []
        data.forEach((draft: any) => {
          if (!draft.content || typeof draft.content !== "string") return
          // Find all code blocks and their section headers
          const lines = draft.content.split(/\r?\n/)
          let currentSection = draft.title || "Untitled"
          let sectionText: string[] = []
          let inSection = false
          let codeBlock = null
          let codeLang = ""
          let codeLines: string[] = []
          let sectionStartIdx = 0
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const sectionMatch = line.match(/^##+\s+(.*)/)
            if (sectionMatch) {
              // New section starts
              currentSection = sectionMatch[1].trim()
              sectionText = []
              inSection = true
              sectionStartIdx = i
              continue
            }
            // Start of code block
            const codeStart = line.match(/^```([a-zA-Z]*)/)
            if (codeStart) {
              codeLang = codeStart[1] || ""
              codeLines = []
              // Find end of code block
              let j = i + 1
              while (j < lines.length && !lines[j].startsWith("```")) {
                codeLines.push(lines[j])
                j++
              }
              // Compose summary from section text up to code block
              let summary = sectionText.join(" ").replace(/[`#]/g, "").trim()
              if (!summary) summary = draft.summary || draft.excerpt || ""
              codeExamples.push({
                id: `${draft.id}-${i}`,
                title: currentSection,
                summary,
                language: codeLang || "markdown",
                content: codeLines.join("\n"),
                tags: [],
                created_at: draft.created_at || draft.inserted || "",
                updated_at: draft.updated_at || draft.inserted || ""
              })
              i = j // Skip to end of code block
              continue
            }
            if (inSection) {
              sectionText.push(line)
            }
          }
        })
        setExamples(codeExamples)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchAndExtractExamples()
  }, [])

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
