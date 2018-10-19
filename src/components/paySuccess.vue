<template>
  <div class="main">
    <div class="floor">
      <p><span :class="{detailsimg :  detailsType==1}"></span>缴费{{details}}</p>
      <p>{{ detailsYu }}</p>
    </div>
    <div>
      <p v-if=" detailsType !=1" class="date">免费离场剩余时间 <span>{{ minutes }}分{{ seconds }}秒</span>
        <!--<span v-if="!shoeDate">你已超时</span>-->
      </p>
    </div>
    
    <button v-text='btnText'></button>
  </div>
</template>


<script>
  
  export default {
    data() {
      return {
        details: '成功',
        detailsYu: '感谢您使用，祝您旅途愉快！',
        btnText: '确定',
        minutes: 20,
        seconds: 59,
        detailsType: 2
      }
    },
    mounted() {
      // this.add();
      if (this.detailsType == 1) {
        this.details = '失败'
        this.detailsYu = '对您带来的不便，敬请谅解！'
        this.btnText = '重新支付'
      }
      
      
    },
    methods: {
      add: function () {
        
        const time = window.setInterval(() => {
          
          if (this.minutes != 0 && this.seconds == 1) {
            
            this.minutes -= 1
            
            this.seconds = 59
            
          } else if (this.minutes == 0 && this.seconds == 0) {
            
            this.seconds = 0
            
            window.clearInterval(time)
            // return
            
          } else {
            
            this.seconds -= 1
          }
          
        }, 1000)
        //销毁
        this.$once('hooK:beforeDestroy', () => {
          
          clearInterval(time)
          
        })
      }
    },
    computed: {
      shoeDate: function () {
        return this.seconds == 0 && this.minutes == 0 ? false : true
      }
    }
  }
</script>
<style scoped>
  
  .main {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .floor {
    width: 15.6rem;
    height: 6rem;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .main > .floor > P:first-child {
    font-size: 2.4rem;
    height: 3.35rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .main > .floor > P:first-child span {
    display: inline-block;
    margin-right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background: url("../assets/success.png") no-repeat center/ 100% 100%;
  }
  
  .detailsimg {
    background: url("../assets/failure.png") no-repeat center/ 100% 100% !important;
  }
  
  .main > .floor > p:last-child {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #C2C6DA;
  }
  .main > div:nth-child(2) {
    height: 17.5rem;
    line-height: 17.5rem;
  }
  .main > div > .date {
   
    font-size: 1.4rem;
  }
  
  .main > div > .date span {
    font-size: 1.8rem;
    color: #F5A623;
  }
  
  .main > p:last-child {
    position: fixed;
    justify-content: center;
  }
  
  button {
    width: 90%;
    height: 4.5rem;
    border: none;
    background: #64C6E7;
    box-shadow: 0 5px 12px 0 rgba(217, 226, 233, 0.50);
    border-radius: 0.5rem;
    color: #fff;
    font-size: 1.6rem;
    outline: none;
  }


</style>
