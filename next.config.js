/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Включаем standalone режим для production деплоя
  // Это создаст оптимизированную версию приложения
  output: 'standalone',
  // Отключаем автоматический prefetching для уменьшения ненужных запросов
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  // Отключаем автоматический prefetch для ссылок
  // Это может помочь уменьшить ненужные запросы
  poweredByHeader: false,
}

module.exports = nextConfig

