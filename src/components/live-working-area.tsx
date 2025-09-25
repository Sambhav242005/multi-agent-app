// components/live-working-area.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Lightbulb, 
  BarChart, 
  Settings, 
  Users, 
  FileText, 
  Send,
  Bot,
  CheckCircle
} from "lucide-react"
import { useState } from "react"

interface LiveWorkingAreaProps {
  activeAgent: string | null
  currentIdea: string
  onIdeaSubmit: (idea: string) => void
}

const agentDetails: Record<string, { name: string; icon: any; description: string; color: string }> = {
  clarifier: { 
    name: "Clarifier Agent", 
    icon: MessageSquare, 
    description: "Asks questions to understand your vision",
    color: "bg-blue-500"
  },
  product: { 
    name: "Product Agent", 
    icon: Lightbulb, 
    description: "Analyzes product viability",
    color: "bg-purple-500"
  },
  customer: { 
    name: "Customer Agent", 
    icon: Users, 
    description: "Evaluates customer needs",
    color: "bg-green-500"
  },
  risk: { 
    name: "Risk Agent", 
    icon: BarChart, 
    description: "Identifies potential risks",
    color: "bg-red-500"
  },
  engineer: { 
    name: "Engineer Agent", 
    icon: Settings, 
    description: "Assesses technical feasibility",
    color: "bg-yellow-500"
  },
  diagram: { 
    name: "Diagram Agent", 
    icon: FileText, 
    description: "Creates visual workflows",
    color: "bg-indigo-500"
  },
  summary: { 
    name: "Summary Agent", 
    icon: FileText, 
    description: "Generates implementation plan",
    color: "bg-pink-500"
  }
}

export function LiveWorkingArea({ activeAgent, currentIdea, onIdeaSubmit }: LiveWorkingAreaProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onIdeaSubmit(inputValue)
      setInputValue("")
    }
  }
  

  return (
    <Card className="h-full border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-accent" />
          Live Working Area
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)] flex flex-col">
        {!currentIdea ? (
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Enter Your Product Idea</h3>
              <Textarea
                placeholder="Describe your product idea in detail..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="min-h-[120px] mb-3"
              />
              <Button 
                onClick={handleSubmit} 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4 mr-2" /> Submit Idea
              </Button>
            </div>
            
            <div className="mt-auto pt-4 border-t border-border/50">
              <h3 className="font-medium mb-3">How It Works</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                  <span>Enter your product idea</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                  <span>Our agents analyze it from different perspectives</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                  <span>Get a comprehensive refinement plan</span>
                </li>
              </ul>
            </div>
          </div>
        ) : activeAgent ? (
          <div className="flex flex-col h-full">
            <AgentCard agent={agentDetails[activeAgent]} />
            
            <div className="flex-1 mb-4 bg-muted/30 rounded-lg p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-background p-3 rounded-lg">
                  <p className="text-sm">What problem does your product solve?</p>
                </div>
                <div className="bg-background p-3 rounded-lg">
                  <p className="text-sm">Who is your target audience?</p>
                </div>
                <div className="bg-background p-3 rounded-lg">
                  <p className="text-sm">What makes your solution unique?</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <Textarea
                placeholder="Type your response here..."
                className="mb-3"
              />
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Submit Response
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Select an Agent</h3>
            <p className="text-muted-foreground mb-6">
              Choose an agent from the workflow to start refining your product idea.
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Select First Agent
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AgentCard({ agent }:{agent:any}) {
  const Icon = agent.icon;
  return (
    <div className="mb-4">
      <div className="flex items-center mb-3">
        <div className={`w-8 h-8 ${agent.color} rounded-full flex items-center justify-center mr-2`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-medium">{agent.name}</h3>
        <Badge variant="outline" className="ml-2 bg-accent/10 text-accent">Active</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
    </div>
  );
}
