import { useEffect, useState } from "react";
import "./App.css";
import { Comments } from "./components/Comments";

const API_URL = "https://jsonplaceholder.typicode.com";

const generateRandomColor = () =>
  "#" + (((1 << 24) * Math.random()) | 0).toString(16);

function App() {
  let currentPosts;

  const [message, setMessage] = useState();
  const [randomColor, setRandomColor] = useState(generateRandomColor());

  useEffect(() => {
    (async () => {
      const postsResponse = await fetch(`${API_URL}/posts?_limit=10`);

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

          currentPosts = postsWithComments;
          setMessage("Posts loaded");
        }
      }
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRandomColor(generateRandomColor());
    }, 5000);
  });

  return (
    <div className="App">
      {!currentPosts && <p>No posts</p>}
      {currentPosts &&
        currentPosts.map((post) => (
          <div>
            <p>
              POST : <strong>{post.title}</strong>
            </p>
            <p>{post.body}</p>
            <Comments comments={post.comments} />
          </div>
        ))}

      {message && (
        <div
          style={{
            backgroundColor: randomColor,
            color: "white",
            position: "absolute",
            width: "90%",
            height: 30,
            top: 0,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default App;
