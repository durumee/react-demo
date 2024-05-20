Github 등에 올라가면 API Key 를 외부에 유출하기 때문에 아래처럼 관리하는 것을 알아두자

- ./src/secret.js 파일 생성하고 내용 입력, YOUR_API_KEY 를 소유한 키로 변경

```jsx
const API_KEY = "YOUR_API_KEY";
export { API_KEY };
```

- 프로젝트 루트의 .gitignore 파일에 내용 추가하여 깃허브 등에 업로드 방지

```jsx
src/secret.js
```

- 키를 사용할 컴포넌트에서 import

```jsx
import { API_KEY } from "./secret.js";
```

- 내부에서 값을 사용

```jsx
... 생략
const data = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&units=metric&appid=${API_KEY}`
        );
... 생략
```
