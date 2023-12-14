import api from '@/api/api';
import { useEffect, useState } from 'react';

export function useGetData(type, path, limit, offset) {
  const [data, setData] = useState();

  useEffect(() => {
    (async function () {
      try {
        const result = await api(type, 'GET', path, null, limit, offset);

        if (
          [
            'RECIPIENTS_ID',
            'BACKGROUND_IMGS',
            'PROFILE_IMGS',
            'MESSAGES',
          ].includes(type)
        ) {
          return setData(result);
        }

        const { results } = result;
        return setData(results);
      } catch (error) {
        return console.log('찾지 못했습니다.');
      }
    })();
  }, []);

  return data;
}
