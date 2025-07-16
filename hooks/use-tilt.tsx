"use client"

import { useState, useRef, useEffect, type CSSProperties } from "react"

interface UseTiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  transitionDuration?: string
  transitionTimingFunction?: string
}

export function useTilt({
  maxTilt = 10,
  perspective = 1000,
  scale = 1,
  transitionDuration = "150ms",
  transitionTimingFunction = "ease-out",
}: UseTiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({
    transformStyle: "preserve-3d",
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(${scale})`,
    transitionProperty: "transform",
    transitionDuration: transitionDuration,
    transitionTimingFunction: transitionTimingFunction,
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const rotateX = (mouseY / (height / 2)) * maxTilt * -1
      const rotateY = (mouseX / (width / 2)) * maxTilt

      setTiltStyle({
        transformStyle: "preserve-3d",
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transitionProperty: "transform",
        transitionDuration: "0ms", // No transition during mouse move
        transitionTimingFunction: transitionTimingFunction,
      })
    }

    const handleMouseLeave = () => {
      setTiltStyle({
        transformStyle: "preserve-3d",
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(${scale})`,
        transitionProperty: "transform",
        transitionDuration: transitionDuration, // Apply transition on leave
        transitionTimingFunction: transitionTimingFunction,
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [maxTilt, perspective, scale, transitionDuration, transitionTimingFunction])

  return { ref, tiltStyle }
}
