function EpisodeBadge({ episodeNum }: { episodeNum: number }) {
  return (
    <span className="py-1 px-3 bg-yellow-600 rounded-full text-sm">{`Episode ${episodeNum}`}</span>
  );
}

export default EpisodeBadge;
