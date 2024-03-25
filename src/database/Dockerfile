FROM postgres:latest

#ENV POSTGRES_PASSWORD=mysecretpassword

# Создаем директорию для монтирования данных PostgreSQL
RUN mkdir -p /var/lib/postgresql/data

# Устанавливаем права доступа для директории данных
RUN chown -R postgres:postgres /var/lib/postgresql/data

# Указываем рабочую директорию
WORKDIR /var/lib/postgresql/data

EXPOSE 5432

CMD ["postgres"]