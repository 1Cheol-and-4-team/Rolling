import { instance } from '@/api/axiosInstance';
import { useAsync } from '@/hooks/useAsync';

// [get] 롤링 페이퍼 대상 목록 조회
export const useGetRecipient = ({ limit, sort }) => {
  const url = `/recipients/`;

  const recipient = async () => instance.get(url);
  const { isLoading, isError, data } = useAsync(recipient);

  return { isLoading, isError, data };
};
