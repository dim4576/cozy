import styles from './CodeBackground.module.css'

interface CodeBackgroundProps {
  code: string
}

// Простая функция для подсветки синтаксиса TypeScript
function highlightCode(code: string) {
  // Используем временные маркеры для защиты уже обработанных частей
  const markers: Array<{ id: string; content: string }> = []
  let markerId = 0
  
  const protect = (content: string): string => {
    const id = `__M${markerId++}__`
    markers.push({ id, content })
    return id
  }
  
  let highlighted = code
  
  // 1. Комментарии (сначала, чтобы не конфликтовали) - экранируем содержимое
  highlighted = highlighted.replace(/(\/\/.*$)/gm, (match) => {
    const escaped = match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return protect(`<span class="comment">${escaped}</span>`)
  })
  highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => {
    const escaped = match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return protect(`<span class="comment">${escaped}</span>`)
  })
  
  // 2. Строки (до ключевых слов, чтобы не обрабатывать их содержимое) - экранируем содержимое
  highlighted = highlighted.replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, (match) => {
    const escaped = match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return protect(`<span class="string">${escaped}</span>`)
  })
  
  // 3. Обрабатываем синтаксис ДО экранирования HTML (чтобы регулярные выражения работали правильно)
  // Ключевые слова (только вне строк и комментариев, которые уже защищены)
  highlighted = highlighted.replace(/\b(const|let|var|function|interface|type|export|import|return|if|else|for|while|async|await|class|extends|implements|typeof|keyof|in|of|as|is)\b/g, (match) => protect(`<span class="keyword">${match}</span>`))
  
  // Типы (должны быть после ключевых слов)
  highlighted = highlighted.replace(/\b([A-Z][a-zA-Z0-9]*)\b(?=\s*[<:;,\[\)])/g, (match) => protect(`<span class="type">${match}</span>`))
  
  // Функции (имена перед скобками)
  highlighted = highlighted.replace(/\b([a-z][a-zA-Z0-9]*)\s*(?=\()/g, (match) => protect(`<span class="function">${match.trim()}</span>`))
  
  // Числа
  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, (match) => protect(`<span class="number">${match}</span>`))
  
  // 4. Экранируем весь оставшийся код (кроме маркеров и уже обработанных span тегов)
  // Сначала восстанавливаем маркеры временно, чтобы экранировать только незащищенные части
  const tempMarkers = [...markers]
  for (let i = tempMarkers.length - 1; i >= 0; i--) {
    highlighted = highlighted.replace(new RegExp(tempMarkers[i].id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `__TEMP_${i}__`)
  }
  
  // Экранируем незащищенные части
  highlighted = highlighted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  
  // Восстанавливаем временные маркеры обратно
  for (let i = 0; i < tempMarkers.length; i++) {
    highlighted = highlighted.replace(`__TEMP_${i}__`, tempMarkers[i].id)
  }
  
  // Восстанавливаем маркеры в обратном порядке
  for (let i = markers.length - 1; i >= 0; i--) {
    highlighted = highlighted.replace(new RegExp(markers[i].id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), markers[i].content)
  }
  
  return highlighted
}

export default function CodeBackground({ code }: CodeBackgroundProps) {
  const highlightedCode = highlightCode(code)
  
  return (
    <div className={styles.codeBackground}>
      <pre className={styles.code}>
        <code className="codeBackground" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  )
}

