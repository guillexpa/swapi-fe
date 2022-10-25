import { FilmType } from '@lib/types';
import { fetcher } from '@lib/utils';
import { useEffect, useState } from 'react';

const getFilmData = async (filmEndpoint: string) => {
  return await fetcher<FilmType>(filmEndpoint);
};

export const useFilm = (filmEndpoint: string) => {
  const [film, setFilm] = useState<FilmType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setFilm(null);

    (async () => {
      const data = await getFilmData(filmEndpoint);
      setFilm(data);
      setIsLoading(false);
    })();
  }, [filmEndpoint]);

  return { isLoading, film };
};
