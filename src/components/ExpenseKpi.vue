<template>
  <el-row :gutter="10">
  <h2 align="center">Find your daily expense</h2>
  <el-col :span="5">
    <el-card shadow="always" align="center">
      <h4>Total Expense</h4>
			<p>{{totalExpense}}</p>
    </el-card>
  </el-col>
  <el-col :span="5">
    <el-card shadow="hover" align="center">
      <h4>Monthly Expense</h4>
      <p>{{monthlyExpense}}</p>
    </el-card>
  </el-col>
  <el-col :span="5">
    <el-card shadow="never" align="center">
      <h4>Average Expense</h4>
      <p>{{avgExpense}}</p>
    </el-card>
  </el-col>
  <el-col :span="5">
    <el-card shadow="never" align="center">
      <h4>This Month Expense</h4>
      <p>{{thisMonth}} <span class="subp">{{sign}}{{lastMonth}}</span></p>
    </el-card>
  </el-col>
  </el-row>
</template>

<script>

export default {
  name: "ExpenseKpi",
  data() {
    return {
      totalExpense: 0,
      monthlyExpense: 0,
      avgExpense: 0,
      thisMonth: 0,
      lastMonth: 0,
      sign: '',
    }
  },
  methods: {
    formatPercentage(number, digits) {
      return Math.round(number * Math.pow(10, digits) * 100) / Math.pow(10, digits) + '%';
    },
    formatNumber(number, cent, isThousand) {
      number = number.toString().replace(/\$|\,/g,'');
      // Check if the number is numeric
      if(isNaN(number)) number = "0";
      let sign = (number == (number = Math.abs(number)));
      number = Math.floor(number*Math.pow(10, cent) + 0.50000000001);
      let cents = number%Math.pow(10, cent);
      number = Math.floor(number/Math.pow(10, cent)).toString();
      cents = cents.toString();
      while(cents.length < cent) cents = "0" + cents;
      if (isThousand) {
        for (let i = 0; i < Math.floor((number.length - (1+i)) / 3); i++)
          number = number.substring(0, number.length - (4*i+3))+','+ number.substring(number.length - (4*i+3));
      }
      if (cent > 0 && parseInt(cents) > 0) return (((sign) ? '' : '-') + number + '.' + cents);
      else return (((sign)?'':'-') + number);
    }
  },
  mounted(){
    this.$root.Bus.$on('listChange', ExpenseList => {
      this.totalExpense = 0;
      this.thisMonth = 0;
      this.monthlyExpense = 0;
      this.avgExpense = 0;
      this.sign = '';

      let visits = 0, lastMonth = 0, now = new Date(), months = [];
      let currentMonthDate = new Date().toISOString().substring(0, 7);
      let lastMonthDate = new Date(now.getFullYear(),now.getMonth()-1,now.getDate()).toISOString().substring(0, 7);

      ExpenseList.map((val) => {
        this.totalExpense += parseInt(val.expense);
        if (months.indexOf(val.date) <= -1) months.push(val.date);

        now = new Date(val.date);
        if (now.toISOString().substring(0, 7) === currentMonthDate) {
          this.thisMonth += parseInt(val.expense);
        }
        if (now.toISOString().substring(0, 7) === lastMonthDate) {
          lastMonth += parseInt(val.expense);
        }
        visits++;
      });

      if (ExpenseList.length > 0) {
        let diff = this.thisMonth - lastMonth;
        this.monthlyExpense = this.formatNumber(this.totalExpense / months.length, 2, 0);
        this.sign = diff > 0 ? '+' : (diff === 0 ? '' : '-');
        this.lastMonth = this.formatPercentage(lastMonth === 0 ? this.thisMonth : Math.abs(diff) / lastMonth, 1);
        this.avgExpense = this.formatNumber(this.totalExpense / visits, 2, 0);
      }
    });
  }
}
</script>

<style scoped>

div {
  color: black;
  background-color: white;
}
p {
  font-size: 23px;
  font-weight: bold;
  color: orange;
}
.subp {
  color: gray;
  font-size: 15px;
  font-weight: lighter;
}
</style>
