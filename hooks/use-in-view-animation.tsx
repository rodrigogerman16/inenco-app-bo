"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewAnimationOptions {
  direction?: "left" | "right" | "up" | "down" | "center"
  duration?: number
  delay?: number
  threshold?: number
}

export function useInViewAnimation({
  direction = "up",
  duration = 600,
  delay = 0,
  threshold = 0.1,
}: UseInViewAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)"

    switch (direction) {
      case "left":
        return "translate3d(-50px, 0, 0)"
      case "right":
        return "translate3d(50px, 0, 0)"
      case "up":
        return "translate3d(0, 50px, 0)"
      case "down":
        return "translate3d(0, -50px, 0)"
      case "center":
        return "translate3d(0, 0, 0) scale(0.8)"
      default:
        return "translate3d(0, 50px, 0)"
    }
  }

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDelay: `${delay}ms`,
  }

  return { ref, style, isVisible }
}
