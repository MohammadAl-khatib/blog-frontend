import React, { useContext, useState } from "react";
import { FaBook } from "react-icons/fa";

import { UserContext } from "@/contexts/UserContext";
import styles from "./FilterButton.module.scss";

function handleMyBlogsClick({ allBlogs, setData, data, username, filterBtnText, setFilterBtnText }) {
    if (filterBtnText === "My Blogs") {
      const userBlogs = data.filter((blog) => blog.author.username === username);
      setData(userBlogs);
      setFilterBtnText("All Blogs");
      return;
    }
  
    setFilterBtnText("My Blogs");
    setData(allBlogs);
  }

export default function FilterButton({allBlogs, setData, data}) {
  const {
    userData: { username },
  } = useContext(UserContext);
  const [filterBtnText, setFilterBtnText] = useState("My Blogs");

  if(!username) return null;

  return (
    <div className={styles.blogsButton}>
      <button
        onClick={() => handleMyBlogsClick({ allBlogs, setData, data, username, filterBtnText, setFilterBtnText })}
        className={styles.myBlogsButton}>
        <FaBook className={styles.myBlogsIcon} /> {filterBtnText}
      </button>
    </div>
  );
}
