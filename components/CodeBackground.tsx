import styles from './CodeBackground.module.css'

interface CodeBackgroundProps {
  code: string
}

// Простая функция для подсветки синтаксиса TypeScript
function highlightCode(code: string) {
  // Сначала экранируем HTML
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // Используем маркеры для защиты уже обработанных частей
  const markers: string[] = []
  let markerIndex = 0
  
  // Функция для создания маркера
  const createMarker = (content: string) => {
    const marker = `__MARKER_${markerIndex++}__`
    markers.push(content)
    return marker
  }
  
  // 1. Комментарии (сначала, чтобы не конфликтовали)
  highlighted = highlighted.replace(/(\/\/.*$)/gm, (match) => createMarker(`<span class="comment">${match}</span>`))
  highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => createMarker(`<span class="comment">${match}</span>`))
  
  // 2. Строки (до ключевых слов, чтобы не обрабатывать их содержимое)
  highlighted = highlighted.replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, (match) => createMarker(`<span class="string">${match}</span>`))
  
  // 3. Ключевые слова (только вне строк и комментариев)
  highlighted = highlighted.replace(/\b(const|let|var|function|interface|type|export|import|return|if|else|for|while|async|await|class|extends|implements|typeof|keyof|in|of|as|is)\b/g, (match) => {
    // Проверяем, что это не внутри маркера
    if (!match.includes('__MARKER_')) {
      return createMarker(`<span class="keyword">${match}</span>`)
    }
    return match
  })
  
  // 4. Типы (должны быть после ключевых слов)
  highlighted = highlighted.replace(/\b([A-Z][a-zA-Z0-9]*)\b(?=\s*[<:;,\[\)])/g, (match) => {
    if (!match.includes('__MARKER_')) {
      return createMarker(`<span class="type">${match}</span>`)
    }
    return match
  })
  
  // 5. Функции (имена перед скобками)
  highlighted = highlighted.replace(/\b([a-z][a-zA-Z0-9]*)\s*(?=\()/g, (match) => {
    if (!match.includes('__MARKER_')) {
      return createMarker(`<span class="function">${match.trim()}</span>`)
    }
    return match
  })
  
  // 6. Числа
  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, (match) => {
    if (!match.includes('__MARKER_')) {
      return createMarker(`<span class="number">${match}</span>`)
    }
    return match
  })
  
  // Восстанавливаем маркеры
  markers.forEach((content, index) => {
    highlighted = highlighted.replace(`__MARKER_${index}__`, content)
  })
  
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

