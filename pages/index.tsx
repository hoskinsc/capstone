import React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import { useQuery } from 'urql'
import { Flex, Text } from 'rebass'
import { withUrqlClient } from 'next-urql'

import Nav from '../components/nav'
import Pokemon from '../components/pokemon'

/*
const query = gql`
  {
    pokemon(name: "Kabuto") {
      number
      name
      image
    }
  }
`
 */

const query = gql`
query MyQuery {
  pokemon {
    number
    name
    image
  }
}
`
const Home = () => {
  const [res] = useQuery({
    query
  })
  console.log('res===>', res)
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Flex width="100vw" justifyContent="center">
        {res.fetching ? ( <Text>Loading...</Text>) : ( <Pokemon {...res.data.pokemon[0]} />)}
      </Flex>
    </div>
  )
}

export default withUrqlClient({ url: 'http://localhost:8080/v1/graphql'  })(Home)
