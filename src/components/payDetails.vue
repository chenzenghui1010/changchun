<template>
  <div class="main">
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
              <p>{{newStartDate}}</p>
            </li>
            <li>
              <p><span></span><span>入场时间</span></p>
              <p>{{newStartTime}}</p></li>
            <li>
              <p><span></span><span>停车时长</span></p>
              <p>{{ stayTime}}</p>
            </li>
          </ul>
          
        </div>
        
        <div class="paydate">
          <p><span>需缴费</span><span>
            ￥12.00</span></p>
          <div class="tingche">
            <div>停车费：￥12.00</div>
            <div class="vip">
              <!--<P>贵宾卡抵扣：<span>-{{ vipIntegralDate }}小时</span></P>-->
              <P>积分抵扣：<span>-{{ integralDate }}小时</span></P>
            </div>
          </div>
        </div>
        <footer>
          <btn btnText="立即支付" @submit="pay"></btn>
        </footer>
      </content>
    </div>
    <p>缴费后请在20分钟内离场，超时将重新计费</p>
  </div>
</template>
<script>
  
  import {myGetTime, timestampToTime} from '../Time'
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import btn from './BtnBox'

  export default {
    
    components:{btn},
    data() {
      return {
        
        startTime: '2018-08-21 10：21',
        carNO: localStorage.getItem('carNo'),
        integralDate:0,
        countIntegral: 1400,
        remaining: 0
      }
    },
    mounted() {
      document.title='缴费停车'
    },
    watch: {
      select: function (val) {
        console.log(val);
      }
    },
    
    methods: {
      pay() {
        // Toast('加载中');
        localStorage.setItem('stayTime',this.stayTime)
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
      },
      newStartDate(){
         return  this.startTime.replace(/-/g,'/').slice(0,10)
      },
      newStartTime(){
      return this.startTime.slice(-5)
      },
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
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #F0EFF6;
    box-sizing: border-box;
    padding: 4% 2.5rem 0 2.5rem;
  }
  
  .main .content {
    box-shadow: 0 2px 14px 0 rgba(39, 52, 125, 0.10);
    border-radius: 1.5rem;
    background: url("../assets/bg_top.png")  #fff no-repeat top /100% 1.5rem;
  }
  
  content .paytitle {
    text-align: center;
    margin-top: 3rem;
  }
  
  content .paytitle p:first-child {
    margin-top: 1.5rem;
    font-size: 2.4rem;
    color: #000;
  }
  
  content .paytitle p:last-child {
    font-size: 1.8rem;
    color: #636363;
    letter-spacing: 0;
    margin: 2.5rem 0 3.5rem 0;
  }
  
  .details {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
  
  
    
  }
  .details:before  {
    content: '';
    position: absolute;
    width: 2rem;
    height: 4rem;
    bottom: -2rem;
    right: -1rem;
    transform: rotate(180deg);
    background: url("../assets/yuan.png")  no-repeat center/100% 100%;
  }
  
  .details:after {
    content: '';
    position: absolute;
    width: 2rem;
    height: 4rem;
    bottom: -2rem;
    left: -1rem;
    background: url("../assets/yuan.png")  no-repeat center/100% 100%;
  }
  
  .details ul {
    
    width: 88%;
    height: 8.75rem;
    box-sizing: border-box;
    padding: 2rem 6% 2.3rem 6%;
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1rem;
    
  }
  .details ul li p{
    display: flex;
    align-items: center;
  }
  .details ul li {
    line-height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  
  .details ul li p:last-child {
    font-size: 1.4rem;
    color: #4A4A4A;
    margin-top: 0.5rem;
  }
  
  .details ul li span:first-child {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    background: #4A90E2;
  }
  .details ul li span:last-child {
    color: #9B9B9B;
  }
  .paydate {
    height: 8rem;
    padding: 2rem 1.5rem 3.5rem 1.5rem;
    color: #636363;
  }
  
  .paydate > p {
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .paydate > p>span{
    display: block;
    font-size: 1.4rem;
  }
  .paydate > p > span:last-child {
    color: #63C8A9;
    font-size: 2.4rem;
    margin-left: 0.5rem;
  }
  
  .paydate .tingche {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin: 1.5rem 10% 0 10%;
    color: #636363;
  
  }
  
  .paydate .tingche .vip {
    text-align: right;
  }
  
  .tingche > div, .vip p {
    font-size: 1.2rem;
  }
  .paydate div p > span {
    color: #63C8A9;
    font-size: 1.2rem;
  }
  
  footer {
    padding: 0rem  0 1.5rem 0;
    width: 88%;
    border-top: 1px dashed #ccc;
    margin-left: 6%;
    align-content: space-around;
    
  }
  
  
  .main > p:last-child {
    margin-top: 0.5rem;
    text-align: center;
    color: #9B9B9B;
    font-size: 1rem;
  }
  
</style>

