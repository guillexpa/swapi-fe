import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const SEARCH_PARAM_NAME = 'search';

export const useSyncUrl = (changing: boolean, newQuery: string) => {
  const router = useRouter();

  useEffect(() => {
    let query = router.query;
    if (changing) {
      query = { ...query, [SEARCH_PARAM_NAME]: newQuery };
    } else {
      delete query[SEARCH_PARAM_NAME];
    }

    router.replace({ query }, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changing]);
};
