# Backed Club

> 빵켓팅을 진행하는 방식이 다양하고 제과제빵점 마다 이용하는 플랫폼이 SMS, 설문, 스마트스토어, 아이디어스 등 다양한데 하나의 플랫폼에서 여러 제과제빵점에서 진행하는 마켓을 신청할 수 있는 서비스를 제공한다.

### 미리보기

- 로그인 및 회원가입

<img src="./assets/v1/pages/home/home.png" height="200"> <img src="./assets/v1/pages/login/login.png" height="200">
<img src="./assets/v1/pages/signup/signup-customer.png" height="200"> <img src="./assets/v1/pages/signup/signup-brand.png" height="200">

- 고객

<img src="./assets/v1/pages/customer/markets.png" height="200"> <img src="./assets/v1/pages/customer/market-detail.png" height="200">
<img src="./assets/v1/pages/customer/market-detail-ticket-new.png" height="200"> <img src="./assets/v1/pages/customer/market-detail-ticket-new-result.png" height="200">
<img src="./assets/v1/pages/customer/brands.png" height="200"> <img src="./assets/v1/pages/customer/brand-detail.png" height="200">
<img src="./assets/v1/pages/customer/products.png" height="200"> <img src="./assets/v1/pages/customer/product-detail.png" height="200">
<img src="./assets/v1/pages/customer/tickets.png" height="200"> <img src="./assets/v1/pages/customer/ticket-detail.png" height="200">
<img src="./assets/v1/pages/customer/bookmarks.png" height="200"> <img src="./assets/v1/pages/customer/profile.png" height="200">
<img src="./assets/v1/pages/customer/search.png" height="200">

- 브랜드

<img src="./assets/v1/pages/brand/tickets.png" height="200"> <img src="./assets/v1/pages/brand/ticket-detail.png" height="200">
<img src="./assets/v1/pages/brand/products.png" height="200"> <img src="./assets/v1/pages/brand/product-new.png" height="200">
<img src="./assets/v1/pages/brand/product-new-result.png" height="200"> <img src="./assets/v1/pages/brand/product-detail.png" height="200">
<img src="./assets/v1/pages/brand/markets.png" height="200"> <img src="./assets/v1/pages/brand/market-new.png" height="200">
<img src="./assets/v1/pages/brand/market-new-confirm.png" height="200"> <img src="./assets/v1/pages/brand/market-new-result.png" height="200">
<img src="./assets/v1/pages/brand/market-detail.png" height="200"> <img src="./assets/v1/pages/brand/profile.png" height="200">

---

### 기능요약

- 회원
  - 로그인
  - 가입
- 고객
  - 마켓/브랜드/상품/티켓 목록 조회
  - 마켓/브랜드/상품/티켓 상세 조회
  - 마켓 신청
  - 북마크
  - 마켓/브랜드/상품 검색
  - 프로필
- 브랜드
  - 상품/마켓 생성
  - 브랜드가 생성한 마켓으로부터 생성된 티켓 내역 조회
  - 프로필

---

### ERD

<img src="./assets/v1/exec/erd.png" width="512">

---

### etc

- ORM: TypeORM
- Authentication: passport
- File upload: multer
- Payments test: tosspayments
- 사업자조회: 공공데이터포털 Open API
