"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewAnimationOptions extends IntersectionObserverInit {
  unobserveOnEnter?: boolean // New option to stop observing once element enters view
}

export function useInViewAnimation(options?: UseInViewAnimationOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false) // Initial state is false
  const unobserveOnEnter = options?.unobserveOnEnter ?? true

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set isInView based on current intersection status
        setIsInView(entry.isIntersecting) // This is the key change

        if (entry.isIntersecting && unobserveOnEnter) {
          observer.unobserve(entry.target)
        }
      },
      {
        root: options?.root,
        rootMargin: options?.rootMargin,
        threshold: options?.threshold ?? 0,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options?.root, options?.rootMargin, options?.threshold, unobserveOnEnter])

  return { ref, isInView }
}
