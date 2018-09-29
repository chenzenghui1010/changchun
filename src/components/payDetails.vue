<template>
  <div class="main">
    <header></header>
    <div class="content">
      
      <content>
        <div class="paytitle">
          <p>长春欧亚汇集</p>
          <p>{{carNO}}</p>
        </div>
        <div class="details">
          <ul>
            <li>
              <p><span></span><span>入场日期</span></p>
              <p>{{startTime}}</p>
            </li>
            <li>
              <p><span></span><span>入场时间</span></p>
              <p>{{outTime}}</p></li>
            <li>
              <p><span></span><span>停车时长</span></p>
              <p>{{ stayTime}}</p>
            </li>
          </ul>
        </div>
        
        <div class="paydate">
          <p>需 缴 费<span> ￥12.00</span></p>
          <div class="tingche">
            <div>停车费：￥12.00</div>
            <div class="vip">
              <P>贵宾卡抵扣：<span>-{{ vipIntegralDate }}小时</span></P>
              <P>消费抵扣：<span>-{{ integralDate }}小时</span></P>
            </div>
          
          </div>
        
        </div>
      </content>
      <footer>
        <!--<p @click="selectIntegral"><span :class="{jifen:select}"></span>积分抵扣（小时）</p>-->
        <!--<p>500积分抵扣1小时,共{{countIntegral}}积分,<span v-if="countIntegral >= 500">抵用后剩余{{remainingIntegral }}积分</span><span class="red" v-if="countIntegral<500">积分不够无法抵扣</span></p>-->
        <button @click="commitPay">立即支付</button>
      </footer>
    </div>
    <p>缴费后请在20分钟内离场，超时将重新计费</p>
  </div>
</template>
<script>
  
  import {myGetTime, timestampToTime} from '../Time'
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  
  export default {
    data() {
      return {
        
        startTime: '2018/08/21',
        outTime: '10：21',
        carNO: '沪A8888',
        vipIntegralDate: 0,
        integralDate:0,
        countIntegral
    :
      1400,
        remaining
    :
      0
    }
    },
    mounted() {
    
    },
    watch: {
      select: function (val) {
        console.log(val);
      }
    },
    
    methods: {
      commitPay() {
        Toast('加载中');
        this.$router.push({path: 'paySuccess'})
        // Indicator.open({
        //   text: '加载中',
        //   spinnerType: 'fading-circle'
        // });
      },
      selectIntegral() {
        if (!this.select) {
          Toast('积分不足，无法抵扣')
        }
      },
      Toast(val) {
        Toast({
          message: val,
          position: 'middle',
          duration: 2000
        });
      }
    },
    computed: {
      
      stayTime() {
        return myGetTime('2018-02-02 10:25', '2018-02-03 10:11')
      }
      
      // remainingIntegral() {
      //
      //   return this.countIntegral >= 500 ? this.countIntegral % 500 : this.countIntegral
      // },
      // select() {
      //
      //   return this.countIntegral >= 500 ? true : false
      //
      // },
      // integralDate(){
      //
      //   return    Math.floor( this.countIntegral / 500)
      // }
    }
  }
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  
  .main {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #F0EFF6;
    box-sizing: border-box;
    padding: 4% 5% 0 5%;
  }
  
  .main .content {
    background: #fff;
    box-shadow: 0 2px 14px 0 rgba(39, 52, 125, 0.10);
    border-radius: 0rem 0rem 1rem 1rem;
    
  }
  
  content {
    box-sizing: border-box;
    padding: 3%;
  }
  
  header {
    
    width: 100%;
    height: 4%;
    background: url("../assets/bg_top.png") no-repeat top /100% 100%;
  }
  
  content .paytitle {
    text-align: center;
    
  }
  
  content .paytitle p:first-child {
    font-family: PingFangSC-Regular;
    font-size: 1.2rem;
    color: #000;
  }
  
  content .paytitle p:last-child {
    font-family: PingFangSC-Regular;
    font-size: 0.9rem;
    color: #636363;
    letter-spacing: 0;
    margin: 1.2rem 0 1.7rem 0;
  }
  
  .details {
    width: 90%;
    margin: 0 auto;
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    
  }
  
  .content:before {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 2%;
    top: 14.8rem;
    border-radius: 50%;
    background: #F0EFF6;
  }
  
  .content:after {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 2%;
    border-radius: 50%;
    top: 14.8rem;
    background: #F0EFF6;
  }
  
  .details ul {
    height: 4.5rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-content: space-between;
    padding: 1rem 0;
  }
  
  .details ul li {
    line-height: 2rem;
    text-align: center;
  }
  
  .details ul li p:last-child {
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #4A4A4A;
  }
  
  .details ul li span:first-child {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #4A90E2;
    margin-right: 0.2rem;
  }
  .details ul li span:last-child {
    color: #9B9B9B;
  }
  .paydate {
    height: 4rem;
    text-align: center;
    width: 90%;
    padding: 1rem 0 2rem 0;
    margin: 0rem 5%;
    color: #636363;
  }
  
  .paydate > p {
    font-size: 1rem;
  }
  
  .paydate > p > span {
    color: #63C8A9;
    font-size: 1.4rem;
  }
  
  .paydate .tingche {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin: 1rem 10% 0 10%;
    color: #636363;
  }
  
  .paydate .tingche .vip {
    text-align: right;
  }
  
  .paydate .tingche .vip p:last-child {
    margin-top: 0.5rem;
  }
  
  .paydate div p > span {
    color: #63C8A9;
  }
  
  footer {
    padding: 4rem 0 1rem;
    width: 90%;
    border-top: 1px dashed #ccc;
    margin-left: 5%;
    align-content: space-around;
    
  }
  
  footer p {
    display: flex;
    font-size: 0.8rem;
  }
  
  footer p:first-child span {
    display: inline-block;
    width: 0.9rem;
    height: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  
  footer p:nth-child(2) {
    color: #ccc;
    font-size: 0.7rem;
    margin: 0.5rem 0 1rem 1.5rem;
  }
  
  footer p:last-child span:last-child {
    color: red;
  }
  
  button {
    width: 100%;
    height: 3rem;
    border: none;
    background: #64C6E7;
    box-shadow: 0 5px 12px 0 rgba(217, 226, 233, 0.50);
    border-radius: 0.3rem;
    color: #fff;
    font-size: 1.2rem;
    outline: none;
  }
  
  .main > p:last-child {
    margin-top: 0.5rem;
    text-align: center;
    color: #9B9B9B;
    font-size: 0.7rem;
  }
  
  /*.jifen {*/
  /*border: none !important;*/
  /*background: #63C8A9;*/
  /*}*/
  /*.red{*/
  /*color: orangered;*/
  /*}*/
</style>

