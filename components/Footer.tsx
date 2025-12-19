import styles from './Footer.module.css'

export default function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Cozy Dev'
  const siteTagline = process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Создаём современные цифровые решения'
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@cozydev.ru'
  const contactTelegram = process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || 'https://t.me/doc_chaizer'
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+79999999999'
  const socialVK = process.env.NEXT_PUBLIC_SOCIAL_VK || ''
  const socialInstagram = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || ''

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.logo}>{siteName}</div>
            <p className={styles.tagline}>
              {siteTagline}
            </p>
          </div>
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Услуги</h4>
              <a href="#services" className={styles.link}>Разработка сайтов</a>
              <a href="#services" className={styles.link}>Мобильные приложения</a>
              <a href="#services" className={styles.link}>Разработка программ</a>
              <a href="#services" className={styles.link}>Дизайн</a>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Контакты</h4>
              <a href={`mailto:${contactEmail}`} className={styles.link}>
                {contactEmail}
              </a>
              <a href={contactTelegram} target="_blank" rel="noopener noreferrer" className={styles.link}>
                Telegram
              </a>
              <a href={`tel:${contactPhone}`} className={styles.link}>
                {contactPhone}
              </a>
            </div>
            {(socialVK || socialInstagram) && (
              <div className={styles.linkGroup}>
                <h4 className={styles.linkTitle}>Социальные сети</h4>
                {socialVK && (
                  <a href={socialVK} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    ВКонтакте
                  </a>
                )}
                {socialInstagram && (
                  <a href={socialInstagram} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Instagram
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} {siteName}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

