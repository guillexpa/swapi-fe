import Head from 'next/head';

function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();
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

      <main>{children}</main>

      <footer>
        <div className="col-start-2 col-span-1 p-4 flex justify-center">
          {`© ${currentYear} - Guille Iglesias`}
        </div>
      </footer>
    </div>
  );
}

export default Layout;
