import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

const PostPage = () => {
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
