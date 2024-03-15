<template>
  <div class="w-96 text-3xl">
    I need <InputComponent v-model="termMonths" /> for <SelectComponent
      v-model="selectedLoanPurpose"
      :options="loanPurposeData"
      placeholder="Choose a loan purpose"
    /> repaid <SelectComponent
      v-model="repaymentPeriod"
      :options="repaymentPeriodsData"
      placeholder="Choose a repayment period data"
    /> over <SelectComponent
      v-model="termMonths"
      :options="termMonthsData"
      placeholder="Choose a term"
    />

    <p>{{ loanPurposeError }}</p>
    <p>{{ repaymentPeriodsError }}</p>
    <p>{{ termMonthsError }}</p>
  </div>
</template>

<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import SelectComponent from '@/components/SelectComponent.vue'
import { useFetch } from '@/composables/useFetch'
import { ref } from 'vue'

const LOCALHOST = 'http://localhost:3000/'

const { data: loanPurposeData, error: loanPurposeError } = useFetch(LOCALHOST + 'loan-purposes')
const { data: repaymentPeriodsData, error: repaymentPeriodsError } = useFetch(LOCALHOST + 'requested-repayment-periods')
const { data: termMonthsData, error: termMonthsError } = useFetch(LOCALHOST + 'requested-term-months')

const selectedLoanPurpose = ref('')
const repaymentPeriod = ref('')
const termMonths = ref('')
</script>
