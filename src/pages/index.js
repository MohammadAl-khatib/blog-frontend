export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  // Pass data to the page via props

  return { props: { repo } };
}

export default function Home({ repo }) {
  return (
    <main>
      <h1>Home page</h1>
      <p>server responded with: {repo.stargazers_count}</p>
    </main>
  );
}
