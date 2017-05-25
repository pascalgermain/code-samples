<template>
  <div class="table-wrapper progress-bar">
    <div
      v-for="steps in mainSteps"
      class="table-cell"
    >
      <div
        :title="steps[0].mainStep.title"
        :class="['table-cell', 'main-step', activeStepClass(steps[0].key), doneStepClass(steps[0].key)]"
      >
        <i :class="['fi', 'fi-' + steps[0].mainStep.icon]"></i>
      </div>
      <div class="table-cell">
        <div class="table-wrapper">
          <div
            v-for="subStep in steps"
            :class="['table-cell', 'sub-step', activeStepClass(subStep.key)]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    steps: {
      type: Array,
      required: true
    },
    activeStep: {
      type: Number,
      required: true
    }
  },
  computed: {
    mainSteps () {
      const mainSteps = []
      let mainStep = -1
      this.steps.forEach((step, key) => {
        if (step.mainStep) mainSteps[++mainStep] = []
        mainSteps[mainStep].push({...step, key})
      })
      return mainSteps
    },
    mainStep () {
      let mainStep = this.activeStep
      while (mainStep > 0 && !this.steps[mainStep].mainStep) mainStep--
      return mainStep
    }
  },
  methods: {
    activeStepClass (key) {
      return {active: key <= this.activeStep}
    },
    doneStepClass (key) {
      return {done: key < this.mainStep || this.activeStep === this.steps.length - 1}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/../bower_components/cssFramework/dist/assets/scss/_variables.scss';

$main-step-size: 36px;

.progress-bar {
  padding: 0 90px 30px !important;
}

.table-wrapper {
  display: table;
  table-layout: fixed;
  width: 100%;
}

.table-cell {
  display: table-cell;
}

.main-step {
  position: relative;
  width: $main-step-size;
  height: $main-step-size;
  border: 1px solid $color-metal-light;
  border-radius: 50%;
  font-size: 20px;
  line-height: 28px;
  color: $color-metal-light;
  text-align: center;

  &.active {
    border-color: $color-mint-light;
    color: $color-mint-light;

    &:before {
      border-top-color: $color-mint-light;
    }

    &:after {
      color: $color-mint-light;
    }
  }

  &.done {
    background: $color-mint-light;
    color: $color-white;
  }

  &:before {
    position: absolute;
    left: 12px;
    bottom: -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid $color-metal-light;
    content: '';
  }

  &:after {
    position: absolute;
    left: -43px;
    top: 43px;
    width: 120px;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    content: attr(title);
  }
}

.sub-step {
  position: relative;
  top: 17px;
  height: 3px;
  background: $color-metal-light;

  &.active {
    background: $color-mint-light;
  }
}

.progress-bar.table-wrapper > .table-cell:last-child {
  width: $main-step-size;

  .sub-step {
    display: none;
  }
}
</style>
