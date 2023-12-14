import { createContext, useState, useEffect } from 'react';
import { useGetRecipient } from '@/api/recipient';
import { INITIAL_RECIPIENTS_TYPE } from '@/stores';

export const RecipientContext = createContext();

export const RecipientProvider = ({ children }) => {
  const [storedData, setStoredData] = useState(INITIAL_RECIPIENTS_TYPE);
  const [query, setQuery] = useState({
    limit: 8,
    sort: '',
  });

  const { isLoading, isError, data } = useGetRecipient(query);

  useEffect(() => {
    try {
      setStoredData(data);
    } catch (e) {
      console.error(e);
    }
  }, [data]);

  const contextValue = {
    isLoading,
    isError,
    storedData,
    setStoredData,
    setQuery,
  };

  return (
    <RecipientContext.Provider value={contextValue}>
      {children}
    </RecipientContext.Provider>
  );
};
