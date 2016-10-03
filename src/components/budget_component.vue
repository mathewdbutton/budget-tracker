<template>

<tr>
  <td>Day {{index+1}}</td>
   <td>Amount: {{amount}} </td>
   <td>{{dailyAllowance | round}}</td>
   <td><input type="number" v-model="spent"></td>
   <td>??</td>
   <td>{{savedToday | round}}</td>
 </tr>

</template>


<script>

export default {
  props:["day","index","totalDays"],
 data:function(){
  return{
    spent:0
  }
 },
 computed:{
   dailyAllowance:function(){
      return this.day.amount/(this.totalDays-this.index)
   },
   amount: function(){
     return this.day.amount - this.spent
   },
   savedToday: function(){
     return this.dailyAllowance - this.spent
   }
 },
 watch:{
   spent:function(){
     //insert VUEX stuff here
    //  this.$parent.budgetItems[this.index].spent = this.spent
   }
 }

};
</script>
