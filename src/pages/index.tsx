import type { NextPage } from 'next'
import Head from 'next/head'
import { Hero } from '../components/Home/Hero';

const Home: NextPage = () => (
    <>
      <Head>
        <title>Find Ya Food</title>
        <meta name="description" content="get help finding a place to eat" />
      </Head>
      <Hero />
    </>
  )

export default Home
