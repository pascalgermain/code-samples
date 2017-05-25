<template>
  <span>
    <input
      :value="formattedValue"
      @input="emitValue($event.target.value)"
      :placeholder="placeholder"
    >
  </span>
</template>

<script>
import Formatter from '@/lib/Formatter'

export default {
  name: 'amount-input',
  props: {
    value: {
      type: Number
    },
    placeholder: {
      type: String
    }
  },
  computed: {
    formattedValue () {
      const formattedValue = Formatter.number.format(this.value)
      return formattedValue === '0' ? '' : formattedValue
    }
  },
  methods: {
    emitValue (value) {
      this.$emit('input', Formatter.number.clean(value))
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
span,
input {
  width: 100%;
  height: 45px;
  line-height: 45px;
}

span {
  display: inline-block;
  position: relative;

  &:after {
    position: absolute;
    right: 8px;
    font-weight: 700;
    content: '€';
  }
}

input {
  outline: 0;
  border: 1px solid #e3e3e7;
  border-radius: 3px;
  padding-right: 19px;
  font-size: 16px;
  text-align: right;
}
</style>
