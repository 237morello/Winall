/**
 * Mission : Composant UI reutilisable : $base pour construire l'interface de facon coherente.
 */
"use client"

import { useState } from "react"
import { motion, useMotionValue, animate } from "motion/react"
import { FancyCard } from "./card-hover-light"

type CoverflowItem = {
  title: string
  description: string
  logo: React.ReactNode
  dialogContent?: React.ReactNode
  onClick?: () => void
}

const mod = (n: number, m: number) => ((n % m) + m) % m
const THRESHOLD = 40

export function CoverflowMobile({ items }: { items: CoverflowItem[] }) {
  const [current, setCurrent] = useState(0)
  const dragX = useMotionValue(0)
  const N = items.length

  const handleDragEnd = (_: never, info: { offset: { x: number } }) => {
    if (info.offset.x < -THRESHOLD) setCurrent(prev => mod(prev + 1, N))
    else if (info.offset.x > THRESHOLD) setCurrent(prev => mod(prev - 1, N))
    animate(dragX, 0, { duration: 0 })
  }

  const slots = [-1, 0, 1] as const

  const variants = {
    left:   { x: -148, scale: 0.72, rotateY:  15, filter: "blur(2.5px)", zIndex: 1,  boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
    center: { x: 0,    scale: 1.00, rotateY:   0, filter: "blur(0px)",   zIndex: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.22), 0 6px 20px rgba(0,0,0,0.12)" },
    right:  { x: 148,  scale: 0.72, rotateY: -15, filter: "blur(2.5px)", zIndex: 1,  boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  }

  const spring = { type: "spring" as const, stiffness: 260, damping: 28 }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center w-full h-72" style={{ perspective: "900px" }}>
        {slots.map(offset => {
          const idx = mod(current + offset, N)
          const item = items[idx]
          const key = `${offset}-${idx}`
          const vk = offset === -1 ? "left" : offset === 0 ? "center" : "right"
          const isSide = offset !== 0

          return (
            <motion.div
              key={key}
              className={`absolute w-52  ${isSide ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"}`}
              variants={variants}
              animate={vk}
              transition={spring}
              drag={!isSide ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              style={!isSide ? { x: dragX } : undefined}
              onDragEnd={!isSide ? handleDragEnd : undefined}
              onClick={isSide ? () => setCurrent(mod(current + offset, N)) : item.onClick}
            >
             <FancyCard
                      title={item.title}
                      description={item.description}
                      logo={item.logo}
                      dialogContent={item.dialogContent}
                       />
            </motion.div>
          )
        })}
      </div>

      {/* Pill dots */}
      <div className="flex items-center gap-2">
        {items.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === current ? 18 : 6, opacity: i === current ? 1 : 0.3 }}
            transition={spring}
            className="h-1.5 rounded-full bg-foreground"
          />
        ))}
      </div>
    </div>
  )
}
