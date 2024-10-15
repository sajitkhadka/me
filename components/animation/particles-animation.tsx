'use client'

import { useEffect, useRef, useCallback, useMemo, useState } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
    x: number
    y: number
    radius: number
    vx: number
    vy: number
    originalVx: number
    originalVy: number
}

interface MouseTrail {
    x: number
    y: number
    radius: number
}

interface ClickEffect {
    x: number
    y: number
    radius: number
    alpha: number
}

export default function ParticlesAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
    const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])
    const [isMouseOnScreen, setIsMouseOnScreen] = useState(false)

    const createParticles = useCallback((width: number, height: number): Particle[] => {
        const particleCount = Math.min(50, Math.floor((width * height) / 20000))
        return Array.from({ length: particleCount }, () => {
            const vx = (Math.random() - 0.5) * 0.5
            const vy = (Math.random() - 0.5) * 0.5
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                vx,
                vy,
                originalVx: vx,
                originalVy: vy,
            }
        })
    }, [])

    const particles = useMemo(() => createParticles(
        typeof window !== 'undefined' ? window.innerWidth : 1920,
        typeof window !== 'undefined' ? window.innerHeight : 1080
    ), [createParticles])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const drawParticles = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const isDarkMode = theme === 'dark'
            ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgb(0, 31, 63, 0.09)'
            ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgb(58, 109, 140, 0.09)'
            ctx.lineWidth = 0.7

            particles.forEach((particle) => {
                const dx = particle.x - mousePos.x
                const dy = particle.y - mousePos.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const avoidanceRadius = 150

                if (distance < avoidanceRadius) {
                    const angle = Math.atan2(dy, dx)
                    const force = (avoidanceRadius - distance) / avoidanceRadius
                    particle.vx = particle.originalVx + Math.cos(angle) * force * 2
                    particle.vy = particle.originalVy + Math.sin(angle) * force * 2
                } else {
                    particle.vx = particle.originalVx
                    particle.vy = particle.originalVy
                }

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fill()

                particle.x += particle.vx
                particle.y += particle.vy

                particle.x = (particle.x + canvas.width) % canvas.width
                particle.y = (particle.y + canvas.height) % canvas.height

                particles.forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x
                    const dy = particle.y - otherParticle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120) {
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(otherParticle.x, otherParticle.y)
                        ctx.stroke()
                    }
                })
            })

            clickEffects.forEach((effect, index) => {
                ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${effect.alpha})` : `rgba(0, 0, 0, ${effect.alpha})`
                ctx.beginPath()
                ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2)
                ctx.stroke()

                effect.radius += 2
                effect.alpha -= 0.02

                if (effect.alpha <= 0) {
                    clickEffects.splice(index, 1)
                }
            })

            animationFrameId = requestAnimationFrame(drawParticles)
        }

        resizeCanvas()
        drawParticles()

        const handleResize = () => {
            resizeCanvas()
            particles.length = 0
            particles.push(...createParticles(window.innerWidth, window.innerHeight))
        }

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        const handleMouseEnter = () => {
            setIsMouseOnScreen(true)
        }

        const handleMouseLeave = () => {
            setIsMouseOnScreen(false)
            setMousePos({ x: -100, y: -100 })
        }

        const handleClick = (e: MouseEvent) => {
            setClickEffects(prev => [
                ...prev,
                { x: e.clientX, y: e.clientY, radius: 0, alpha: 1 }
            ])
        }

        window.addEventListener('resize', handleResize)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseenter', handleMouseEnter)
        canvas.addEventListener('mouseleave', handleMouseLeave)
        canvas.addEventListener('click', handleClick)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', handleResize)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseenter', handleMouseEnter)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
            canvas.removeEventListener('click', handleClick)
        }
    }, [createParticles, particles, theme, mousePos, clickEffects, isMouseOnScreen])


    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-0"
        />

    )
}
