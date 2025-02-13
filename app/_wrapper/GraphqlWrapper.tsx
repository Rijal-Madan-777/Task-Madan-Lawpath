'use client'
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import createApolloClient from '@/apollo-client'
import FormUi from '@/components/FormUi'

const client = createApolloClient()

function GraphqlWrapper() {
  return (
    <ApolloProvider client={client}>
      <FormUi />
    </ApolloProvider>
  )
}

export default GraphqlWrapper
