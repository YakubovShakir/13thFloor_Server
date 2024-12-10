
# Указываем базовый образ
FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/backend

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Команда для запуска приложения
CMD ["npm", "start"]
