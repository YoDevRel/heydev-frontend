import { ArrowRight, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CommunityIdeas() {
  // Mock data
  const ideas = [
    {
      id: 1,
      title: "Add TypeScript template support",
      summary: "Community members are requesting built-in TypeScript templates for faster project setup.",
      hasPRD: true,
    },
    {
      id: 2,
      title: "Improve error messages in CLI",
      summary: "Error messages in the CLI tool are confusing for new users. Need more descriptive errors.",
      hasPRD: false,
    },
    {
      id: 3,
      title: "Support for custom themes",
      summary: "Allow developers to create and share custom themes for the dashboard.",
      hasPRD: true,
    },
  ]

  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-gray-400" />
          Bug Fixes & Community Ideas
        </CardTitle>
        <CardDescription>Top suggestions and bug reports from the community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="border-gray-700 rounded-lg p-3 hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-100">{idea.title}</h3>
                {idea.hasPRD ? (
                  <Badge variant="outline" className="bg-purple-900 text-purple-300 hover:bg-purple-800">
                    PRD Ready
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-700 text-gray-300 hover:bg-gray-600">
                    Needs PRD
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-300 mb-2">{idea.summary}</p>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900">
                  {idea.hasPRD ? "View PRD" : "Generate PRD"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" size="sm">
          View All Ideas
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
