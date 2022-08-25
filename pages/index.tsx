import Head from "next/head";
import { sanityClient, urlFor } from "../sanity";

import Banner from "../components/Banner";
import Header from "../components/Header";
import { Post } from "../typings";

interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  console.log(posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Tedium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
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
