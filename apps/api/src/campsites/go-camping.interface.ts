export interface BasedListItem {
  wtrplCo: string; // 개수대 개수
  brazierCl: string; // 화로대
  sbrsCl: string; // 부대시설
  sbrsEtc: string; // 부대시설 기타
  posblFcltyCl: string; // 주변이용가능시설
  posblFcltyEtc: string; // 주변이용가능시설 기타
  clturEventAt: string; // 자체문화행사 여부(Y:사용, N:미사용)
  clturEvent: string; // 자체문화행사명
  exprnProgrmAt: string; // 체험프로그램 여부(Y:사용, N:미사용)
  hvofBgnde: string; // 휴장기간.휴무기간 시작일
  caravAcmpnyAt: string; // 개인 카라반 동반 여부(Y:사용, N:미사용)
  toiletCo: string; // 화장실 개수
  swrmCo: string; // 샤워실 개수
  hvofEnddle: string; // 휴장기간.휴무기간 종료일
  featureNm: string; // 특징
  induty: string; // 업종
  lctCl: string; // 입지구분
  doNm: string; // 도
  sigunguNm: string; // 시군구
  zipcode: string; // 우편번호
  addr1: string; // 주소
  addr2: string; // 주소상세
  mapX: string; // 경도(X)
  mapY: string; // 위도(Y)
  direction: string; // 오시는 길 컨텐츠
  tel: string; // 전화
  homepage: string; // 홈페이지
  resveUrl: string; // 예약 페이지
  resveCl: string; // 예약 구분
  manageNmpr: string; // 상주관리인원
  gnrlSiteCo: string; // 주요시설 일반야영장
  autoSiteCo: string; // 주요시설 자동차야영장
  glampSiteCo: string; // 주요시설 글램핑
  caravSiteCo: string; // 주요시설 카라반
  indvdlCaravSiteCo: string; // 주요시설 개인 카라반
  sitedStnc: string; // 사이트간 거리
  siteMg1Width: string; // 사이트 크기1 가로
  siteMg2Width: string; // 사이트 크기2 가로
  siteMg3Width: string; // 사이트 크기3 가로
  siteMg1Vrticl: string; // 사이트 크기1 세로
  siteMg2Vrticl: string; // 사이트 크기2 세로
  siteMg3Vrticl: string; // 사이트 크기3 세로
  siteMg1Co: string; // 사이트 크기1 수량
  siteMg2Co: string; // 사이트 크기2 수량
  siteMg3Co: string; // 사이트 크기3 수량
  siteBottomCl1: string; // 잔디
  siteBottomCl2: string; // 파쇄석
  siteBottomCl3: string; // 테크
  siteBottomCl4: string; // 자갈
  siteBottomCl5: string; // 맨흙
  tooltip: string; // 툴팁
  glampInnerFclty: string; // 글램핑 - 내부시설
  caravInnerFclty: string; // 카라반 - 내부시설
  prmisnDe: string; // 인허가일자
  operPdCl: string; // 운영기간
  operDeCl: string; // 운영일
  trlerAcmpnyAt: string; // 개인 트레일러 동반 여부(Y:사용, N:미사용)
  intro: string; // 소개
  allar: string; // 전체면적
  insrncAt: string; // 영업배상책임보험 가입여부(Y:사용, N:미사용)
  trsagntNo: string; // 관광사업자번호
  exprnProgrm: string; // 체험프로그램명
  extshrCo: string; // 소화기 개수
  frprvtWrppCo: string; // 방화수 개수
  frprvtSandCo: string; // 방화사 개수
  fireSensorCo: string; // 화재감지기 개수
  themaEnvrnCl: string; // 테마환경
  mangeDivNm: string; // 운영주체.관리주체 (직영, 위탁)
  mgcDiv: string; // 운영기관.관리기관
  manageSttus: string; // 운영상태.관리상태
  eqpmnLendCl: string; // 캠핑장비대여
  animalCmgCl: string; // 애완동물출입
  tourEraCl: string; // 여행시기
  firstImageUrl: string; // 대표이미지
  createdtime: string; // 등록일
  modifiedtime: string; // 수정일
  contentId: string; // 콘텐츠 ID
  facltNm: string; // 야영장명
  lineIntro: string; // 한줄소개
  bizrno: string; // 사업자번호
  facltDivNm: string; // 사업주체.구분
}

export interface CampsiteList {
  items: BasedListItem[];
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}
