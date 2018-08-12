<template>
  <div class="ui segment">
    <div class="ui form">
      <div class="block">
        <span>Date</span>
        <el-date-picker
          v-model="currentDate"
          type="date"
          placeholder="Pick a day">
        </el-date-picker>
      </div>
      <div class="block expense">
        <label>Expense ($)</label>
        <input class="ui left input" type="number" v-model="currentExpense">
      </div>
      <div class="block purpose">
        <label>Purpose</label>
        <select class="ui left" v-model="purpose">
          <option v-for="item in purposes" :value="item.id" :key="item.id">{{ item.label }}</option>
        </select>
      </div>
      <div class="ui submit fluid button" @click="emitAdd">Add New</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpensesInput",
  data() {
    return {
      currentDate: new Date().toISOString().substring(0, 10),
      currentExpense: null,
      purpose: 1,
    }
  },
  computed: {
    purposes () {
      return this.$store.state.purposes
    }
  },
  watch: {
    currentExpense(val) {
      if (val <= 0) {
        this.currentExpense = '';     // input number need to larger than 0
      }
    }
  },
  methods: {
    emitAdd: function(){
      if (this.currentExpense == '' || this.currentExpense == null) {
        this.$message.error('expense is required');
        return;
      }
      let payload = {
        id: Date.now(), // id uses current timestamp
        date: new Date(this.currentDate).toISOString().substring(0, 10),
        expense: this.currentExpense,
        purpose: this.purpose,
      }
      this.$emit('addExpense', payload);

      this.currentDate = new Date().toISOString().substring(0, 10);
      this.currentExpense = null;
      this.purpose = 1;
    }
  },
  mounted(){

  }
}
</script>

<style scoped>

.segment {
  padding: 20px 10px 20px 10px;
}
.block {
  padding: 5px 0px 5px 0px;
}
.expense {
  padding: 10px 0px 10px 0px;
}
.purpose {
  padding: 0px 0px 25px 0px;
}
.option {
  height: 100%;
}
.button {
  color: white;
  background-color: orange;
}

</style>
