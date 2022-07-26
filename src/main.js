import { createApp, h, provide } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import { getMainDefinition } from '@apollo/client/utilities'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { WebSocketLink } from '@apollo/client/link/ws'
import FAVORITE_BOOKS_QUERY from './graphql/favoriteBooks.query.gql'
import typedefs from './graphql/typedefs.gql'
import './style.css'

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
}) //for subscriptions

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const link = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
},
wsLink,
httpLink
)

const cache = new InMemoryCache()

cache.writeQuery({
  query: FAVORITE_BOOKS_QUERY,
  data: {
    favoriteBooks: [
      {
        __typename: 'Book',
        title: 'The Black Swan',
        id: 123,
        rating: 5,
      },
    ],
  },
})

const resolvers = {
  Mutation: {
    addBookToFavorites: (_, { book }, { cache }) => {
      const data = cache.readQuery({ query: FAVORITE_BOOKS_QUERY })
      const newData = {
        favoriteBooks: [ ...data.favoriteBooks, book ]
      }
      cache.writeQuery({ query: FAVORITE_BOOKS_QUERY, data: newData })
      return newData.favoriteBooks
    },
  }
}

const apolloClient = new ApolloClient({
  link,
  cache,
  typedefs,
  resolvers
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.mount('#app')
