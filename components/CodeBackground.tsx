import styles from './CodeBackground.module.css'

interface CodeBackgroundProps {
  code: string
}

// Простая функция для подсветки синтаксиса TypeScript
function highlightCode(code: string) {
  let highlighted = code
    // Комментарии (сначала, чтобы не конфликтовали)
    .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
    // Строки
    .replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
    // Ключевые слова
    .replace(/\b(const|let|var|function|interface|type|export|import|return|if|else|for|while|async|await|class|extends|implements|typeof|keyof|in|of|as|is)\b/g, '<span class="keyword">$1</span>')
    // Типы (должны быть после ключевых слов)
    .replace(/\b([A-Z][a-zA-Z0-9]*)\b(?=\s*[<:;,\[\)])/g, '<span class="type">$1</span>')
    // Функции (имена перед скобками)
    .replace(/\b([a-z][a-zA-Z0-9]*)\s*(?=\()/g, '<span class="function">$1</span>')
    // Числа
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
  
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

