<template>
  <div>
    <expense-input
      @addExpense="addExpense">
    </expense-input>
    <div
      <el-table :data="expenseList.slice((currentPage-1)*pagesize,currentPage*pagesize)" :default-sort = "{prop: 'date', order: 'descending'}" style="width: 100%"  max-height="250">
        <!-- <el-table-column prop="id" label="序号" align="center"> </el-table-column> -->
        <el-table-column prop="date" label="Date" sortable width="100"> </el-table-column>
        <el-table-column prop="expense" label="Expense" width="80"> </el-table-column>
        <!-- <el-table-column prop="purpose" label="Purpose" width="80"> </el-table-column> -->
        <el-table-column fixed="right" label="Ops" width="50">
          <template slot-scope="scope">
            <el-button
              class="button"
              @click.native.prevent="deleteExpense(scope.$index, scope.row)"
              type="text"
              size="small">
              Del
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next"
        :total="expenseList.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ExpenseItem from './ExpenseItem'
  import ExpenseInput from './ExpenseInput'
export default {
  name: "ExpenseList",
  components: {
    ExpenseItem,
    ExpenseInput
  },
  data() {
    return {
      pagesize: 10,
      currentPage:1,
      expenseList: [
        {
          id: new Date('2017-01-01').toISOString().substring(0, 10),
          date: '2017-01-01',
          expense: 13,
          purpose: 1
        }
      ]
    }
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
    },
    addExpense: function(payload) {
      this.expenseList.push(payload);
      this.$root.Bus.$emit('listChange', this.expenseList);
    },
    deleteExpense: function(index, row) {
      const idx = this.expenseList.findIndex((e, index) => {
        return e.id === row.id;
      });
      this.expenseList.splice(idx, 1);
      this.$root.Bus.$emit('listChange', this.expenseList);
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.$root.Bus.$emit('listChange', this.expenseList);
    })
  }
}
</script>

<style scoped>
.button {
  color: red;
}
</style>
