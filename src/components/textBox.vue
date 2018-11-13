<template>
  <div class="main">
    <content>
      <p>{{keyInfo }}</p>
      <p>{{valueInfo}}</p>
    </content>
  </div>
</template>
<script>
  export default {
    data(){
      return{
      
      }
    },
    props:['keyInfo','valueInfo'],
    
    
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    font-size: 10px;
    
  }
  
  content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    border-bottom: 0.1rem solid #dcdcdc;
    color: #dcdcdc;
    box-sizing: border-box;
    padding: 0 5%;
  
  }
  content p{
    font-size: 1.4rem;
    color: #9b9b9b;
  }
  content p:last-child{
    color: #636363;
  }
</style>
