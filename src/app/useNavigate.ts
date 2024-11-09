import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goLogin: () => {
      const targetPath = '/login';
      navigate(targetPath, { replace: true });
    },
    goTimetable: () => {
      const targetPath = '/';
      navigate(targetPath, { replace: true });
    },
    goMypage: () => {
      const targetPath = '/mypage';
      navigate(targetPath, { replace: true });
    },
    goLanding: () => {
      const targetPath = '/landing';
      navigate(targetPath, { replace: true });
    },
  };
};
