import { useEffect, useRef, useState } from 'react'

// блок считается «на экране», когда видно 12% и он поднялся на 6% выше нижнего края
const OBSERVER_OPTIONS = { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }

// Обёртка, дети которой плавно появляются при первом попадании блока на экран (стили — animations.css)
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!('IntersectionObserver' in window)) { setIsVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() }
    }, OBSERVER_OPTIONS)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal${isVisible ? ' is-in' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
