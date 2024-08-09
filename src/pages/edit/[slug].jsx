import Modal from "@/components/Modal/Modal";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./Edit.module.scss";
import { useRouter } from "next/router";
import { API } from "../../../constants";

const Editor = dynamic(() => import("../../components/Editor/Editor"), {
  ssr: false, // don't render server side, this uses document
});

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await fetch(`${API}/post/${params.slug}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

async function deletePost({ event, id, setModalMessage, setShowModal, router }) {
  event.preventDefault();  

  const response = await fetch(`${API}/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.status === 200) {
    setModalMessage("Blog has been deleted!");
    setShowModal(true);
    setTimeout(() => {
      router.push(`/`);
    }, 2000);
  } else {
    setModalMessage("Something went wrong, try again later");
    setShowModal(true);
  }
}

async function updatePost({ event, title, summary, file, content, setModalMessage, setShowModal, id, router }) {
  event.preventDefault();

  const data = new FormData();
  data.set("title", title);
  data.set("summary", summary);
  data.set("content", content);
  data.set("file", file);

  const response = await fetch(`${API}/edit/${id}`, {
    method: "PUT",
    body: data,
    credentials: "include",
  });

  if (response.status === 200) {
    const blogData = await response.json();
    setModalMessage(`${blogData.title} has been updated successfully`);

    setShowModal(true);
    setTimeout(() => {
      router.push(`/blog/${id}`);
    }, 2000);
  } else {
    setModalMessage("Something went wrong, try again later");
    setShowModal(true);
  }
}

export default function Edit({ data }) {
  const [title, setTitle] = useState(data.title);
  const [summary, setSummary] = useState(data.summary);
  const [file, setFIle] = useState("");
  const [content, setContent] = useState(data.content);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const router = useRouter();  

  useEffect(() => {
    const isAnyFieldModified = title !== data.title || summary !== data.summary || file !== "" || content !== data.content;

    setIsModified(isAnyFieldModified);
  }, [title, summary, file, content, data]);

  return (
    <div className={styles.container}>
      <form
        onSubmit={(event) => updatePost({ event, title, summary, file, content, setModalMessage, setShowModal, id: data._id, router })}
        className={styles.form}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.input} ${styles.title}`}
        />
        <textarea
          placeholder="Summary"
          name="summary"
          rows="4"
          cols="50"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={`${styles.input} ${styles.summary}`}
        />
        <input
          type="file"
          onChange={(e) => setFIle(e.target.files[0])}
          className={`${styles.input} ${styles.file}`}
        />
        <Editor
          value={content}
          onChange={setContent}
        />
        <button
          className={styles.button}
          disabled={!isModified}>
          Edit Post
        </button>
        <button
          onClick={(event) => deletePost({ event, id: data._id, setModalMessage, setShowModal, router })}
          className={styles.deleteButton}>
          Delete Post
        </button>
      </form>
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
