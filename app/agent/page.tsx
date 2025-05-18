"use client"

import { useState, useRef, useEffect } from "react"
import { Layout } from "@/components/layout"
import { AgentInterface } from "@/components/agent-interface"

export default function AgentPage() {
  return (
    <Layout currentPath="/agent">
      <div className="h-full flex flex-col">
        <AgentInterface />
      </div>
    </Layout>
  )
}
