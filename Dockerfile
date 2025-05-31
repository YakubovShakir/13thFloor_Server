
# Указываем базовый образ
FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/backend

# Копируем package.json и package-lock.json
COPY package*.json ./

RUN apt-get update && apt-get install -y python3

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Команда для запуска приложения
CMD ["npm", "start"]
