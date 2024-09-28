import { useEffect, useState } from 'react';

const useDebounce = (initializeValue = '', delay = 1000) => {
  const [debounceValue, setDebounceValue] = useState(initializeValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initializeValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [initializeValue, delay]);

  return debounceValue;
};

export default useDebounce;
