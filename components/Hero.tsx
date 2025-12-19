import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✨</span>
            <span>Профессиональная разработка</span>
          </div>
          <h1 className={styles.title}>
            Разработка сайтов и программ
            <span className={styles.gradient}> в Пинске, Бресте, Минске</span>
          </h1>
          <p className={styles.subtitle}>
            Профессиональная разработка сайтов, программного обеспечения, мобильных приложений 
            и прошивок для микроконтроллеров. Мультиплатформенные решения от микроконтроллеров до десктопных приложений.
          </p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100+</div>
              <div className={styles.statLabel}>Проектов</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Клиентов</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>Лет опыта</div>
            </div>
          </div>

          <div className={styles.buttons}>
            <a href="#contact" className={styles.primaryButton}>
              Начать проект
            </a>
            <a href="#services" className={styles.secondaryButton}>
              Наши услуги
            </a>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.cardHeaderDots}>
                  <span className={styles.dotRed}></span>
                  <span className={styles.dotYellow}></span>
                  <span className={styles.dotGreen}></span>
                </div>
                <div className={styles.cardHeaderUrl}>
                  <span className={styles.urlIcon}>🔒</span>
                  <span className={styles.urlText}>cozyspace.dev</span>
                </div>
              </div>
              <div className={styles.cardHeaderRight}>
                <div className={styles.cardHeaderIcon}>⋮</div>
              </div>
            </div>
            <div className={styles.cardNav}>
              <div className={styles.navItem}>Главная</div>
              <div className={styles.navItem}>Услуги</div>
              <div className={styles.navItem}>О нас</div>
              <div className={styles.navItem}>Контакты</div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHero}>
                <div className={styles.cardHeroTitle}>
                  <div className={styles.titleLine1}></div>
                  <div className={styles.titleLine2}></div>
                </div>
                <div className={styles.cardHeroSubtitle}></div>
                <div className={styles.cardHeroButtons}>
                  <div className={styles.heroButtonPrimary}></div>
                  <div className={styles.heroButtonSecondary}></div>
                </div>
              </div>
              <div className={styles.cardFeatures}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🌐</div>
                  <div className={styles.featureText}>
                    <div className={styles.featureTitle}></div>
                    <div className={styles.featureDesc}></div>
                  </div>
                </div>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>📱</div>
                  <div className={styles.featureText}>
                    <div className={styles.featureTitle}></div>
                    <div className={styles.featureDesc}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardBadge}>React</div>
              <div className={styles.cardBadge}>TypeScript</div>
              <div className={styles.cardBadge}>Next.js</div>
              <div className={styles.cardBadge}>Tailwind</div>
            </div>
          </div>
          <div className={styles.floatingElements}>
            <div className={styles.floatingElement1}>💡</div>
            <div className={styles.floatingElement2}>⚡</div>
            <div className={styles.floatingElement3}>🎯</div>
          </div>
        </div>
      </div>
    </section>
  )
}

