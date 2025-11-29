# BSUIRBet Backend

Backend сервер для приложения BSUIRBet, написанный на TypeScript и Express.

## Установка

```bash
npm install
```

## Запуск

### С использованием Docker Compose (рекомендуется)

1. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

2. Запустите PostgreSQL и Backend:

**Для разработки (с hot reload, по умолчанию):**
```bash
docker-compose up -d
```

**Для production:**
```bash
DOCKERFILE=Dockerfile BACKEND_COMMAND="npm start" docker-compose up -d
```

3. Остановите сервисы:
```bash
docker-compose down
```

4. Остановите и удалите volumes (включая данные БД):
```bash
docker-compose down -v
```

PostgreSQL будет доступен на `localhost:5432`, Backend на `http://localhost:3001`, а pgAdmin на `http://localhost:5050`.

**Инициализация базы данных:**

После первого запуска контейнеров, выполните инициализацию базы данных:
```bash
docker-compose exec backend npm run init-db
```

Это создаст необходимые таблицы и заполнит их начальными данными (провайдеры, игры, турниры, бонусы, демо-пользователи).

**pgAdmin доступ:**
- Email: `admin@bsuirbet.com` (по умолчанию, настраивается через `PGADMIN_EMAIL`)
- Password: `admin123` (по умолчанию, настраивается через `PGADMIN_PASSWORD`)

После входа в pgAdmin, добавьте новый сервер PostgreSQL:
- Host: `postgres` (имя сервиса в docker-compose)
- Port: `5432`
- Database: `bsuirbet` (или значение из `POSTGRES_DB`)
- Username: `bsuirbet` (или значение из `POSTGRES_USER`)
- Password: `bsuirbet123` (или значение из `POSTGRES_PASSWORD`)

### Локальный запуск (без Docker)

#### Режим разработки

```bash
npm install
npm run dev
```

Сервер запустится на `http://localhost:3001` с автоматической перезагрузкой при изменении файлов.

#### Сборка

```bash
npm run build
```

#### Запуск в production режиме

```bash
npm start
```

## API Endpoints

### Games
- `GET /api/games` - Получить все игры (с фильтрацией по категориям через query параметр `category`)
- `GET /api/games/:id` - Получить игру по ID

### Tournaments
- `GET /api/tournaments` - Получить все турниры
- `GET /api/tournaments/:id` - Получить турнир по ID
- `POST /api/tournaments/:id/participate` - Участвовать в турнире

### Bonuses
- `GET /api/bonuses` - Получить все бонусы
- `GET /api/bonuses/:id` - Получить бонус по ID
- `POST /api/bonuses/:id/claim` - Получить бонус

### Providers
- `GET /api/providers` - Получить всех провайдеров
- `GET /api/providers/:id` - Получить провайдера по ID

### Jackpots
- `GET /api/jackpots` - Получить все джекпоты

### Authentication
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/signup` - Регистрация
- `POST /api/auth/logout` - Выход из системы
- `GET /api/auth/me` - Получить текущего пользователя (требует Bearer token)

### Translations
- `GET /api/translations` - Получить список доступных языков
- `GET /api/translations/:language` - Получить переводы для языка (ru/en)

### Categories
- `GET /api/categories` - Получить все категории игр

## Демо аккаунты

- Email: `admin@bsuirbet.com`, Password: `admin123`
- Email: `player@bsuirbet.com`, Password: `player123`
- Email: `demo@bsuirbet.com`, Password: `demo123`
- Email: `test@bsuirbet.com`, Password: `test123`

## Технологии

- Express.js
- TypeScript
- CORS

