"use client"

import { RootState } from "@/lib/store/store"

import { useDispatch, useSelector } from "react-redux"

import { onClose, onOpen } from "@/lib/store/slices/mobileSidebarSlice"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import Sidebar from "./Sidebar"

export const MobileSidebar = () => {
  const pathname = usePathname()
  const dispatch = useDispatch()

  const isOpen = useSelector((state: RootState) => state.mobileSidebar.value)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    dispatch(onClose())
  }, [pathname, onClose])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Button
        onClick={() => dispatch(onOpen())}
        className="block md:hidden mr-2"
        variant={"ghost"}
        size={"sm"}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={() => dispatch(onClose())}>
        <SheetContent side={"left"} className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  )
}
