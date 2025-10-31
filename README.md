# NestJS Real Estate API

Этот проект представляет собой REST API на базе NestJS для управления недвижимостью (real estate). Он позволяет пользователям регистрироваться, аутентифицироваться, создавать и управлять объявлениями о недвижимости, а также взаимодействовать с ними (лайки).

## Функциональность

- **Аутентификация и авторизация**:

  - Локальный логин/пароль
  - Google OAuth 2.0
  - JWT-токены (access и refresh)
  - Ролевая система (USER, ADMIN, EDITOR)

- **Управление пользователями**:

  - Регистрация
  - Получение профиля
  - Обновление данных
  - Удаление (только для админов/редакторов)

- **Управление недвижимостью**:

  - Создание, просмотр, обновление и удаление объявлений
  - Пагинация списков
  - Система лайков
  - Связанные сущности: характеристики, типы недвижимости

- **База данных**: PostgreSQL с TypeORM
- **Валидация**: class-validator и Zod
- **Seeding**: Генерация тестовых данных

## Установка и запуск

1. **Установите зависимости**:

   ```bash
   npm install
   ```

2. **Настройте переменные окружения**:
   Создайте файл `.env` на основе `.env.example` (если есть) или используйте существующий. Убедитесь, что указаны:

   - `url` — URL базы данных PostgreSQL
   - `JWT_SECRET` и `REFRESH_JWT_SECRET` — секреты для JWT
   - `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET`, `GOOGLE_CALLBACK_URL` — для Google OAuth

3. **Запустите сервер**:

   - Режим разработки: `npm run start:dev`
   - Продакшн: `npm run start:prod`
   - С отладкой: `npm run start:debug`

4. **Заполните базу данных тестовыми данными** (опционально):
   ```bash
   npm run seed
   ```

Сервер будет доступен на `http://localhost:3000` (или порту из переменной `PORT`).

## API Endpoints

### Аутентификация

- `POST /auth/login` — Локальный логин (body: `{email, password}`)
- `GET /auth/google/login` — Инициировать Google OAuth
- `GET /auth/google/callback` — Callback для Google OAuth
- `POST /auth/refresh` — Обновить токен (body: `{refreshToken}`)
- `POST /auth/signout` — Выход

### Пользователи

- `POST /user` — Регистрация (body: `{email, password, ...}`)
- `GET /user/profile` — Получить профиль (требует JWT)
- `PATCH /user/:id` — Обновить пользователя
- `DELETE /user/:id` — Удалить пользователя (требует роли ADMIN/EDITOR)

### Недвижимость

- `GET /property` — Список объявлений (query: `page`, `limit`)
- `GET /property/:id` — Детальная информация об объявлении
- `POST /property` — Создать объявление (требует JWT, body: `{name, description, price, ...}`)
- `PATCH /property/:id` — Обновить объявление
- `DELETE /property/:id` — Удалить объявление

Все защищенные роуты требуют заголовка `Authorization: Bearer <access_token>`.

## Структура проекта

```
src/
├── app.module.ts          # Главный модуль
├── app.controller.ts      # Основной контроллер
├── app.service.ts         # Основной сервис
├── auth/                  # Модуль аутентификации
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── guards/            # Guards для защиты роутов
│   ├── strategies/        # Стратегии Passport
│   └── ...
├── user/                  # Модуль пользователей
├── property/              # Модуль недвижимости
├── entities/              # Сущности базы данных
├── config/                # Конфигурации
├── seeding/               # Скрипты для заполнения БД
└── utils/                 # Утилиты
```
