'use client'

import { useMemo } from 'react'
import styles from './CodeBackground.module.css'

interface CodeBackgroundProps {
  code: string
}

// Простая функция для подсветки синтаксиса TypeScript
function highlightCode(code: string): string {
  const parts: Array<{ start: number; end: number; type: string; content: string }> = []
  
  // 1. Находим комментарии
  code.replace(/(\/\/.*$)/gm, (match, offset) => {
    parts.push({ start: offset, end: offset + match.length, type: 'comment', content: match })
    return match
  })
  code.replace(/(\/\*[\s\S]*?\*\/)/g, (match, offset) => {
    parts.push({ start: offset, end: offset + match.length, type: 'comment', content: match })
    return match
  })
  
  // 2. Находим строки
  code.replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, (match, offset) => {
    parts.push({ start: offset, end: offset + match.length, type: 'string', content: match })
    return match
  })
  
  // 3. Находим ключевые слова (только вне строк и комментариев)
  const keywords = /\b(const|let|var|function|interface|type|export|import|return|if|else|for|while|async|await|class|extends|implements|typeof|keyof|in|of|as|is)\b/g
  let match
  while ((match = keywords.exec(code)) !== null) {
    const isInside = parts.some(p => match!.index >= p.start && match!.index < p.end)
    if (!isInside) {
      parts.push({ start: match.index, end: match.index + match[0].length, type: 'keyword', content: match[0] })
    }
  }
  
  // 4. Находим типы
  const types = /\b([A-Z][a-zA-Z0-9]*)\b(?=\s*[<:;,\[\)])/g
  while ((match = types.exec(code)) !== null) {
    const isInside = parts.some(p => match!.index >= p.start && match!.index < p.end)
    if (!isInside) {
      parts.push({ start: match.index, end: match.index + match[0].length, type: 'type', content: match[0] })
    }
  }
  
  // 5. Находим функции
  const functions = /\b([a-z][a-zA-Z0-9]*)\s*(?=\()/g
  while ((match = functions.exec(code)) !== null) {
    const isInside = parts.some(p => match!.index >= p.start && match!.index < p.end)
    if (!isInside) {
      parts.push({ start: match.index, end: match.index + match[0].trim().length, type: 'function', content: match[0].trim() })
    }
  }
  
  // 6. Находим числа
  const numbers = /\b(\d+\.?\d*)\b/g
  while ((match = numbers.exec(code)) !== null) {
    const isInside = parts.some(p => match!.index >= p.start && match!.index < p.end)
    if (!isInside) {
      parts.push({ start: match.index, end: match.index + match[0].length, type: 'number', content: match[0] })
    }
  }
  
  // Сортируем части по позиции
  parts.sort((a, b) => a.start - b.start)
  
  // Собираем результат
  let result = ''
  let lastIndex = 0
  
  for (const part of parts) {
    // Добавляем текст до этой части (экранированный)
    if (part.start > lastIndex) {
      const text = code.substring(lastIndex, part.start)
      result += text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    }
    
    // Добавляем подсвеченную часть
    const escapedContent = part.content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    result += `<span class="${part.type}">${escapedContent}</span>`
    
    lastIndex = part.end
  }
  
  // Добавляем оставшийся текст
  if (lastIndex < code.length) {
    const text = code.substring(lastIndex)
    result += text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }
  
  return result
}

export default function CodeBackground({ code }: CodeBackgroundProps) {
  const highlightedCode = useMemo(() => highlightCode(code), [code])
  
  return (
    <div className={styles.codeBackground}>
      <pre className={styles.code}>
        <code 
          className="codeBackground" 
          dangerouslySetInnerHTML={{ __html: highlightedCode }} 
        />
      </pre>
    </div>
  )
}

