export const Comments = ({ comments }) => {
  return (
    <ul>
      {comments.length &&
        comments.map((comment) => <Comment key={comment} comment={comment} />)}
    </ul>
  );
};

const Comment = (comment) => {
  return (
    <li>
      {comment.email} : {comment.body}
    </li>
  );
};
