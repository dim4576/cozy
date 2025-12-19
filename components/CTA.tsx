'use client'

import { useState, useEffect } from 'react'
import styles from './CTA.module.css'
import ScrollAnimation from './ScrollAnimation'
import PhoneModal from './PhoneModal'

export default function CTA() {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const contactTelegram = process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || 'https://t.me/doc_chaizer'
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+79999999999'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      e.preventDefault()
      setIsPhoneModalOpen(true)
    }
  }

  return (
    <>
      <section id="contact" className={styles.cta}>
        <div className={styles.container}>
          <ScrollAnimation>
            <h2 className={styles.title}>Готовы начать проект?</h2>
            <p className={styles.subtitle}>
              Свяжитесь с нами и обсудим ваши идеи
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <div className={styles.buttons}>
              <a href={contactTelegram} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
                Написать нам
              </a>
              <a 
                href={`tel:${contactPhone}`} 
                className={styles.secondaryButton}
                onClick={handlePhoneClick}
              >
                Позвонить
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>
      <PhoneModal 
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        phoneNumber={contactPhone}
      />
    </>
  )
}

