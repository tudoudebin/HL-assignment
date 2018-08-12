<template>
  <div id="app" class="ui padded grid">
    <div class="ui row">
      <div class="twelve wide column">
        <expense-kpi class="kpi"></expense-kpi>
        <expense-charts class="kpi"></expense-charts>
        <expense-purpose></expense-purpose>
      </div>

      <div class="three wide column">
        <expense-list></expense-list>
      </div>
    </div>
  </div>
</template>

<script>
import ExpenseList from './components/ExpenseList'
import ExpenseCharts from './components/ExpenseCharts'
import ExpenseKpi from './components/ExpenseKpi'
import ExpensePurpose from './components/ExpensePurpose'

export default {
  name: 'App',
  components: {
    ExpenseList,
    ExpenseCharts,
    ExpenseKpi,
    ExpensePurpose,
  },
  data() {
    return {

    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    width: 100vw;
  }
.kpi {
  padding: 30px 20px 50px 20px;
}

</style>
