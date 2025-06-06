import { Copy, ArrowRight, Code } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function CodeExamples() {
  // Number of new examples
  const newExamplesCount = 3;
  
  // Mock data
  const examples = [
    {
      id: 1,
      summary: "Authentication Example",
      language: "typescript",
      content: `import { auth } from '@/lib/auth';\n\nasync function authenticate() {\n  const user = await auth.signIn({\n    email,\n    password\n  });\n  return user;\n}`,
    },
    {
      id: 2,
      summary: "API Route Example",
      language: "typescript",
      content: `export async function GET(request: Request) {\n  const data = await fetchData();\n  return Response.json(data);\n}`,
    },
  ]

  return (
    <Card className="h-[400px] flex flex-col bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 font-bold text-2xl">
              <Code className="h-6 w-6 text-purple-400" />
              Code Examples
            </CardTitle>
          </div>
          {newExamplesCount > 0 && (
            <div>
              <span className="text-2xl font-bold text-purple-400">{newExamplesCount}</span>
              <span className="text-gray-300 text-sm ml-1 align-bottom">new</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {examples.map((example) => (
            <div key={example.id} className="border-gray-700 border rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-100">{example.summary}</h3>
                <Badge variant="outline" className="bg-gray-700 text-gray-300">
                  {example.language}
                </Badge>
              </div>
              <div className="bg-gray-700 text-gray-200 rounded-md p-3 font-mono text-xs mb-3 overflow-x-auto">
                <pre>{example.content}</pre>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-2 mt-auto border-gray-700">
        <Link href="/code-examples" className="w-full">
          <Button 
            variant="outline" 
            className="w-full bg-gray-700 text-white hover:bg-purple-800 hover:text-white transition-colors duration-300" 
            size="sm"
          >
            View the Code
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
