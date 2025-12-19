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
  
  // Используем временные маркеры для защиты уже обработанных частей
  const markers: Array<{ id: string; content: string }> = []
  let markerId = 0
  
  const protect = (content: string): string => {
    const id = `__M${markerId++}__`
    markers.push({ id, content })
    return id
  }
  
  // 1. Комментарии (сначала, чтобы не конфликтовали)
  highlighted = highlighted.replace(/(\/\/.*$)/gm, (match) => protect(`<span class="comment">${match}</span>`))
  highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => protect(`<span class="comment">${match}</span>`))
  
  // 2. Строки (до ключевых слов, чтобы не обрабатывать их содержимое)
  highlighted = highlighted.replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, (match) => protect(`<span class="string">${match}</span>`))
  
  // 3. Ключевые слова (только вне строк и комментариев)
  highlighted = highlighted.replace(/\b(const|let|var|function|interface|type|export|import|return|if|else|for|while|async|await|class|extends|implements|typeof|keyof|in|of|as|is)\b/g, (match) => protect(`<span class="keyword">${match}</span>`))
  
  // 4. Типы (должны быть после ключевых слов)
  highlighted = highlighted.replace(/\b([A-Z][a-zA-Z0-9]*)\b(?=\s*[<:;,\[\)])/g, (match) => protect(`<span class="type">${match}</span>`))
  
  // 5. Функции (имена перед скобками)
  highlighted = highlighted.replace(/\b([a-z][a-zA-Z0-9]*)\s*(?=\()/g, (match) => protect(`<span class="function">${match.trim()}</span>`))
  
  // 6. Числа
  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, (match) => protect(`<span class="number">${match}</span>`))
  
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

