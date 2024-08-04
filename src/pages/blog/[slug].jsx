import { useRouter } from "next/router";
import React from "react";

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  // Pass data to the page via props

  return { props: { repo } };
}

export default function Blog({ repo }) {
  const {
    query: { slug },
  } = useRouter();

  return <div>Blog {repo.stargazers_count} Page {slug}</div>;
}
