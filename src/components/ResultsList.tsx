type Films = {
  title: string;
  episode_id: number;
  release_date: string;
  director: string;
  producer: string;
};

type ResultsListProps = {
  results: Films[] | null;
};

function ResultsList({ results }: { results: any[] | null }) {
  if (!results) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      {!results.length && (
        <h1 className="col-span-2 text-center">No results</h1>
      )}
      {!!results?.length &&
        results.map(({ title, episode_id, release_date }) => {
          return (
            <div
              className="flex flex-wrap items-center justify-between p-3 gap-3 shadow-md bg-slate-500 rounded-sm"
              key={episode_id}
            >
              <h2 className="w-full">{title}</h2>
              <span className="py-1 px-3 bg-yellow-600 rounded-full text-sm">{`Episode ${episode_id}`}</span>
              <span>{new Date(release_date).toLocaleDateString()}</span>
            </div>
          );
        })}
    </div>
  );
}

export default ResultsList;
