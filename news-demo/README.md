# 웹팩의 CSS Loader 기능으로 "컴포넌트이름.module.css" 형태의 외부 CSS 모듈을 적용

# BrowserRouter, useNavigator, useParam 등을 활용

- npm 또는 yarn 으로 아래 세가지 패키지 설치
    - yarn add -D tailwindcss postcss autoprefixer
    - 또는
    - npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

- 프로젝트의 Tailwind CSS 구성
    - yarn tailwindcss init -p
    - 또는
    - npx tailwindcss init -p

- tailwind.config.js 파일을 열고 content 항목에 아래 내용을 기입합니다

```jsx
content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
```

- src/index.css 파일 내용을 모두 지우고 아래 내용으로 기입합니다

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
