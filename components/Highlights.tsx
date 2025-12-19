import styles from './Highlights.module.css'
import ScrollAnimation from './ScrollAnimation'

const highlights = [
  {
    icon: '🚀',
    title: 'Быстрая разработка',
  },
  {
    icon: '📱',
    title: 'Мобильная оптимизация',
  },
  {
    icon: '🎨',
    title: 'Современный дизайн',
  },
]

export default function Highlights() {
  return (
    <section className={styles.highlights}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {highlights.map((highlight, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className={styles.item}>
                <div className={styles.icon}>{highlight.icon}</div>
                <h3 className={styles.title}>{highlight.title}</h3>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

