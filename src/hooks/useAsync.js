import { useState, useEffect } from 'react';

export const useAsync = (asyncFunction) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState({});

  const excute = async () => {
    setIsLoading(true);
    setIsError(null);
    setData(null);

    try {
      const res = await asyncFunction();
      if (res) {
        const initData = res.data.results;
        setData(initData);
      }
    } catch (e) {
      setIsError(true);
      console.error('[API ERROR]NOT FOUND FETCH DATA', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    excute();
  }, []);

  return { isLoading, isError, data };
};
