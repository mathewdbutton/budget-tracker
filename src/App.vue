<template>
  <div class="row">
  <div>
  Number of Days :<input type="number" v-model.number="days"/>
  </div>
  <div>
  Total Budget :<input type="number" v-model.number="total_budget" />
  </div>
  <div>
  <button type="button" class="small button" @click="addDay">Day {{budgetItems.length+1}}</button>
  </div>
  <template v-if="days !== ''">
    <table>
      <thead>
      <tr>
         <th>Index</th>
         <th>Amount</th>
         <th>Daily Limit</th>
         <th>Spent</th>
         <th>Savings</th>
         <th>Saving Per Day</th>
      </tr>
      </thead>
      <tbody>
          <tr is="budget-item" :day="day" :total-days="days" :index="index" v-for="(day, index) in budgetItems" ></tr>
      </tbody>
    </table>
  </template>
      </div>
</template>

<script>

import Vue from 'vue'
import BudgetItem from './components/budget_component'
export default {
  data: function(){
    return{
      days: 0,
      total_budget: 0,
      budgetItems:[]
    }
  },
  components:{
    "budget-item":BudgetItem
  },
  computed:{
    budgetItem:function(){
      return {amount:this.total_budget}
    }
  },
  watch:{
    total_budget:function(){
      for(var i = 0;i < this.budgetItems.length;i++)
      {
        this.$set(this.budgetItems, i, this.budgetItem)
      }
    },
    days:function(){
      if(this.days > this.budgetItems.length)
      {
        this.budgetItems.splice(this.budgetItems.length+(this.days-this.budgetItems.length))
        for(var i = this.budgetItems.length; i < this.budgetItems.length+(this.days-this.budgetItems.length);i++)
        {
          this.$set(this.budgetItems, i, this.budgetItem)
        }
      }
      else {
        this.budgetItems.splice(this.days)
      }
    }
  },
  methods: {
    addDay: function() {
      this.budgetItems.push(this.budgetItem)
      this.days++;
    }
  }
};



</script>
