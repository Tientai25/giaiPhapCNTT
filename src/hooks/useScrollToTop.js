import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook để scroll page lên top khi route thay đổi
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
};

export default useScrollToTop;
