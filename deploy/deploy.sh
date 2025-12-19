#!/bin/bash

# Скрипт для деплоя Next.js приложения
# Использование: ./deploy.sh

set -e  # Остановка при ошибке

echo "🚀 Начало деплоя Cozy Space..."

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка наличия необходимых команд
command -v node >/dev/null 2>&1 || { echo -e "${RED}❌ Node.js не установлен${NC}" >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo -e "${RED}❌ npm не установлен${NC}" >&2; exit 1; }
command -v pm2 >/dev/null 2>&1 || { echo -e "${YELLOW}⚠️  PM2 не установлен. Установите: npm install -g pm2${NC}" >&2; }

# Переход в директорию проекта
cd "$(dirname "$0")/.."

echo -e "${GREEN}📦 Установка зависимостей...${NC}"
npm ci --production=false

echo -e "${GREEN}🔨 Сборка проекта...${NC}"
npm run build

echo -e "${GREEN}📁 Создание директории для логов...${NC}"
mkdir -p logs

echo -e "${GREEN}🔄 Перезапуск приложения через PM2...${NC}"
if pm2 list | grep -q "cozy-space"; then
    pm2 restart cozy-space
    echo -e "${GREEN}✅ Приложение перезапущено${NC}"
else
    pm2 start ecosystem.config.js
    pm2 save
    echo -e "${GREEN}✅ Приложение запущено${NC}"
fi

echo -e "${GREEN}📊 Статус приложения:${NC}"
pm2 status

echo -e "${GREEN}✨ Деплой завершен успешно!${NC}"

