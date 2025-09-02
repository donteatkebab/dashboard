"use client"

import React from "react"
import ModeToggle from "./ModeToggle"
import { Button } from "./ui/button"
import Link from "next/link"
import { Frame } from "lucide-react"

const Header = () => {

  return (
    <header className="flex h-16 items-center gap-4 justify-between">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link href="/">
            <Button variant="outline" size="icon">
              <Frame />
            </Button>
          </Link>
          <Link href="/">
            <p className="text-sm font-semibold">Gholam store</p>
          </Link>
        </div>
        <div className="flex gap-4">
          <ModeToggle />
          <Link href="/dashboard">
            <Button>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
