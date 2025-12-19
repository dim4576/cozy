import styles from './Services.module.css'
import ScrollAnimation from './ScrollAnimation'
import CodeBackground from './CodeBackground'

const services = [
  {
    icon: '🌐',
    title: 'Разработка сайтов',
    description: 'Современные веб-сайты с адаптивным дизайном, быстрой загрузкой и отличным UX. Разработка сайтов в Пинске, Бресте, Минске и по всей Беларуси',
  },
  {
    icon: '💻',
    title: 'Разработка программ',
    description: 'Разработка программного обеспечения и десктопных приложений для Windows, macOS и Linux',
  },
  {
    icon: '📱',
    title: 'Мобильные приложения',
    description: 'Нативные и кроссплатформенные приложения для iOS и Android',
  },
  {
    icon: '🔧',
    title: 'Прошивки микроконтроллеров',
    description: 'Разработка прошивок для микроконтроллеров и встраиваемых систем',
  },
]

const servicesCode = `interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    id: 'web',
    title: 'Разработка сайтов',
    description: 'Современные веб-сайты',
    icon: '🌐'
  },
  {
    id: 'mobile',
    title: 'Мобильные приложения',
    description: 'iOS и Android',
    icon: '📱'
  }
];

export default function Services() {
  return services.map(service => (
    <ServiceCard key={service.id} {...service} />
  ));
}`

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <CodeBackground code={servicesCode} />
      <div className={styles.container}>
        <ScrollAnimation>
          <h2 className={styles.title}>Разработка сайтов и программ в Пинске, Бресте, Минске</h2>
          <p className={styles.subtitle}>
            Полный цикл разработки от идеи до запуска. Разработка сайтов, программного обеспечения, 
            мобильных приложений и прошивок для микроконтроллеров
          </p>
        </ScrollAnimation>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className={styles.card}>
                <div className={styles.icon}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

