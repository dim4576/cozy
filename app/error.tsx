'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Игнорируем ошибки Server Actions, которые не критичны
  if (error.message?.includes('Failed to find Server Action')) {
    return null
  }

  return (
    <div>
      <h2>Что-то пошло не так!</h2>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  )
}

