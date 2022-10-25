## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Some Assumptions

As one of the Bonus points was to use Nextjs, I have decided to use more two pages instead of making it a SPA navigation. All the search logic still works as an SPA although I moved some of the logic to a server API endpoint which was more convinient. This logic could perfectly be executed in client.

The styling was a free choice so I decided to use TailwindCSS.

Search does support adding all the several resources that the api provides (vehicles, species, starships, films, people and planets). However it does not support more than one word per parameter (eg. "anakin skywalker" is not supported but "anakin tatooine wookie" is).

The search url can be shared and it searches once the page is loaded.
