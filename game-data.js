window.NEOMANMOLLA_DATA = {
  playerNames: ["민서", "도윤", "지우", "하준", "서연", "유나"],
  avatars: [
    { label: "ME", src: "./assets/ui/avatar-front-blue.png" },
    { label: "DO", src: "./assets/ui/avatar-front-red.png" },
    { label: "JI", src: "./assets/ui/avatar-front-purple.png" },
    { label: "HA", src: "./assets/ui/avatar-front-green.png" },
    { label: "SE", src: "./assets/ui/avatar-front-yellow.png" },
    { label: "YU", src: "./assets/ui/avatar-front-teal.png" },
  ],
  frames: [
    { id: "lime", label: "라임" },
    { id: "coral", label: "코랄" },
    { id: "gold", label: "골드" },
  ],
  themes: ["네온 지하실", "교실 after", "우주 정거장"],
  metrics: [
    { label: "첫판 완료율", value: "70%+" },
    { label: "3판 재시도", value: "35%+" },
    { label: "초대 클릭", value: "20%+" },
  ],
  packs: [
    {
      name: "일상",
      count: 48,
      status: "무료",
      tone: "처음 하는 친구도 바로 답하는 질문",
      rounds: [
        {
          title: "편의점",
          innocent: "편의점에서 자주 사는 야식은?",
          fake: "편의점에서 굳이 안 사는 음식은?",
          answers: ["삼각김밥", "컵라면", "핫바", "제로콜라", "생수", "초코우유"],
          botAnswers: ["삼각김밥", "컵라면", "핫바", "도시락", "떡볶이"],
          fakeAnswers: ["생수", "껌", "샐러드", "견과류"],
        },
        {
          title: "배달",
          innocent: "여럿이 시키기 좋은 배달 메뉴는?",
          fake: "혼자 시키기 좋은 배달 메뉴는?",
          answers: ["치킨", "피자", "마라탕", "떡볶이", "초밥", "햄버거"],
          botAnswers: ["치킨", "피자", "마라탕", "떡볶이", "족발"],
          fakeAnswers: ["햄버거", "초밥", "샐러드", "덮밥"],
        },
      ],
    },
    {
      name: "연애/썸",
      count: 36,
      status: "Plus",
      tone: "대답만 봐도 놀림거리가 생기는 질문",
      rounds: [
        {
          title: "첫 데이트",
          innocent: "첫 데이트 장소로 좋은 곳은?",
          fake: "혼자 시간 보내기 좋은 곳은?",
          answers: ["영화관", "카페", "한강", "전시회", "PC방", "집"],
          botAnswers: ["영화관", "카페", "한강", "전시회", "맛집"],
          fakeAnswers: ["집", "PC방", "서점", "산책"],
        },
      ],
    },
    {
      name: "MT/술자리",
      count: 42,
      status: "Plus",
      tone: "짧고 웃긴 단체용 질문",
      rounds: [
        {
          title: "여행",
          innocent: "친구들이랑 여행 가면 꼭 하는 일은?",
          fake: "혼자 여행 가면 꼭 하는 일은?",
          answers: ["맛집 찾기", "사진 찍기", "숙소에서 쉬기", "야시장", "카페 투어", "늦잠"],
          botAnswers: ["맛집 찾기", "사진 찍기", "야시장", "카페 투어", "기념품 쇼핑"],
          fakeAnswers: ["늦잠", "혼밥", "숙소에서 쉬기", "책 읽기"],
        },
        {
          title: "노래방",
          innocent: "노래방 첫 곡으로 괜찮은 노래 스타일은?",
          fake: "노래방 마지막 곡으로 괜찮은 노래 스타일은?",
          answers: ["발라드", "댄스곡", "아이돌곡", "랩", "OST", "떼창곡"],
          botAnswers: ["댄스곡", "아이돌곡", "신나는 곡", "떼창곡", "아는 노래"],
          fakeAnswers: ["발라드", "이별 노래", "고음곡", "잔잔한 OST"],
        },
      ],
    },
  ],
};
