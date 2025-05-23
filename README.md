# WooJoung's Blog

개인 블로그 프로젝트입니다.
공부한 내용과 일상 이야기를 담을 예정 입니다.

## 🌐 배포 주소

- Frontend: [https://wjblog.vercel.app](https://wjblog.vercel.app)
- Backend: [https://server-kzap5kg0u-woojoung1217s-projects.vercel.app](https://server-kzap5kg0u-woojoung1217s-projects.vercel.app)

## 🚀 기술 스택

### Frontend

- React + TypeScript
- Material-UI (MUI)
- Vite
- React Router DOM

### Backend

- Express.js
- TypeScript
- JSON 파일 기반 데이터 저장

### Deployment

- Vercel (Frontend + Backend)

## ✨ 주요 기능

### 1. 게시글 관리

- 글 작성, 수정, 삭제, 조회
- 카테고리별 필터링 (개발/일상)
- 이미지 업로드 기능

### 2. UI/UX

- 반응형 디자인
- 벨로그 스타일 카드 레이아웃
- 다크 모드 (추후 구현 예정)

### 3. 검색 기능

- 제목/내용 기반 검색 (추후 구현 예정)
- 태그 기반 검색 (추후 구현 예정)

## 📁 프로젝트 구조

```
wjblog/
├── src/             # React 프론트엔드
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── styles/
└── server/          # Express 백엔드
    ├── src/
    │   ├── data/
    │   ├── uploads/
    │   └── index.ts
    └── package.json
```

## 🛠️ 설치 및 실행

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

## 🔜 향후 계획

### 1. 사용자 인증

- JWT 기반 로그인
- GitHub OAuth 연동

### 2. 파일 업로드

- AWS S3 연동
- 이미지 최적화

### 3. SEO 최적화

- 메타 태그 설정
- 사이트맵 생성
- robots.txt 설정

### 4. 추가 기능

- 댓글 시스템
- 다크 모드
- 검색 기능
- 태그 시스템

## 📝 라이선스

MIT License

## 📮 연락처

- GitHub: [woojoung1217](https://github.com/woojoung1217)
- Email: ywj981217@naver.com
