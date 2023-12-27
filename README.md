# Rolling - 롤링페이퍼
<img width="1920" alt="cover" src="https://github.com/1Cheol-and-4-team/Rolling/assets/77719310/3ab8e1b7-407e-4d98-9cb2-1be94a51a8e3">

## 🔗 배포링크
https://rolling-3df.pages.dev/

## 👩‍💻팀 소개🧑‍💻
<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="100px" alt="ha" src="https://github.com/1Cheol-and-4-team/Rolling/assets/77719310/20305fcc-f310-4775-93fe-0cd6c5814c94">
        <br /><sub><b>FE 팀장 : </b>김하은<br />
      </td>
      <td align="center">
        <img width="100px" alt="hee" src="https://github.com/1Cheol-and-4-team/Rolling/assets/77719310/b6f6f9d5-a852-4dc1-9601-15705b84bbe2">
        <br /><sub><b>FE 팀원 : </b>김희수<br />
      </td>
      <td align="center">
        <img width="100px" alt="jin" src="https://github.com/1Cheol-and-4-team/Rolling/assets/77719310/75380fed-d1ec-4b5f-9e28-478b464d65ec">
        <br /><sub><b>FE 팀원 : </b>노진욱<br />
      </td>
      <td align="center">
        <img width="100px" alt="so" src="https://github.com/1Cheol-and-4-team/Rolling/assets/77719310/5e236ba8-6220-4617-af94-226d096a0a1a">
        <br /><sub><b>FE 팀원 : </b>전소은<br />
      </td>
  </tbody>
</table>

## 📑 프로젝트 설명
추억의 롤링 페이퍼를 웹 상에서도 즐길 수 있는 플랫폼 구현

## ✨ 주요 기능 구현
1️⃣ 롤링 페이퍼
- 대상 생성
- 대상 목록 조회
- 대상 조회 및 검색
- 대상 삭제
  
2️⃣ 메세지
- 메세지 생성
- 메세지 목록 조회
- 메세지 삭제

3️⃣ 리액션
- 리액션 추가
- 리액션 조회

## 🛠️ Tools
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/REACT QUILL-0088CC?style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

## 🖥️ 프로젝트 실행 방법
```bash
git clone https://github.com/1Cheol-and-4-team/Rolling.git

cd Rolling

npm i

npm run dev
```

## 📁 디렉토리 구조
```
Rolling
├── src
│   ├── api                * axios, api 저장소
│   ├── assets             * 이미지, 아이콘 폰트 모음
│   ├── components         * 재사용성 높은 컴포넌트 모음
│   │   ├── common         * 공통 컴포넌트 모음
│   │   └── QuillToolbar   * react-quill 컴포넌트
│   ├── hooks              * hook 모음
│   ├── pages              * 페이지별 컴포넌트
│   ├── stores             * prop type 모음
│   ├── styles             * SCSS 전역 파일
│   └── utils              * 재사용되는 유틸 함수 모음
├── App.js
├── main.js
└── MyRouter.js
```

## 커밋 규칙
#### ✨ feat: 새로운 기능 추가
#### 🔨 fix: 기능에 대한 수정 및 추가
#### ♻️ refactor: 코드 리팩토링 
#### 💄 style: UI 스타일 파일 추가 및 수정
#### 📝 docs: 문서 추가 및 수정
#### 👏 chore: 패키지 매니저 수정

## 코딩 컨벤션
- 클래스명은 부모 셀렉터를 참조하는 SCSS nesting 문법을 사용한다.
- DOM에서 유일한 식별자로 id를 사용하지 않고, 대신 ref를 활용하여 DOM을 조작하는 것을 권장한다.
- 상수는 영문 대문자 스네이크 케이스를 사용한다.
- 불리언 함수는 `is-`로 시작한다.
- 사용자 정의 함수는 `handle-`로 시작한다.
- props로 받은 함수는 `on-`으로 시작한다.
- rem 단위로 작성한다.
- 익명함수는 지양한다.
