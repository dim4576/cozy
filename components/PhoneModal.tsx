'use client'

import { useEffect } from 'react'
import styles from './PhoneModal.module.css'

interface PhoneModalProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
}

export default function PhoneModal({ isOpen, onClose, phoneNumber }: PhoneModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber)
    // Можно добавить уведомление о копировании
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <h3 className={styles.title}>Номер телефона</h3>
        <p className={styles.phoneNumber}>{phoneNumber}</p>
        <div className={styles.buttons}>
          <a href={`tel:${phoneNumber}`} className={styles.callButton} onClick={handleCall}>
            Позвонить
          </a>
          <button className={styles.copyButton} onClick={handleCopy}>
            Скопировать
          </button>
        </div>
      </div>
    </div>
  )
}

