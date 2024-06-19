# 베이스 이미지로 Node.js를 사용
FROM node:20-alpine3.19 AS build

# 작업 디렉토리 설정
WORKDIR /app

# yarn 버전을 4.3.0으로 업그레이드
RUN corepack enable

# package.json과 yarn.lock 파일을 복사
COPY package.json yarn.lock ./

# yarn을 사용하여 의존성 설치
RUN yarn install

# 소스 파일을 복사
COPY . .

# Vite를 사용하여 빌드
RUN yarn build

# 실제 실행 환경을 위한 이미지를 설정
FROM nginx:alpine

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# 빌드된 파일을 Nginx의 웹 루트로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx를 포그라운드 모드로 실행
CMD ["nginx", "-g", "daemon off;"]
