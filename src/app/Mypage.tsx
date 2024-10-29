type MypageType = {
  nickname: string;
};

const Mypage = ({ nickname }: MypageType) => {
  return <p>로그인된 사용자: {nickname}</p>;
};

export default Mypage;
