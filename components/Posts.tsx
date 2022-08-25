import { Post } from "../typings";
import PostComponent from "./Post";

interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {
  return (
    <div>
      {posts.map((post) => (
        <PostComponent post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
