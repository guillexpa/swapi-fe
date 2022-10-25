import { useFilm } from '@hooks/useFilm';
import Spinner from './Spinner';

function FilmCard({ film }: { film: string }) {
  const { film: filmData, isLoading } = useFilm(film);

  return (
    <div className="flex flex-col items-start p-3 gap-3 shadow-md shadow-slate-700 bg-slate-500 rounded-md">
      {isLoading && <Spinner />}
      {!isLoading && filmData && (
        <>
          <h2 className="w-full">{filmData?.title}</h2>
          <span className="py-1 px-3 bg-yellow-600 rounded-full text-sm">{`Episode ${filmData?.episode_id}`}</span>
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
