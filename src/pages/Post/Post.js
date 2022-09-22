import { useParams } from "react-router-dom";
import { useFetchSingleDocument } from "../../hooks/useFetchSingleDocument";
import styles from "./Post.module.css";

const Post = () => {
  const { id } = useParams();

  const { document: post, loading } = useFetchSingleDocument("posts", id);
  console.log(document);

  return (
    <div className={styles.post_container}>
      {loading && <p> Loading post...</p>}
      {post && (
        <>
          <h1> {post.title} </h1>
          <img src={post.image} alt={post.title}></img>
          <p>{post.body}</p>
          <h3>This post is about: </h3>
          <div className={styles.tags}>
            {post.tags.map((tag) => {
              return (
                <p key={tag}>
                  <span> #</span> {tag}
                </p>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
