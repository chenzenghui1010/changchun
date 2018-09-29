<template>
  <div class="main">
    <button @click="commit">{{btnText }}</button>
  </div>
</template>

<script>
  export  default{
    props:['btnText'],
    methods:{
      commit(){
        this.$emit('commit')
      }
    }
  }
  
</script>

<style scoped>
  .main{
    position: absolute;
    z-index: -1;
    margin-top: 14rem;
  }
  button {
    width: 90%;
    height: 3rem;
    margin: 8rem 5% 1rem;
    background: #64C6E7;
    border: 1px solid rgba(219, 223, 227, 0.30);
    box-shadow: 0 5px 12px 0 rgba(217, 226, 233, 0.50);
    border-radius: 0.3rem;
    outline: none;
    color: #fff;
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
  }
</style>
