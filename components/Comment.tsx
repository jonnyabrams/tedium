import { Comment } from "../typings";

interface Props {
  comment: Comment;
}

const Comment = ({ comment }: Props) => {
  return (
    <div>
      <p>
        <span className="text-yellow-500">{comment.name}:</span> {comment.comment}
      </p>
    </div>
  );
};

export default Comment;
