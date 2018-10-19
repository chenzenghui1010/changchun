<template>
  <div class="user">
    <p>用户须知：</p>
    <div class="con">
      <p><span></span><span>欧亚汇集停车费为：6元/小时;</span></p>
      <p><span></span>使用欧亚汇集贵宾卡或店内消费可抵扣停车时长；</p>
      <p><span></span>缴费完成后请在20分钟内离场，超时将重新计费。</p>
    </div>
  </div>
</template>
<style scoped>
  .user {
    margin-top: 2.5rem;
    display: block;
    height: 11rem;
    border: 1px dotted  #646464;
    border-radius: 0.5rem;
    box-sizing: border-box;
    padding: 0rem 0 0 1rem;
  }
  .user .con{
    height: 6.3rem;
  }
 
  .user p span:nth-child(1) {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 0.1rem;
    color: #636363;;
    background: #636363;
    margin-right: 0.2rem;
  }
  
  .user p {
    
    color: #636363;
    line-height:2rem;
    display: flex;
    align-items: center;
  }
  span, .con>p{
    font-size: 1.2rem;
  }
  .user>p {
    margin-top: 1rem;
    color: #1B1C1C;
    font-size: 1.2rem;
  }

</style>
