"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import VideoSection from "@/components/video-section"
import LeadForm from "@/components/lead-form"
import { Button } from "@/components/ui/button"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-white dark:text-slate-950" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function LandingPage() {
  const [showForm, setShowForm] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Show the button after 15 seconds
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 15000)

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 dark:bg-white">
      {/* Background animation */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Content positioned directly on top of the background */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Video prominently displayed at the top center */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <VideoSection videoId="rx9EwzMjfHg" />
        </div>

        <AnimatePresence>
          {!showForm ? (
            showButton && (
              <motion.div
                key="cta-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block group relative bg-gradient-to-b from-white/10 to-black/10 dark:from-black/10 dark:to-white/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Button
                    onClick={() => setShowForm(true)}
                    variant="ghost"
                    className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md bg-black/95 hover:bg-black/100 dark:bg-white/95 dark:hover:bg-white/100 text-white dark:text-black transition-all duration-300 group-hover:-translate-y-0.5 border-2 border-white/40 dark:border-black/40 hover:border-white/70 dark:hover:border-black/70 shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                  >
                    <span className="opacity-90 group-hover:opacity-100 transition-opacity">Comenzar Aquí</span>
                    <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                      →
                    </span>
                  </Button>
                </div>
              </motion.div>
            )
          ) : (
            <motion.div
              key="lead-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              <LeadForm onClose={() => setShowForm(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

