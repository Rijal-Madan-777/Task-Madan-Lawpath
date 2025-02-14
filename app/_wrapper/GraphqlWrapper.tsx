'use client'
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import FormUi from '../../components/FormUi'
import client from '../../apollo-client'

function GraphqlWrapper() {
  return (
    <ApolloProvider client={client}>
      <FormUi />
    </ApolloProvider>
  )
}

export default GraphqlWrapper
