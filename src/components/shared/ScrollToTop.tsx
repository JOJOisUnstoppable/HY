"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            // 修改检测逻辑，当滚动超过300px时显示
            setIsVisible(window.scrollY > 300)
        }

        // 初始检测
        toggleVisibility()
        
        // 使用 passive 监听器提高性能
        window.addEventListener("scroll", toggleVisibility, { passive: true })

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    if (!isVisible) return null

    return (
        <Button
            onClick={scrollToTop}
            size="icon"
            variant="secondary"
            className="fixed bottom-8 right-8 z-[9999] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary/90 hover:bg-primary text-primary-foreground"
            aria-label="Scroll To Top 返回顶部"
        >
            <ChevronUp className="h-6 w-6" />
        </Button>
    )
}