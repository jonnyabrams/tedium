import Link from "next/link";
import { urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="overflow-hidden border rounded-lg cursor-pointer group">
        {post.mainImage && (
          <img
            className="object-cover w-full transition-transform duration-200 ease-in h-60 group-hover:scale-105"
            src={urlFor(post.mainImage).url()}
            alt="Post image"
          />
        )}
        <div className="flex justify-between p-5 bg-white">
          <div>
            <p className="text-lg font-bold">{post.title}</p>
            <p className="text-xs">
              {post.description} <span className="font-bold">by {post.author.name}</span>
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
