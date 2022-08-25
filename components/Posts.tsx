import { Post } from "../typings";
import PostComponent from "./Post";

interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-6">
      {posts.map((post) => (
        <PostComponent post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
