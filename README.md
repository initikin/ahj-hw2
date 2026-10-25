# AHJ № 2 — DOM: перемещение элемента

[![Build and deploy](https://github.com/initikin/ahj-hw2/actions/workflows/deploy.yml/badge.svg)](https://github.com/initikin/ahj-hw2/actions/workflows/deploy.yml)

**[Открыть на GitHub Pages](https://initikin.github.io/ahj-hw2/)**

Выполнена обязательная задача «Перемещение элемента» из [домашнего задания](https://github.com/netology-code/ahj-homeworks/tree/AHJ-50/dom). Задачи со звёздочкой не включены.

## Как работает

- JavaScript создаёт поле 4×4 и один элемент `img` с гоблином.
- При загрузке гоблин появляется в случайной ячейке.
- `setInterval` раз в секунду переносит его в одну из 15 других ячеек с равной вероятностью.
- `append` меняет родителя существующего `img`: изображение не пересоздаётся, `removeChild` не используется.
- Изображение гоблина взято из [материалов задания](https://github.com/netology-code/ahj-homeworks/blob/AHJ-50/dom/pic/goblin.png).

## Локальный запуск

Нужны Node.js 22.14+ и npm.

```sh
npm ci
npm start
```

Сайт доступен по адресу <http://localhost:8080>.

```sh
npm run lint     # ESLint
npm test         # Jest: поле, случайная позиция, перенос одного img, таймер
npm run coverage # Покрытие тестами
npm run build    # Production-сборка в dist/
```

## Сборка и публикация

Webpack обрабатывает JavaScript через Babel, собирает CSS в отдельный файл и включает PNG в сборку. Webpack Dev Server используется для разработки, Jest с jsdom — для проверки работы DOM.

GitHub Actions при push в `main` устанавливает зависимости через `npm ci`, запускает ESLint и Jest, собирает проект и публикует `dist/` на GitHub Pages. Для pull request выполняются проверки и сборка. Источник публикации в настройках репозитория: **Settings → Pages → Build and deployment → GitHub Actions**.
