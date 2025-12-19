'use client'

import { useState, useEffect } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Cozy Dev'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>{siteName}</div>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>Услуги</a>
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Преимущества</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Контакты</a>
        </nav>
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

