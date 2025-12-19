# 🚀 Деплой Cozy Space

Этот каталог содержит все необходимые файлы и инструкции для деплоя Next.js приложения на production сервер.

## 📁 Структура файлов

```
deploy/
├── nginx.conf              # Конфигурация Nginx reverse proxy
├── ecosystem.config.js     # PM2 конфигурация для управления процессом
├── deploy.sh               # Скрипт автоматического деплоя
├── Dockerfile              # Docker образ для контейнеризации
├── docker-compose.yml      # Docker Compose конфигурация
├── systemd.service         # Systemd service файл (альтернатива PM2)
├── DEPLOY.md              # Подробная инструкция по деплою
└── README.md              # Этот файл
```

## 🏗️ Архитектура деплоя

### Вариант 1: Nginx + Node.js + PM2 (Рекомендуется)

```
Интернет → Nginx (80/443) → Node.js (3000) → Next.js приложение
                              ↑
                           PM2 управляет процессом
```

**Преимущества:**
- ✅ Nginx отдает статику напрямую (быстро)
- ✅ SSL/TLS терминация на Nginx
- ✅ Легкое масштабирование
- ✅ PM2 автоматически перезапускает при сбоях

### Вариант 2: Docker Compose

```
Интернет → Nginx контейнер → App контейнер (Node.js)
```

**Преимущества:**
- ✅ Изоляция окружения
- ✅ Легкое развертывание
- ✅ Консистентность между окружениями

## 🎯 Быстрый старт

### 1. Подготовка (один раз)

```bash
# На сервере
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs nginx git
sudo npm install -g pm2
```

### 2. Деплой приложения

```bash
# Клонирование проекта
cd /var/www
git clone <ваш-репозиторий> cozy-space
cd cozy-space

# Установка и сборка
npm install
npm run build

# Настройка .env
nano .env
```

### 3. Настройка Nginx

```bash
# Копирование конфигурации
sudo cp deploy/nginx.conf /etc/nginx/sites-available/cozyspace

# Редактирование (замените домен!)
sudo nano /etc/nginx/sites-available/cozyspace

# Активация
sudo ln -s /etc/nginx/sites-available/cozyspace /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Запуск приложения

```bash
# Через PM2
pm2 start deploy/ecosystem.config.js
pm2 save
pm2 startup

# Или через systemd
sudo cp deploy/systemd.service /etc/systemd/system/cozy-space.service
sudo systemctl daemon-reload
sudo systemctl enable cozy-space
sudo systemctl start cozy-space
```

### 5. Настройка SSL (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d cozyspace.dev -d www.cozyspace.dev
```

## 📝 Важные замечания

1. **Standalone режим**: В `next.config.js` включен `output: 'standalone'` - это создает оптимизированную версию для production
2. **Порт**: Приложение работает на порту 3000, Nginx проксирует на него
3. **Переменные окружения**: Убедитесь, что `.env` файл содержит все необходимые переменные
4. **Домен**: Замените `cozyspace.dev` на ваш реальный домен в `nginx.conf`

## 🔄 Обновление приложения

### Автоматический (через скрипт):

```bash
./deploy/deploy.sh
```

### Ручной:

```bash
git pull
npm ci
npm run build
pm2 restart cozy-space
```

## 📊 Мониторинг

```bash
# Статус приложения
pm2 status
pm2 monit

# Логи
pm2 logs cozy-space

# Nginx логи
sudo tail -f /var/log/nginx/error.log
```

## 🐳 Docker деплой (опционально)

```bash
# Сборка и запуск
docker-compose -f deploy/docker-compose.yml up -d

# Логи
docker-compose -f deploy/docker-compose.yml logs -f

# Остановка
docker-compose -f deploy/docker-compose.yml down
```

## 📚 Подробная документация

См. [DEPLOY.md](./DEPLOY.md) для детальных инструкций.

