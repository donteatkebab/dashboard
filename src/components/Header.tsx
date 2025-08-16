"use client"

import React from "react"
import { usePathname } from "next/navigation"
import ModeToggle from "./ModeToggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "./ui/sidebar"

const breadcrumbTitles: Record<string, string> = {
  "": "Shop",
  dashboard: "Dashboard",
  products: "Products",
  categories: "Categories",
  orders: "Orders",
  customers: "Customers"
}

const Header = () => {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <header className="flex h-16 items-center gap-4 px-4 justify-between">
      <div className="flex items-center shrink-0 gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            {segments.length === 0 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbTitles[""]}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/")
                const title = breadcrumbTitles[segment] || segment
                const isLast = index === segments.length - 1

                return (
                  <React.Fragment key={href}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && (
                      <BreadcrumbSeparator />
                    )}
                  </React.Fragment>
                )
              })
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ModeToggle />
    </header>
  )
}

export default Header
