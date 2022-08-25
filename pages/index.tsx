import Head from "next/head";
import { sanityClient, urlFor } from "../sanity";

import Banner from "../components/Banner";
import Header from "../components/Header";
import { Post } from "../typings";
import Posts from "../components/Posts";

interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Tedium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <Posts posts={posts} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    slug,
    author -> {
    name,
    image
    },
    description,
    slug,
    mainImage
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Home;
