import FilmCard from './FilmCard';

function FilmList({ films }: { films: string[] | null }) {
  if (!films) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      {!films.length && <h1 className="col-span-2 text-center">No results</h1>}
      {!!films?.length &&
        films.map((result: string, index) => {
          return <FilmCard key={index} film={result} />;
        })}
    </div>
  );
}

export default FilmList;
