import styles from './Features.module.css'
import ScrollAnimation from './ScrollAnimation'
import CodeBackground from './CodeBackground'

const features = [
  {
    title: 'Мобильная оптимизация',
    description: 'Все проекты создаются с приоритетом на мобильные устройства',
  },
  {
    title: 'Современные технологии',
    description: 'Используем актуальные фреймворки и инструменты разработки',
  },
  {
    title: 'Быстрая разработка',
    description: 'Эффективные процессы позволяют запускать проекты в срок',
  },
  {
    title: 'Поддержка и развитие',
    description: 'Непрерывная поддержка и развитие вашего продукта',
  },
]

const featuresCode = `type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  {
    title: 'Мобильная оптимизация',
    description: 'Приоритет на мобильные устройства',
    icon: '📱'
  },
  {
    title: 'Современные технологии',
    description: 'Актуальные фреймворки',
    icon: '⚡'
  }
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="feature-card">
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
}`

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <CodeBackground code={featuresCode} />
      <div className={styles.container}>
        <ScrollAnimation>
          <h2 className={styles.title}>Почему выбирают нас для разработки в Пинске</h2>
        </ScrollAnimation>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className={styles.item}>
                <div className={styles.checkmark}>✓</div>
                <h3 className={styles.itemTitle}>{feature.title}</h3>
                <p className={styles.itemDescription}>{feature.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

