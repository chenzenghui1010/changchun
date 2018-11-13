<template>
  <div class="main">
    <div class="payType">
      <div class="floor">
        <p><span :class="{detailsimg :  retCode==1}"></span>缴费{{details}}</p>
        <p>{{ detailsYu }}</p>
      </div>
      <div v-if="retCode !=1" class="fee"><span>￥</span>{{ fee}}</div>
    </div>
    
    
    <div v-if="retCode !=1" class="content">
      <text-box keyInfo="车牌号" :valueInfo="valueInfo"></text-box>
      <text-box keyInfo="停车时长" :valueInfo="stayTime"></text-box>
    </div>
    
    <div class="btn">
      <btn :btnText="btnText" @submit="confirm"></btn>
    </div>
    
    <div class="footer">
      <p v-if="retCode !=1"><span>免费离场时间</span> <span>{{ minutes }}分</span></p>
    </div>
  
  
  </div>
</template>


<script>
  import btn from './BtnBox'
  import getQueryString from '../globalhelper'
  import textBox from './textBox'
  
  export default {
    components: {btn, textBox},
    data() {
      return {
        details: '成功',
        detailsYu: '感谢您使用，祝您旅途愉快！',
        btnText: '确定',
        minutes: 20,
        retCode: 0,
        fee: '6.00',
        valueInfo: localStorage.getItem('carNo'),
        stayTime:localStorage.getItem('stayTime')
      }
    },
    mounted() {
      
      document.title = '车牌缴费'
      
      // let retCode = getQueryString('retCode')
      
      if (this.retCode == 0) {
      
      } else {
        this.details = '失败'
        this.detailsYu = '对您带来的不便，敬请谅解！'
        this.btnText = '重新支付'
      }
    },
    methods: {
      confirm() {
        
        if (this.retCode == 0) {
          
          let ua = navigator.userAgent.toLowerCase();
          
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            
            wx.closeWindow()
            // WeixinJSBridge.call('closeWindow');//微信
            
          } else if (ua.indexOf("alipay") != -1) {
            
            AlipayJSBridge.call('closeWebview')//支付宝
            
          }
        } else {
          
          this.$router.push({path: '/'})
        }
      },
    },
    computed: {
      // shoeDate: function () {
      //   return this.seconds == 0 && this.minutes == 0 ? false : true
      // }
    }
  }
</script>
<style scoped>
  
  .main {
    background: #fff;
  }
  
  .payType {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 19rem;
  }
  
  .floor {
    width: 15.6rem;
    height: 6rem;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  
  .floor P:first-child {
    font-size: 2.4rem;
    height: 3.35rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .floor > P:first-child span {
    display: inline-block;
    margin-right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background: url("../assets/success.png") no-repeat center/ 100% 100%;
  }
  
  .detailsimg {
    background: url("../assets/failure.png") no-repeat center/ 100% 100% !important;
  }
  
  .btn {
    bottom: 20rem;
    margin-top: 5rem;
    padding: 0 5%;
  }
  
  .fee {
    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    color: #63C8A9;
    margin: 3.5rem 0;
    
  }
  
  .floor > p:last-child {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #C2C6DA;
  }
  
  .footer {
    position: absolute;
    bottom: 2.5rem;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .footer p {
    display: flex;
    align-items: center;
  }

  .footer p span {
    display: inline-block;
    font-size: 1.4rem;
    color:  #4A4A4A;;
  }
  
  .footer p span:last-child {
    font-size: 1.8rem;
    color: #F5A623;
    margin-left: 1rem;
  }

</style>
