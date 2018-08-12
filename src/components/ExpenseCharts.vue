<template>
  <div id="ExpenseCharts" style="width: 100%;height: 350px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: "ExpenseCharts",
  data () {
    return {
      charts: '',
      xData: [],
      optionData: [],
    }
  },
  methods: {
    drawLine(id){
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title : {
          text:"Expense Trends",
          // subtext: "This trend is ascending by date",
          x:'center',
          y:'top',
	        show: true,
		    },
		    tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Expense Trend'],
            show: true,
        },
        grid: {
            left: '3%',
            right: '16%',
            bottom: '3%',
            top: '13%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: this.xData,
            name: 'Date',
        },
        yAxis: {
            type: 'value',
            name: 'Expense'
        },
        series: [
	        {
              type: 'line',
              smooth: true,
		          showSymbol: true,
              data: this.optionData
          },
		    ]
    	})
  	},
    changEcharts() {
      window.addEventListener('resize', ()=> {
        this.charts.resize();
      })
      this.charts = this.$echarts.init(document.getElementById('ExpenseCharts'));
    },
  },
  mounted(){
    this.$root.Bus.$on('listChange', ExpenseList => {
      let dates = [], expenses = {};
      ExpenseList.map((val) => {
        dates.push(val.date);
      });

      this.xData = dates.sort().filter(function(el,i,a) { return (i == a.indexOf(el)); });
      this.xData.forEach(d => {
        ExpenseList.map(val => {
          if (!expenses[d]) expenses[d] = 0;
          if (val.date == d) {
            expenses[d] += parseInt(val.expense);
          }
        });
      });

      this.optionData = Object.values(expenses);
      this.drawLine('ExpenseCharts');
    });

    this.$nextTick(function() {
      this.drawLine('ExpenseCharts');
    })
    this.changEcharts();
  }
}
</script>

<style scoped>
div {
  color: gray;
  background-color: white;
}
</style>
