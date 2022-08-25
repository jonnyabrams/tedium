import Link from "next/link";
import { urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="">
        {post.mainImage && (
          <img src={urlFor(post.mainImage).url()} alt="Post image" />
        )}
        <div className="flex justify-between p-5 bg-white">
          <div>
            <p>{post.title}</p>
            <p>
              {post.description} by {post.author.name}
            </p>
          </div>

          {post.author.image && (
            <img
              className="w-12 h-12 rounded-full"
              src={urlFor(post.author.image).url()}
              alt="Author image"
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default Post;
