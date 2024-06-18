> newsapi 의 경우 proxy 미지원 서버에 배포하는 경우 HTTP 426 코드를 리턴하고 동작하지 않습니다.
> 이는 무료 API의 경우 localhost 의 cors만 허용하기 때문입니다.

# 로컬에서 API 테스트를 위해서 참고할 부분

- yarn add dotenv 필요 (package.json 파일 내에 dependencies: dotenv 존재해야함)

- src/components/NewsPage.jsx 파일 상단의 VITE_로 시작하는 import.meta.env.키_이름;

- vite.config.js 내의 server.proxy 설정

# Vercel 서비스 기준으로 API 테스트를 위해서 참고할 부분

- yarn add http-proxy-middleware (package.json 파일 내에 dependencies: http-proxy-middleware 존재해야함)

- api/proxy.js 소스: 리액트 앱 내의 /api 요청을 Vercel 서버리스 함수 서비스를 통해 프록시 서버를 구현함

- vercel.json 파일: /api 주소에 대한 요청을 api/proxy.js 로 거치도록 설정해주는 파일

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
