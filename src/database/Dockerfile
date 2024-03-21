# Используем официальный образ PostgreSQL
FROM postgres:latest

# Устанавливаем переменную окружения для пароля пользователя postgres
ENV POSTGRES_PASSWORD=mysecretpassword

# Создаем директорию для монтирования данных PostgreSQL
RUN mkdir -p /var/lib/postgresql/data

# Устанавливаем права доступа для директории данных
RUN chown -R postgres:postgres /var/lib/postgresql/data

# Указываем рабочую директорию
WORKDIR /var/lib/postgresql/data

# Открываем порт для подключения к базе данных
EXPOSE 5432

# Запускаем PostgreSQL
CMD ["postgres"]