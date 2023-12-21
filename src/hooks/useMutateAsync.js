import { useState } from 'react';

export const useMutateAsync = (asyncFunction, initialData) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);

  const execute = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const res = await asyncFunction();
      setData(res.data);
    } catch (e) {
      setIsError(true);
      setError(e);
      console.error('[API ERROR] NOT FOUND FETCH DATA', e);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, data, error, execute };
};
