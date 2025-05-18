"use client"

import { ReactNode } from "react"
import { DashboardHeader } from "@/components/dashboard-header"

interface LayoutProps {
  children: ReactNode
  currentPath?: string
}

export function Layout({ children, currentPath = "/" }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <DashboardHeader currentPath={currentPath} />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
}
