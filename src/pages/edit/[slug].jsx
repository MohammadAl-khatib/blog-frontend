import { useRouter } from "next/router";
import React from "react";

export default function Edit() {
  const {
    query: { slug },
  } = useRouter();

  return <div>Edit Blog {slug} Page</div>;
}
