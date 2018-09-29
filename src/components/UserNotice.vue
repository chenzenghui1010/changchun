<template>
  <div class="main">
    <p>用户须知：</p>
    <p><span></span><span>欧亚汇集停车费为：6元/小时;</span></p>
    <p><span></span>使用欧亚汇集贵宾卡或店内消费可抵扣停车时长；</p>
    <p><span></span>缴费完成后请在20分钟内离场，超时将重新计费。</p>
  </div>
</template>
<style scoped>
  .main {
    margin-left: 5%;
    width: 90%;
    height: 8rem;
    position: absolute;
    z-index: -1;
    margin-top: 26.5rem;
    border: 1px dashed #646464;
    border-radius: 0.5rem;
    box-sizing: border-box;
    padding: 0rem 0 0 1rem;
  }
  
  .main p span:nth-child(1) {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 0.1rem;
    color: #636363;;
    background: #636363;
    margin-right: 0.2rem;
  }
  
  .main p {
    color: #636363;
    line-height: 0.8rem;
    display: flex;
    align-items: center;
  }
  
  .main p:nth-child(1) {
    color: #1B1C1C;
    font-size: 1rem;
  }

</style>
