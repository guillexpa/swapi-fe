import { asyncMapper, fetcher } from '@lib/utils';
import { NextApiResponse, NextApiRequest } from 'next';

type SwapiResults = {
  films: string[];
  url: string[];
};

type SwapiResponse = {
  count: number;
  results: SwapiResults[];
};

const SWAPI_BASE_URL = 'https://swapi.dev/api';
const SWAPI_ENDPOINTS = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles',
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SwapiResults['films']>,
) {
  const query = JSON.parse(req.body).query;
  const splittedQuery = query.split(' ');

  const endpointSearches = asyncMapper(splittedQuery, async (query: string) => {
    for (const endpoint of SWAPI_ENDPOINTS) {
      const data = await fetcher<SwapiResponse>(
        `${SWAPI_BASE_URL}/${endpoint}/?search=${query}`,
      );
      if (data.count > 0) return data;
    }
    return;
  });

  const searchResponses = (await Promise.all(endpointSearches)).filter(Boolean);
  if (!searchResponses.length) {
    return res.status(500).json([]);
  }

  const filmsFromSearches = searchResponses
    .map(({ results }: SwapiResponse) => {
      return results.map(({ films, url }: SwapiResults) => films || [url]);
    })
    .flat()
    .reduce((acc, currentFilm) =>
      acc.filter((c: string) => currentFilm.includes(c)),
    );

  return res.status(200).json(filmsFromSearches);
}
