<script setup>
import { fetchLoanOptions } from '@/services/loanOptions'
import { onMounted, ref } from 'vue'

const loanOptions = ref({
  loanPurposes: [],
  repaymentPeriods: [],
  loanTerms: [],
})

const loadState = ref('loading')

async function loadLoanOptions () {
  loadState.value = 'loading'

  try {
    loanOptions.value = await fetchLoanOptions()
    loadState.value = 'ready'
  } catch {
    loadState.value = 'error'
  }
}

onMounted(loadLoanOptions)
</script>

<template>
  <section>
    <p
      v-if="loadState === 'loading'"
      role="status"
    >
      Loading calculator...
    </p>

    <div v-else-if="loadState === 'error'">
      <p role="alert">
        We couldn't load the calculator options.
      </p>

      <button
        type="button"
        @click="loadLoanOptions"
      >
        Try again
      </button>
    </div>

    <div v-else-if="loadState === 'ready'">
      <p>Calculator options loaded.</p>
    </div>
  </section>
</template>
