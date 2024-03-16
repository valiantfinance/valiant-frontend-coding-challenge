<template>
  <div class="container mx-auto px-4 sm:px-2">
    <div class="mx-auto flex max-w-96 flex-col gap-3 rounded-xl border-2 bg-white p-4 shadow-lg shadow-cyan-500/50">
      <label>I need</label>
      <FormItemComponent>
        <template #label>
          <label>$</label>
        </template>
        <template #default>
          <InputComponent
            v-model="form.loanAmount"
            :min="MIN_LOAN_AMOUNT"
            :max="MAX_LOAN_AMOUNT"
          />
        </template>
      </FormItemComponent>

      <FormItemComponent :error="loanPurposeError">
        <template #label>
          <label for="selectedLoanPurpose">for</label>
        </template>
        <template #default>
          <SelectComponent
            v-model="form.selectedLoanPurpose"
            :options="loanPurposeData"
            placeholder="Choose a loan purpose"
          />
        </template>
      </FormItemComponent>

      <FormItemComponent :error="repaymentPeriodsError">
        <template #label>
          <label>repaid</label>
        </template>
        <template #default>
          <SelectComponent
            v-model="form.repaymentPeriod"
            :options="repaymentPeriodsData"
            placeholder="Choose a repayment period data"
          />
        </template>
      </FormItemComponent>

      <FormItemComponent :error="termMonthsError">
        <template #label>
          <label>over</label>
        </template>
        <template #default>
          <SelectComponent
            v-model="form.termMonths"
            :options="termMonthsData"
            placeholder="Choose a term"
          />
        </template>
      </FormItemComponent>

      <ButtonComponent type="primary">
        Calculate
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import InputComponent from '@/components/InputComponent.vue'
import SelectComponent from '@/components/SelectComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useFetch } from '@/composables/useFetch'
import { ref } from 'vue'
import FormItemComponent from './FormItemComponent.vue'

const LOCALHOST = 'http://localhost:3000/'
const MIN_LOAN_AMOUNT = 0
const MAX_LOAN_AMOUNT = 20000000

const { data: loanPurposeData, error: loanPurposeError } = useFetch(LOCALHOST + 'loan-purposes')
const { data: repaymentPeriodsData, error: repaymentPeriodsError } = useFetch(LOCALHOST + 'requested-repayment-periods')
const { data: termMonthsData, error: termMonthsError } = useFetch(LOCALHOST + 'requested-term-months')

const form = ref({
  loanAmount: '',
  selectedLoanPurpose: '',
  repaymentPeriod: '',
  termMonths: '',
})
</script>
