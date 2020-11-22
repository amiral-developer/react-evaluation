import "./App.css";
import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com";

function App() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      const postsResponse = await fetch(`${API_URL}/posts`);

      if (postsResponse.ok) {
        const posts = await postsResponse.json();

        if (posts) {
          const postsWithComments = await Promise.all(
            posts.map(async (post) => {
              if (post.id) {
                const commentsResponse = await fetch(
                  `${API_URL}/comments?postId=${post.id}`
                );

                if (commentsResponse.ok) {
                  const comments = await commentsResponse.json();

                  return {
                    ...post,
                    comments,
                  };
                }

                return post;
              }

              return post;
            })
          );

          setPosts(postsWithComments);
          console.log(postsWithComments);
        }
      }
    })();
  }, []);

  return (
    <div className="App">
      {!posts && <p>No posts</p>}
      {posts &&
        posts.map((post) => (
          <div>
            <p>
              <strong>{post.title}</strong>
            </p>
            <p>{post.body}</p>
            <ul>
              {post.comments &&
                post.comments.length &&
                post.comments.map((comment) => (
                  <li>
                    {comment.email} : {comment.body}
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default App;
