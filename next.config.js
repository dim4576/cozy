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
}

module.exports = nextConfig

