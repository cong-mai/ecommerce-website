import { useEffect, useRef, useState } from "react"

export const useScrollDirection = (threshold = 10) => {
    const [hidden, setHidden] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        lastScrollY.current = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const diff = currentScrollY - lastScrollY.current

            if (Math.abs(diff) < threshold) return

            if (currentScrollY <= 0) {
                setHidden(false)
            } else if (diff > 0) {
                setHidden(true)
            } else {
                setHidden(false)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [threshold])

    return hidden
}
