import { useFilm } from '@hooks/useFilm';
import { useRouter } from 'next/router';
import EpisodeBadge from './EpisodeBadge';
import Spinner from './Spinner';

function FilmCard({ film }: { film: string }) {
  const { film: filmData, isLoading } = useFilm(film);
  const id = film.split('/').at(-2);
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-start p-3 gap-3 shadow-md shadow-slate-700 bg-slate-500 rounded-md cursor-pointer"
      onClick={() => router.push({ pathname: 'film', query: { id } })}
    >
      {isLoading && <Spinner />}
      {!isLoading && filmData && (
        <>
          <h2 className="w-full">{filmData?.title}</h2>
          <EpisodeBadge episodeNum={filmData?.episode_id} />
          <span className="self-end">
            {`${new Date(filmData.release_date).toLocaleDateString()} ( ${
              new Date(
                new Date().getTime() -
                  new Date(filmData.release_date).getTime(),
              ).getFullYear() - 1970
            } years ago)`}
          </span>
        </>
      )}
    </div>
  );
}

export default FilmCard;
