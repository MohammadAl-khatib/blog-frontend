import { useState } from "react";

import BlogCard from "@/components/BlogCard/BlogCard";
import { API } from "../../constants";
import FilterButton from "@/components/FilterButton/FilterButton";

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${API}/posts`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default function Home({ data: allBlogs }) {
  const [data, setData] = useState(allBlogs);

  return (
    <div>
      <FilterButton allBlogs={allBlogs} data={data} setData={setData}/>
      <div className="home-page-blogs-container">
        {data.map((blog) => {
          const { _id, cover, title, author, createdAt, summary } = blog;
          return (
            <BlogCard
              key={_id}
              _id={_id}
              cover={cover}
              title={title}
              author={author}
              createdAt={createdAt}
              summary={summary}
            />
          );
        })}
      </div>
    </div>
  );
}
