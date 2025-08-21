"use client"

import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import Image from "next/image"

interface SolutionLayoutProps {
  title: string
  description: string
  features?: string[]
  imageSrc?: string
  imageAlt?: string
}

export default function SolutionLayout({
  title,
  description,
  features = [],
  imageSrc = "/placeholder.svg?height=400&width=600",
  imageAlt = "Solution illustration",
}: SolutionLayoutProps) {
  const { ref: titleRef, style: titleStyle } = useInViewAnimation({
    direction: "left",
    duration: 800,
    delay: 200,
  })

  const { ref: descRef, style: descStyle } = useInViewAnimation({
    direction: "left",
    duration: 800,
    delay: 400,
  })

  const { ref: featuresRef, style: featuresStyle } = useInViewAnimation({
    direction: "left",
    duration: 800,
    delay: 600,
  })

  const { ref: imageRef, style: imageStyle } = useInViewAnimation({
    direction: "center",
    duration: 800,
    delay: 300,
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Content */}
          <div className="space-y-8">
            <h1 ref={titleRef} style={titleStyle} className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-400">
              {title}
            </h1>

            <div ref={descRef} style={descStyle} className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {features.length > 0 && (
              <div ref={featuresRef} style={featuresStyle} className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">Características principales:</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Diagonal separator */}
          <div className="hidden lg:block absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-teal-400/50 to-transparent transform -translate-x-1/2"></div>

          {/* Right side - Image */}
          <div ref={imageRef} style={imageStyle} className="flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-teal-400/20 rounded-lg blur-xl"></div>
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={imageAlt}
                width={600}
                height={400}
                className="relative z-10 w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
