<template>
  <div class="inputNumberComponent">
    <label class="inputNumberComponent__label">
      <span
        v-if="label"
        class="inputNumberComponent__label--text"
      >{{ label }}</span>
      <span
        v-if="prefix"
        class="inputNumberComponent__label--text"
      >{{ prefix }}</span>
      <div
        class="inputNumberComponent__container"
        :class="{'inputNumberComponent__container--error': errorMessage }"
        :style="{'--width': `${number.toString().length === 0 ? '5' : number.toString().length }`}"
      >
        <input
          v-model="number"
          class="inputNumberComponent__container--input"
          type="text"
          placeholder="1,000"
          @input="validateNumber"
          @keydown="handleKeydown"
        >
        <span class="inputNumberComponent__container--input--focus"></span>
      </div>
    </label>
    <p
      v-if="errorMessage"
      class="inputNumberComponent--error"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      number: '',
      errorMessage: '',
    }
  },
  methods: {
    validateNumber () {
      const value = parseInt(this.number)
      let number = ''

      if (value < 1000 || value > 20000000) {
        this.errorMessage = 'Please enter a numeric value between 1,000 and 20,000,000.'
        number = ''
      } else {
        this.errorMessage = ''
        number = value
      }

      this.$emit('amountChange', number)
    },
    handleKeydown (event) {
      if (event.key.length === 1 && !/\d/.test(event.key)) {
        event.preventDefault()
      }
    },
  },

}
</script>

<style lang="scss" scoped>
$fontSize: 2rem;

.inputNumberComponent{
  position: relative;
  padding-bottom: 2rem;
}

.inputNumberComponent__label{
  display: flex;
  font-size: $fontSize;
}
.inputNumberComponent__label--text{
  margin-right: 1rem;
}

.inputNumberComponent__container{
  position: relative;

  .inputNumberComponent__container--input--focus{
    width: 0px;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 50%;
    right: 50%;
    background: gray;
    transition: all 0.2s ease-in-out;
  }
}

.inputNumberComponent__container--input{
  font-size: $fontSize;
  min-width: 50px;
  max-width: 500px;
  width: 50px;
  width: calc(21px * var(--width));
  border: 2px solid transparent;
  transition: border linear .2s;
  color: #2c2c2c;
  text-align: center;

  &:focus{
    outline: none;
    // border-bottom-color: #ccc;
    // color: #000;

    & + .inputNumberComponent__container--input--focus{
      left: 0;
      right: 0;
      width: 100%;
    }
  }
}

.inputNumberComponent__container--error{
  .inputNumberComponent__container--input--focus {
    background-color: brown;
    height: 3px;
  }
}
.inputNumberComponent--error{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 12px;
  color: brown;
  padding: 0 15px;
  margin: 0;
}
</style>
