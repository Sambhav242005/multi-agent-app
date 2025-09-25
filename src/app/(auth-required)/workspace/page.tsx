"use client"
// pages/workspace.tsx
import { useState } from "react"
import { HistorySidebar } from "@/components/history-sidebar"
import { LiveWorkingArea } from "@/components/live-working-area"

export default function WorkspacePage() {
  const [history, setHistory] = useState([
    {
      id: "1",
      title: "AI-powered task management app",
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      status: "completed"
    },
    {
      id: "2",
      title: "Sustainable packaging solution",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      status: "in-progress"
    },
    {
      id: "3",
      title: "Virtual fitness coaching platform",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      status: "pending"
    }
  ])
  
  const [selectedIdea, setSelectedIdea] = useState< | null>(null)
  const [activeAgent, setActiveAgent] = useState<string | null>(null)

  const handleSelectIdea = (idea: any) => {
    setSelectedIdea(idea)
    setActiveAgent(null) // Reset active agent when selecting a new idea
  }

  const handleIdeaSubmit = (ideaTitle: string) => {
    const newIdea: any = {
      id: Date.now().toString(),
      title: ideaTitle,
      timestamp: new Date(),
      status: "pending"
    }
    
    setHistory(prev => [newIdea, ...prev])
    setSelectedIdea(newIdea)
    setActiveAgent(null)
  }

  const handleAgentSelect = (agentId: string) => {
    setActiveAgent(agentId)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border/50 flex-shrink-0">
        <HistorySidebar 
          history={history} 
          onSelectIdea={handleSelectIdea} 
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-border/50 flex items-center px-6">
          <h1 className="text-xl font-semibold">Product Idea Workspace</h1>
          <div className="ml-auto flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              {selectedIdea ? `Working on: ${selectedIdea.title}` : "No idea selected"}
            </div>
            {selectedIdea && (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleAgentSelect("clarifier")}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activeAgent === "clarifier" 
                      ? "bg-blue-500 text-white" 
                      : "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                  }`}
                >
                  Clarifier
                </button>
                <button 
                  onClick={() => handleAgentSelect("product")}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activeAgent === "product" 
                      ? "bg-purple-500 text-white" 
                      : "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
                  }`}
                >
                  Product
                </button>
                <button 
                  onClick={() => handleAgentSelect("customer")}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activeAgent === "customer" 
                      ? "bg-green-500 text-white" 
                      : "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                  }`}
                >
                  Customer
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Working Area */}
        <div className="flex-1 p-6 overflow-auto">
          <LiveWorkingArea 
            activeAgent={activeAgent}
            currentIdea={selectedIdea?.title || ""}
            onIdeaSubmit={handleIdeaSubmit}
          />
        </div>
      </div>
    </div>
  )
}