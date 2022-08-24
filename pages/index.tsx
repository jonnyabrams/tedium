import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Tedium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>This is Tedium 2.0</h1>
    </div>
  )
}

export default Home
