import { GetStaticProps } from "next";
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
    revalidate: 60 // updates old cached version after 60 seconds
  };
};
