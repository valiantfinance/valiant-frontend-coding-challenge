import { ref } from 'vue'

export function useFetch (url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  loading.value = true
  fetch(url)
    .then(res => res.json())
    .then((response) => (data.value = response))
    .catch((err) => (error.value = err))
    .finally(() => (loading.value = false))

  return { data, error, loading }
}
