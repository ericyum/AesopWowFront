# 프로젝트 주제

**취업 준비생들을 위한 멘토링 및 정보 공유 커뮤니티 플랫폼**

### 목적

취업 준비 과정에서 막막함을 느끼는 취준생들에게 실질적인 도움을 제공하기 위해,
**최신 정보와 노하우를 공유**하고 **전문가 멘토링 및 네트워킹을 지원**하는 커뮤니티를 구축하여 효율적이고 체계적인 취업 준비를 돕고자 합니다.

- **정보 공유**: 취업 관련 최신 정보와 노하우를 공유
- **멘토링 지원**: 실제 취업자 및 전문가와의 1:1 멘토링을 통해 조언과 피드백을 받을 수 있는 기회를 제공
- **커뮤니티 활성화**: 취준생들 간의 네트워킹과 상호작용을 통해 서로 동기부여와 지원이 가능한 커뮤니티를 구축

이를 통해 `취업 준비 과정에서의 불확실성`을 줄이고 `체계적이고 효율적인 취업 준비를 돕는 것`을 목표로 합니다.

### 차별점

기존 취준 커뮤니티와 멘토링 시스템을 결합하여 모든 유저가 멘토와 멘티로 상호작용이 가능하고 1:1 매칭 시스템을 제공하여 개인정보를 보호하면서 멘토링을 받을 수 있습니다.

1. **다분야 상호 멘토링 시스템**
- 기존의 일방적인 멘토-멘티 관계를 넘어, **한 사용자가 특정 분야에서는 멘토로 활동하고, 다른 분야에서는 멘티로 도움을 받을 수 있는 구조**를 제공
- 이는 업종 변경이나 새로운 분야에 도전하려는 사용자들에게 유용하며, 다양한 산업과 직무에 걸쳐 **지식과 경험의 교환**이 이루어질 수 있는 플랫폼 환경을 조성
- 예를 들어, IT 업계에서 경력을 쌓은 사용자가 금융 업계로 전환을 준비할 때, IT 관련 지식을 공유하며 멘토로 활동하고 동시에 금융 전문가에게 조언을 받는 멘티가 될 수 있습니다.

이러한 **다분야 상호 멘토링 시스템**은 사용자들이 자신의 전문성을 확장하고 새로운 커리어 기회를 모색하도록 돕는 데 중점을 둡니다.
    
이 기능은 단순히 취업 준비를 지원하는 것을 넘어 **커리어 전환과 평생 학습을 지원하는 플랫폼**으로 자리매김할 수 있는 중요한 차별화 요소가 될 것입니다.

---
---
![image](https://github.com/user-attachments/assets/658b3f48-b471-41fa-a6d8-be120e57a42b)

# 팀원
|이름| [유재우 ](https://github.com/blooper20)|  [오영광](https://github.com/OhGlory)| [이성훈](https://github.com/YeAn475)|[염정운](https://github.com/ericyum)| [김범석](https://github.com/g00dbyul) |
|---|  -- | --- | --- | --- | --- |
|![image](https://github.com/user-attachments/assets/b9ecc18b-a9be-41a4-aaec-248c5f6e4d06)| <img src="https://github.com/user-attachments/assets/b74aed62-6bfd-467f-808a-d46241f26014" width="150" height="170"/>| <img src="https://github.com/user-attachments/assets/b74aed62-6bfd-467f-808a-d46241f26014" width="150" height="170"/> | <img src="https://github.com/user-attachments/assets/b74aed62-6bfd-467f-808a-d46241f26014" width="150" height="170"/> | <img src="https://github.com/user-attachments/assets/b74aed62-6bfd-467f-808a-d46241f26014" width="150" height="170"/> | <img src="https://github.com/user-attachments/assets/b74aed62-6bfd-467f-808a-d46241f26014" width="150" height="170"/> |
| 역할 | 팀장 | 팀원 | 팀원 | 팀원 |  팀원 |
Back-end|공지 게시판/멘토링 게시글 기능|로그인 / 로그아웃 기능|프로필 관리 기능|자유 게시판/멘토링 댓글 기능| 회원가입 기능, 리팩토링 및 기능 개선|

---

# 화면 설계서
<img width="6813" alt="허겁직업-화면설계서 (1)" src="https://github.com/user-attachments/assets/e35f6897-8c9a-4cea-bb73-176bedc39a3c" />

---

## 요구사항 명세서
![허거덩스_요구사항명세서 - Google Sheets_page-0001](https://github.com/user-attachments/assets/8fe02292-5ab3-4e31-bb1b-3db5c609c7fd)

___

### 프론트 기술 스택

- Vue.js
- Vuetify
- TypeScript
- MVVM
- Clean Architecture
- Axios
- ComposeAPI
### 디렉터리 구조(클린 아키텍쳐)
```jsx
src/
├── application/               # 애플리케이션 레이어
│   ├── config/                # 설정 파일 (환경 변수, 전역 설정 등)
│   └── usecases/              # 시스템의 모든 사용 사례를 캡슐화 및 구현
│       └── exampleUsecase.js  # 예시: 특정 비즈니스 로직 구현
│
├── data/                      # 외부 API와의 통신 담당
│   ├── services/              # 외부 API와 통신하는 서비스 로직
│   │   └── apiService.js      # 예시: API 호출 로직
│   └── network/               # 네트워크 관련 설정 (Axios, Fetch 등)
│       └── apiClient.js       # 예시: Axios 클라이언트 설정
│
├── domain/                    # 데이터와 상태 관리 로직 포함
│   └── models/                # 애플리케이션의 도메인 모델 정의
│       └── userModel.js       # 예시: 사용자 데이터 모델
│
├── presentation/              # UI 및 화면 표시 레이어
│   ├── pages/                 # 페이지 단위 컴포넌트
│   │   ├── HomePage.jsx       # 예시: 홈 페이지 컴포넌트
│   │   ├── LoginPage.jsx      # 예시: 로그인 페이지 컴포넌트
│   │   └── components/        # 재사용 가능한 UI 컴포넌트 모음
│   │       ├── Button.jsx     # 버튼 컴포넌트
│   │       └── Header.jsx     # 헤더 컴포넌트
│   └── App.jsx                # 애플리케이션 진입점
│
├── resources/                 # 리소스 파일 (이미지, 아이콘 등)
│   ├── images/                # 이미지 파일 모음
│   │   ├── logo.png           # 예시: 로고 이미지 파일
│   │   └── banner.jpg         # 예시: 배너 이미지 파일
│   └── icons/                 # 아이콘 파일 모음
│       └── userIcon.svg       # 예시: 사용자 아이콘 파일
└── index.js                   # 애플리케이션 엔트리 포인트 (ReactDOM 렌더링)

```



