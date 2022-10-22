import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Button from '@components/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ResultsList from '@components/ResultsList';

const SEARCH_PARAM_NAME = 'search' as string;

const Home: NextPage = ({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (query) {
      setInputValue(query);
    }
  }, [query]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const {
      results: [firstResult],
    } = await (
      await fetch(`https://swapi.dev/api/people/?search=${inputValue}`, {
        method: 'GET',
      })
    ).json();

    if (!firstResult) {
      setResults([]);
      setLoading(false);
      return;
    }

    const { films } = firstResult;
    router.replace({
      query: { ...router.query, [SEARCH_PARAM_NAME]: inputValue },
    });

    const filmInfo = [];
    for (const film of films) {
      const response = await (
        await fetch(film, {
          method: 'GET',
        })
      ).json();
      filmInfo.push(response);
    }

    setResults(filmInfo);
    setLoading(false);

    console.log(filmInfo);
  };
  return (
    <div id="app">
      <Head>
        <title>Star Wars Google</title>
        <meta
          name="description"
          content="The best site to search for Star Wars related stuff"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⭐</text></svg>"
        />
      </Head>

      <main>
        <div className="col-start-2 col-span-1 p-4 flex flex-col justify-center items-center gap-10">
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
                onChange={(e) => setInputValue(e.target.value)}
              />
            </label>
            <Button type="submit" disabled={loading}>
              Go
            </Button>
          </form>
          <ResultsList results={results} />
        </div>
      </main>

      <footer>
        <div className="col-start-2 col-span-1 p-4 flex justify-center">
          {`© ${new Date().getFullYear()} - Guille Iglesias`}
        </div>
      </footer>
    </div>
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
