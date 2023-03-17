<!-- @format -->

<template>
  <div id="app">
    <!-- TODO: Complete the coding challenge here! -->
    <div class="app__container">
      <div class="form-group">
        <InputNumber
          class="form-group__input"
          label="I need"
          prefix="$"
          @amountChange="handleAmountChange"
        />
        <Select
          id="loanPurposes"
          class="form-group__select"
          label="for"
          :items="loanPurposes"
          placeholder-text="Select Loan Purposes"
          @selected="handleSelected"
        />
      </div>
      <div class="form-group">
        <Select
          id="requestedRepaymentPeriods"
          class="form-group__select"
          label="repaid"
          :items="requestedRepaymentPeriods"
          placeholder-text="Select Repayment Periods"
          @selected="handleSelected"
        />
        <Select
          id="requestedTermMonths"
          class="form-group__select"
          label="over"
          :items="requestedTermMonths"
          placeholder-text="Select Term Months"
          @selected="handleSelected"
        />
      </div>
      <div class="footer">
        {{ singlePayment ? `$${singlePayment.display} ${selectedRepaymentLabel} repayments` : '' }} <br>
        {{ totalPayment ? `$${totalPayment} Total repayment` : '' }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import PMT from './utils/PMT'
import Select from './components/Select.vue'
import InputNumber from './components/InputNumber.vue'

export default {
  name: 'App',
  components: {
    Select,
    InputNumber,
  },

  data () {
    return {
      loanPurposes: [],
      requestedRepaymentPeriods: [],
      requestedTermMonths: [],
      requestedAmount: null,
      selectedAnnualRate: null,
      selectedRepaymentPeriod: null,
      selectedRepaymentLabel: null,
      selectedTermMonths: null,
      calcVal: '',
    }
  },
  computed: {
    singlePayment () {
      const { selectedAnnualRate, selectedTermMonths, requestedAmount, selectedRepaymentPeriod } = this

      if (selectedAnnualRate && selectedTermMonths && requestedAmount && selectedRepaymentPeriod) {
        const pmt = PMT(selectedAnnualRate / selectedRepaymentPeriod, selectedTermMonths, requestedAmount)
        const rawValue = pmt.toFixed(2) * -1
        return { display: rawValue.toLocaleString(), raw: rawValue }
      }

      return null
    },
    totalPayment () {
      const { selectedTermMonths } = this

      if (this.singlePayment) return (this.singlePayment.raw * selectedTermMonths).toLocaleString()

      return null
    },
  },
  mounted () {
    Promise.all([axios.get('http://localhost:5000/loan-purposes'), axios.get('http://localhost:5000/requested-repayment-periods'), axios.get('http://localhost:5000/requested-term-months')])
      .then(response => {
        this.loanPurposes = response[0].data
        this.requestedRepaymentPeriods = response[1].data
        this.requestedTermMonths = response[2].data
      })
      .catch(error => {
        console.log(error)
      })
    this.calcVal = PMT(0.1, 24, 30000)
  },
  methods: {
    handleSelected (selectedItem) {
      const { selectedItemId, selectedItemIndex } = selectedItem || {}

      if (selectedItemId === 'loanPurposes') {
        this.selectedAnnualRate = this.loanPurposes[selectedItemIndex]?.annualRate
      }

      if (selectedItemId === 'requestedRepaymentPeriods') {
        const { value, label } = this.requestedRepaymentPeriods[selectedItemIndex] || {}
        this.selectedRepaymentPeriod = value
        this.selectedRepaymentLabel = label
      }

      if (selectedItemId === 'requestedTermMonths') {
        this.selectedTermMonths = this.requestedTermMonths[selectedItemIndex]?.value
      }
    },
    handleAmountChange (amount) {
      this.requestedAmount = amount
    },
  },

}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "San Francisco";
  font-weight: 200;
  src: url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-light-webfont.woff");
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "San Francisco", sans-serif;
  font-weight: 200;

  display: flex;
  height: 100vh;
  .app__container{
    margin: auto;
  }

  .app__container .form-group{
    display: flex;
    margin-bottom: 1rem;
    margin: 0 -15px;
    justify-content: space-evenly;

    & > *{
      padding-left: 15px;
      padding-right: 15px;
    }
  }
}

.footer{
  font-size: 2rem;
  text-align: right;
  margin-top: 4rem;
}

</style>
