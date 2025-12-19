'use client'

import { useEffect, useRef } from 'react'
import styles from './CodeBackground.module.css'

interface CodeBackgroundProps {
  code: string
}

// Простая функция для подсветки синтаксиса TypeScript
function highlightCode(code: string) {
  // Используем уникальные маркеры для защиты уже обработанных частей
  const markers: Array<{ id: string; content: string }> = []
  let markerId = 0
  
  const protect = (content: string): string => {
    const id = `__MARK${markerId++}__`
    markers.push({ id, content })
    return id
  }
  
  let highlighted = code
  
  // 1. Комментарии (сначала, чтобы не конфликтовали) - экранируем только содержимое
  highlighted = highlighted.replace(/(\/\/.*$)/gm, (match) => {
    const escaped = match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return protect(`<span class="comment">${escaped}</span>`)
  })
  highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, (match) => {
    const escaped = match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return protect(`<span class="comment">${escaped}</span>`)
  })
  
  // 2. Строки (до ключевых слов, чтобы не обрабатывать их содержимое) - экранируем только содержимое
  highlighted = highlighted.replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, (match) => {
    const escaped = match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return protect(`<span class="string">${escaped}</span>`)
  })
  
  // 3. Обрабатываем синтаксис ДО экранирования HTML
  // Ключевые слова (только вне строк и комментариев, которые уже защищены)
  highlighted = highlighted.replace(/\b(const|let|var|function|interface|type|export|import|return|if|else|for|while|async|await|class|extends|implements|typeof|keyof|in|of|as|is)\b/g, (match) => {
    return protect(`<span class="keyword">${match}</span>`)
  })
  
  // Типы (должны быть после ключевых слов)
  highlighted = highlighted.replace(/\b([A-Z][a-zA-Z0-9]*)\b(?=\s*[<:;,\[\)])/g, (match) => {
    return protect(`<span class="type">${match}</span>`)
  })
  
  // Функции (имена перед скобками)
  highlighted = highlighted.replace(/\b([a-z][a-zA-Z0-9]*)\s*(?=\()/g, (match) => {
    return protect(`<span class="function">${match.trim()}</span>`)
  })
  
  // Числа
  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, (match) => {
    return protect(`<span class="number">${match}</span>`)
  })
  
  // 4. Экранируем весь оставшийся код, но НЕ маркеры и НЕ содержимое маркеров
  // Заменяем маркеры на временные плейсхолдеры перед экранированием
  const tempPlaceholders: string[] = []
  markers.forEach((marker, index) => {
    const placeholder = `__PLACEHOLDER${index}__`
    tempPlaceholders.push(placeholder)
    highlighted = highlighted.replace(new RegExp(marker.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), placeholder)
  })
  
  // Экранируем незащищенные части (все что не является плейсхолдером)
  highlighted = highlighted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  
  // Восстанавливаем плейсхолдеры обратно на маркеры
  markers.forEach((marker, index) => {
    highlighted = highlighted.replace(new RegExp(`__PLACEHOLDER${index}__`, 'g'), marker.id)
  })
  
  // 5. Восстанавливаем маркеры на их HTML содержимое (в обратном порядке, чтобы избежать конфликтов)
  for (let i = markers.length - 1; i >= 0; i--) {
    const marker = markers[i]
    // Экранируем специальные символы в ID для использования в RegExp
    const escapedId = marker.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    highlighted = highlighted.replace(new RegExp(escapedId, 'g'), marker.content)
  }
  
  return highlighted
}

export default function CodeBackground({ code }: CodeBackgroundProps) {
  const codeRef = useRef<HTMLElement>(null)
  const highlightedCode = highlightCode(code)
  
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlightedCode
    }
  }, [highlightedCode])
  
  return (
    <div className={styles.codeBackground}>
      <pre className={styles.code}>
        <code ref={codeRef} className="codeBackground" />
      </pre>
    </div>
  )
}

