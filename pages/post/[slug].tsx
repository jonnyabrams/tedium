import { GetStaticProps } from "next";
import { resolveHref } from "next/dist/shared/lib/router/router";
import PortableText from "react-portable-text";

import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  post: Post;
}

const PostPage = ({ post }: Props) => {
  return (
    <main>
      <Header />

      {post.mainImage && (
        <img
          className="object-cover w-full h-40"
          src={urlFor(post.mainImage).url()}
          alt=""
        />
      )}

      <article className="max-w-3xl p-5 mx-auto">
        <h1 className="mt-10 mb-3 text-4xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          {post.author.image && (
            <img
              className="w-10 h-10 rounded-full"
              src={urlFor(post.author.image).url()}
              alt=""
            />
          )}
          <p className="text-sm font-extralight">
            Blog post by{" "}
            <span className="text-green-600">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children}: any) => (
                <a href={href} className="text-blue-500 hover:underline">{children}</a>
              )
            }}
          />
        </div>
      </article>
    </main>
  );
};

export default PostPage;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
    _id,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  // get array of paths with all the slugs we need
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// use those slugs to get the information for each page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
    name,
    image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  // if not post found, return a 404 page
  if (!post) {
    return {
      notFound: true,
    };
  }

  // if post found, return it as a prop
  return {
    props: {
      post,
    },
    revalidate: 60, // updates old cached version after 60 seconds
  };
};
