import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Button from '@components/Button';
import { useEffect, useState } from 'react';
import FilmList from '@components/FilmList';
import useSearch from '@hooks/useSearch';
import Layout from '@components/Layout';
import Image from 'next/image';
import Spinner from '@components/Spinner';
import { SEARCH_PARAM_NAME, useSyncUrl } from '@hooks/useSyncUrl';

const Home: NextPage = ({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [inputValue, setInputValue] = useState<string>(query || '');
  const { data, search, isLoading, isSuccessful } = useSearch();
  useSyncUrl(isSuccessful, inputValue);

  useEffect(() => {
    (async () => {
      if (query) {
        await search(inputValue);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await search(inputValue);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Layout>
      <div className="col-start-2 col-span-1 pt-6 flex flex-col justify-center items-center gap-10">
        <Image
          src="/logo.png"
          width={'500'}
          height={'214'}
          alt="Star wars logo"
          priority
        />
        <form
          className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end w-full"
          onSubmit={onSubmit}
        >
          <label className="flex flex-col gap-1 flex-1">
            Search films by title, characters or planets
            <input
              className="px-4 py-2 text-black"
              type="text"
              value={inputValue}
              onChange={onChange}
            />
          </label>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Go'}
          </Button>
        </form>
        <FilmList films={data} />
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      query: query?.[SEARCH_PARAM_NAME] || null,
    },
  };
};
