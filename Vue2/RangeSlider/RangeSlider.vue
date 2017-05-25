<template>
  <div ref="rangeSlider"></div>
</template>

<script>
import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.css'
import './RangeSlider.scss'

export default {
  name: 'range-slider',
  data () {
    return {
      rangeSlider: null
    }
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  mounted () {
    const start = this.value || this.options.start
    this.rangeSlider = noUiSlider.create(this.$refs.rangeSlider, {...this.options, start})
    this.rangeSlider.on('update', (values, handle, unencoded) => {
      if (unencoded[0] !== this.value) this.$emit('input', unencoded[0])
    })
  },
  watch: {
    value () {
      this.rangeSlider.set(this.value)
    }
  }
}
</script>
