<template>
  <div id="ExpensePurpose" style="width: 100%;height: 200px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: "ExpensePurpose",
  data () {
    return {
      charts: '',
      option: [],
      optionData: [],
      purposeList: this.$store.state.purposes,
    }
  },
  methods: {
    drawPie(id){
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title : {
          text: 'Expense Distribution',
	        x: 'center',
	        y: 'top',
          padding: 0,
		    },
		    legend: {
          show: false,
				},
        series: [
          {
            name: 'Purpose',
            type: 'pie',
            avoidLabelOverlap: false,
            color: [ '#ffbb22', '#716aca', '#00c5dc','#30ca40', '#cccccc', '#34bfa3'],
            labelLine: {
	            normal: {
	              show: false
	            }
	          },
	          label: {
	            normal: {
                textStyle: {
                  fontSize: 12
                },
                position: 'inner',
                formatter: "{b}:{d}%",
	            }
		        },
	          avoidLabelOverlap: false,
            radius: ['50%', '80%'],
            center: ['50%', '50%'],
            data: this.optionData,
	        },
		    ]
    	})
  	},
    changEcharts() {
      window.addEventListener('resize', ()=> {
        this.charts.resize();
      })
      this.charts = this.$echarts.init(document.getElementById('ExpensePurpose'));
    }
  },
  mounted(){
    this.$root.Bus.$on('listChange', ExpenseList => {
      this.option = [];
      this.optionData = [];
      let purposes = {}, totalExpense = 0;
      ExpenseList.map(val => {
        totalExpense += parseInt(val.expense);
        if (!purposes[val.purpose]) purposes[val.purpose] = 0;
        purposes[val.purpose] += parseInt(val.expense);
      });

      for (let p in purposes) {
        let name = (this.purposeList).find(val => {
          return parseInt(val.id) === parseInt(p);
        });
        this.option.push(name);
        name && (this.optionData).push({ name: name.label, value: purposes[p]/totalExpense });
      }
      this.drawPie('ExpensePurpose');
    });

    this.$nextTick(function() {
      this.drawPie('ExpensePurpose');
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
