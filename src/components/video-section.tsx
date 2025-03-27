"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface VideoSectionProps {
  videoId: string
}

export default function VideoSection({ videoId }: VideoSectionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl relative"
    >
      <div className="aspect-video bg-neutral-900 dark:bg-neutral-100 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-neutral-400 dark:text-neutral-600 animate-spin" />
          </div>
        )}

        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </motion.div>
  )
}

