'use client'

import { useEffect, useRef, useCallback, useMemo } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
    x: number
    y: number
    radius: number
    vx: number
    vy: number
}

export default function ParticlesAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()

    const createParticles = useCallback((width: number, height: number): Particle[] => {
        const particleCount = Math.min(50, Math.floor((width * height) / 20000))
        return Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        }))
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

            particles.forEach((particle) => {
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fill()

                particle.x += particle.vx
                particle.y += particle.vy

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

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

            animationFrameId = requestAnimationFrame(drawParticles)
        }

        resizeCanvas()
        drawParticles()

        const handleResize = () => {
            resizeCanvas()
            particles.length = 0
            particles.push(...createParticles(window.innerWidth, window.innerHeight))
        }

        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', handleResize)
        }
    }, [createParticles, particles, theme])

    return (
        <div className="fixed inset-0">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 bg-white dark:bg-black transition-colors duration-300"
                style={{ width: '100vw', height: '100vh' }}
            />
        </div>
    )
}