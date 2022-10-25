import EpisodeBadge from '@components/EpisodeBadge';
import Layout from '@components/Layout';
import { FilmType } from '@lib/types';
import { fetcher } from '@lib/utils';
import { GetServerSideProps } from 'next';
import React from 'react';

function Film({ film }: { film: FilmType }) {
  const { title, director, producer, episode_id, release_date } = film;
  return (
    <Layout>
      <div className="col-start-2 col-span-1 pt-6 flex flex-col gap-5 w-full">
        <h1 className="text-2xl flex flex-row items-start gap-5">
          {title}
          <EpisodeBadge episodeNum={episode_id} />
        </h1>
        <div className="flex flex-col items-start p-3 gap-3 shadow-md shadow-slate-700 bg-slate-500 rounded-md">
          <p>{`Director: ${director}`}</p>
          <p>{`Producer: ${producer}`}</p>
          <p>{`Release date: ${release_date}`}</p>
        </div>
      </div>
    </Layout>
  );
}

export default Film;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const film = await fetcher(`https://swapi.dev/api/films/${query.id}/`);
  return {
    props: {
      film,
    },
  };
};
