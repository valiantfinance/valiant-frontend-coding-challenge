import { ref } from 'vue'

export function useFetch (url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then(res => res.json())
    .then((response) => (data.value = response))
    .catch((err) => (error.value = err))

  return { data, error }
}
