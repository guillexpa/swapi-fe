import { fetcher } from '@lib/utils';
import { useState } from 'react';

const getSearchData = async (query: string) => {
  return await fetcher<string[]>('api/search', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
};

const useSearch = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const search = async (query: string) => {
    setData(null);
    setIsLoading(true);

    const response = await getSearchData(query);

    setData(response);
    setIsLoading(false);
  };

  return { data, search, isLoading, isSuccessful: !!data?.length };
};

export default useSearch;
