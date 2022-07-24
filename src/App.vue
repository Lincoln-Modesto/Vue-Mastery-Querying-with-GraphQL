<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const searchTerm = ref('')
    const { result, loading, error } = useQuery(ALL_BOOKS_QUERY, () => ({ search: searchTerm.value }))

    console.log(result)

    return {
      result,
      searchTerm,
      loading,
      error
    }
  }
}

</script>

<template>
  <div>
    <input type="text" v-model="searchTerm" />

      <p v-if="loading">Loading...</p>
      <p v-else-if="error">Something went wrong! Please try again</p>
    <template v-else>
      <p v-for="book in result.allBooks" :key="book.id">
        {{ book.title }}
      </p>
    </template>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
