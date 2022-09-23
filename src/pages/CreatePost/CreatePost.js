import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    let imagetest = image;

    try {
      new URL(imagetest);
    } catch (error) {
      setFormError("The image needs to be an URL");
      return;
    }
    let tagsarray = [];
    // create tags array
    tags.length > 0
      ? (tagsarray = tags.split(",").map((tag) => tag.trim().toLowerCase()))
      : (tagsarray = null);

    // check values
    if (!title || !image || tagsarray === null || !body) {
      setFormError("Please, fill up all the fields!");
      return;
    }

    insertDocument({
      title,
      image,
      body,
      tags: tagsarray,
      uid: user.uid,
      createdBy: user.displayName,
    });
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Create a new post</h2>
      <p>Write about whatever you want and share your knowledge!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="text"
            placeholder="Title of your post"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input
            type="text"
            name="image"
            placeholder="Image that represents this post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Content:</span>
          <textarea
            name="body"
            placeholder="Post content"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Tags of your post, separated by commas"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Create post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Wait.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
