// PM2 конфигурация для управления Node.js процессом
// Использование: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'cozy-space',
      script: './.next/standalone/server.js',
      instances: 1, // Для начала используйте 1, можно увеличить для кластера
      exec_mode: 'fork', // или 'cluster' для нескольких процессов
      cwd: '/root/www/cozy', // Абсолютный путь к директории проекта
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Автоматический перезапуск при сбоях
      autorestart: true,
      // Максимальное количество перезапусков
      max_restarts: 10,
      // Интервал между перезапусками (мс)
      min_uptime: '10s',
      // Максимальная память перед перезапуском (1GB)
      max_memory_restart: '1G',
      // Логирование
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Слияние логов из всех инстансов
      merge_logs: true,
      // Время для graceful shutdown (мс)
      kill_timeout: 5000,
      // Ожидание перед отправкой SIGKILL
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
}

