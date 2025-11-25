# Подземелье тикетов


![Скрин главного экрана](https://github.com/Uncurlynt/project-management-system/blob/main/images/homepage.gif)

Система управления проектами

## Оглавление

1. [Структура проекта](#структура-проекта)
2. [Инструкция запуска frontend части](#установка-и-запуск-frontend-части)
3. [Запуск проекта](#запуск-проекта)


## Структура проекта

```
frontend/src/
│
├── api/  
├── components/            
├── hooks/                 
├── layouts/               
├── lib/                   
├── pages/                 
├── routes/                
├── stores/                
├── tests/                 
├── types/                 
│
├── index.css              
├── main.tsx               
└── vite-env.d.ts          

server/                 
docker-compose.yml      
```


## Инструкция запуска frontend части

1. **Клонировать репозиторий себе**
   ```bash
   git clone git@github.com:Uncurlynt/project-management-system.git
   cd project-management-system/frontend
   ```

2. **Установить зависимости**
   ```bash
   pnpm install
   ```

3. **Запустить в режиме разработки**
   ```bash
   pnpm dev
   ```

## Запуск проекта
Для настройки API в фронтенд-приложении, нужно создать файл `.env` в папке frontend и добавить следующую строку:

```
VITE_API=http://localhost:8080/api/v1
```

Проект можно развернуть в двух режимах с помощью Docker:

### Production
```bash
docker-compose -f docker-compose.prod.yml up --build
```
На `localhost:3000`

или

### Development
```bash
docker-compose -f docker-compose.dev.yml up --build
```
На `localhost:5173`
