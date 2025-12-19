# Инструкция по деплою Cozy Space

## 📋 Содержание

1. [Подготовка сервера](#подготовка-сервера)
2. [Установка зависимостей](#установка-зависимостей)
3. [Настройка Next.js](#настройка-nextjs)
4. [Настройка Nginx](#настройка-nginx)
5. [Настройка PM2](#настройка-pm2)
6. [Настройка SSL (HTTPS)](#настройка-ssl-https)
7. [Автоматический деплой](#автоматический-деплой)
8. [Мониторинг и логи](#мониторинг-и-логи)

---

## 🖥️ Подготовка сервера

### Требования к серверу:
- Ubuntu 20.04+ / Debian 11+ / CentOS 8+
- Минимум 1GB RAM (рекомендуется 2GB+)
- Минимум 10GB свободного места
- Root доступ или sudo права

### Обновление системы:
```bash
sudo apt update && sudo apt upgrade -y
```

---

## 📦 Установка зависимостей

### 1. Установка Node.js 20.x

```bash
# Для Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка версии
node --version  # Должно быть v20.x.x
npm --version
```

### 2. Установка Nginx

```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 3. Установка PM2 (менеджер процессов)

```bash
sudo npm install -g pm2
```

### 4. Установка Git (если еще не установлен)

```bash
sudo apt install git -y
```

---

## ⚙️ Настройка Next.js

### 1. Обновление next.config.js для standalone режима

Убедитесь, что в `next.config.js` включен standalone режим:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Важно для production
}

module.exports = nextConfig
```

### 2. Клонирование проекта на сервер

```bash
cd /var/www
sudo git clone <ваш-репозиторий> cozy-space
cd cozy-space
sudo chown -R $USER:$USER /var/www/cozy-space
```

### 3. Установка зависимостей и сборка

```bash
npm install
npm run build

# ВАЖНО: Проверка структуры standalone сборки
# Next.js должен создать:
# - .next/standalone/server.js
# - .next/standalone/.next/static/ (симлинк или директория)

# Проверка наличия статических файлов
ls -la .next/standalone/.next/static/ 2>/dev/null || echo "Статические файлы не найдены в standalone"

# Если статические файлы отсутствуют, скопируйте их:
if [ ! -d ".next/standalone/.next/static" ]; then
  mkdir -p .next/standalone/.next
  cp -r .next/static .next/standalone/.next/static
  echo "Статические файлы скопированы в standalone"
fi
```

### 4. Настройка переменных окружения

```bash
# Скопируйте .env файл на сервер
nano .env
# Заполните все необходимые переменные
```

---

## 🌐 Настройка Nginx

### 1. Копирование конфигурации

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/cozyspace
```

### 2. Редактирование конфигурации

```bash
sudo nano /etc/nginx/sites-available/cozyspace
```

**Важно:** Замените `cozyspace.dev` на ваш домен в файле конфигурации.

### 3. Активация конфигурации

```bash
# Создание симлинка
sudo ln -s /etc/nginx/sites-available/cozyspace /etc/nginx/sites-enabled/

# Удаление дефолтной конфигурации (опционально)
sudo rm /etc/nginx/sites-enabled/default

# Проверка конфигурации
sudo nginx -t

# Перезапуск Nginx
sudo systemctl restart nginx
```

### 4. Настройка файрвола

```bash
# Разрешение HTTP и HTTPS
sudo ufw allow 'Nginx Full'
# или
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## 🔄 Настройка PM2

### 1. Запуск приложения через PM2

```bash
cd /var/www/cozy-space
pm2 start deploy/ecosystem.config.js
```

### 2. Сохранение конфигурации PM2

```bash
pm2 save
```

### 3. Настройка автозапуска при перезагрузке сервера

```bash
pm2 startup
# Выполните команду, которую выведет PM2 (обычно с sudo)
```

### 4. Полезные команды PM2

```bash
# Статус приложения
pm2 status

# Логи
pm2 logs cozy-space

# Перезапуск
pm2 restart cozy-space

# Остановка
pm2 stop cozy-space

# Удаление из PM2
pm2 delete cozy-space

# Мониторинг
pm2 monit
```

---

## 🔒 Настройка SSL (HTTPS)

### 1. Установка Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Получение SSL сертификата

```bash
sudo certbot --nginx -d cozyspace.dev -d www.cozyspace.dev
```

Certbot автоматически:
- Получит сертификат
- Настроит Nginx для HTTPS
- Настроит автоматическое обновление

### 3. Раскомментирование HTTPS блока в nginx.conf

После получения сертификата отредактируйте `/etc/nginx/sites-available/cozyspace`:
- Раскомментируйте блок `server` для HTTPS (порт 443)
- Закомментируйте или удалите блок для HTTP (порт 80), оставив только редирект

### 4. Проверка и перезапуск

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Автоматическое обновление сертификата

Certbot автоматически настроит cron для обновления. Проверить можно:

```bash
sudo certbot renew --dry-run
```

---

## 🚀 Автоматический деплой

### Вариант 1: Использование скрипта deploy.sh

```bash
# Сделать скрипт исполняемым
chmod +x deploy/deploy.sh

# Запуск деплоя
./deploy/deploy.sh
```

### Вариант 2: Ручной деплой

```bash
# 1. Обновление кода
git pull origin main

# 2. Установка зависимостей
npm ci

# 3. Сборка
npm run build

# 4. Перезапуск через PM2
pm2 restart cozy-space
```

### Вариант 3: GitHub Actions / GitLab CI

Создайте файл `.github/workflows/deploy.yml` для автоматического деплоя при push в main ветку.

---

## 📊 Мониторинг и логи

### PM2 логи

```bash
# Все логи
pm2 logs

# Только ошибки
pm2 logs --err

# Последние 100 строк
pm2 logs --lines 100

# Очистка логов
pm2 flush
```

### Nginx логи

```bash
# Доступы
sudo tail -f /var/log/nginx/access.log

# Ошибки
sudo tail -f /var/log/nginx/error.log
```

### Мониторинг ресурсов

```bash
# PM2 мониторинг
pm2 monit

# Системные ресурсы
htop
# или
top
```

---

## 🔧 Решение проблем

### Приложение не запускается

1. Проверьте логи: `pm2 logs cozy-space`
2. Проверьте порт: `netstat -tulpn | grep 3000`
3. Проверьте переменные окружения: `pm2 env cozy-space`

### Nginx не проксирует запросы

1. Проверьте конфигурацию: `sudo nginx -t`
2. Проверьте, что приложение запущено: `pm2 status`
3. Проверьте логи Nginx: `sudo tail -f /var/log/nginx/error.log`

### Проблемы с SSL

1. Проверьте сертификат: `sudo certbot certificates`
2. Проверьте DNS записи для домена
3. Убедитесь, что порты 80 и 443 открыты

---

## 📝 Чеклист деплоя

- [ ] Node.js установлен и работает
- [ ] Nginx установлен и запущен
- [ ] PM2 установлен
- [ ] Проект склонирован на сервер
- [ ] Зависимости установлены (`npm install`)
- [ ] Проект собран (`npm run build`)
- [ ] `.env` файл настроен
- [ ] Nginx конфигурация скопирована и активирована
- [ ] Приложение запущено через PM2
- [ ] PM2 настроен на автозапуск
- [ ] Файрвол настроен
- [ ] DNS записи настроены
- [ ] SSL сертификат получен (для HTTPS)
- [ ] Тестирование сайта

---

## 🎯 Оптимизация производительности

### 1. Включение gzip в Nginx

Добавьте в `nginx.conf`:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
```

### 2. Кэширование статики

Nginx уже настроен на кэширование `/_next/static`. Можно добавить кэширование для других статических файлов.

### 3. Мониторинг производительности

Используйте PM2 Plus или другие инструменты мониторинга для отслеживания производительности.

---

## 📞 Поддержка

При возникновении проблем проверьте:
1. Логи PM2: `pm2 logs`
2. Логи Nginx: `/var/log/nginx/error.log`
3. Статус сервисов: `systemctl status nginx`, `pm2 status`

