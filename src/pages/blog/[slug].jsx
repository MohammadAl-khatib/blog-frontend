import { useRouter } from "next/router";
import React from "react";

export default function Blog() {
  const {
    query: { slug },
  } = useRouter();

  return <div>Blog {slug} Page</div>;
}
