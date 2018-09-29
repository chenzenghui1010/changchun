<template>
  <div class="main">
    <header>
      <p><span></span>长春欧亚汇集</p>
      <p></p>
    </header>
    <div class="content">
      <div class="cartitle">
        <ul>
          <li v-for=" (item,index) in  carType" :class="{carType:activeIndex== 0 ,newcarType :activeIndex ==1}"
              @click="showColor(index)">{{
            item.cartype}}
          </li>
        </ul>
      </div>
      <div class="inputitem">
        <div v-for="(i,index) in count" v-bind:class="getchunkstyle(i - 1)" v-bind:key="i" @click="deleteCarNo">
          {{getLetter(i - 1) }}
        </div>
      </div>
      <div class="carlist">
        <ul>
          <li @click="selectCarNo(item,index)" v-for="(item,index)  in carNoList"
              :class="{licarnolist:carNoListIndex ===index }">{{ item }}<span v-show="showCarNoList"
                                                                              :class="{carnolist:carNoListIndex ===index }"></span>
          </li>
        </ul>
      </div>
    </div>
    <btn btnText="车牌缴费" @commit="commit"></btn>
    
    <carnokeyboard v-on:select="selectletter" v-on:delete="deleteletter" v-show="begininput"
                   v-bind:inputtype="inputtype"></carnokeyboard>
    
    <user-notice></user-notice>
  </div>
</template>
<script>
  import Carnokeyboard from "./keyboard.vue";
  import userNotice from './UserNotice'
  import btn from './BtnBox'
  import {Indicator} from 'mint-ui';
  
  import {Toast} from 'mint-ui';
  
  export default {
    name: 'CarNoInput',
    components: {Carnokeyboard, userNotice, btn},
    data() {
      return {
        carType: [{cartype: '普通车'}, {cartype: '新能源车'}],
        activeIndex: 0,
        
        
        carno: '',
        enable: false,
        begininput: true,//键盘
        count: 7,
        newresourcecar: false,
        inputindex: 0,
        parkCode: window.parkCode,
        url: location.href,
        show: false,
        alert: '',
        disabled: true,
        formData: {phone: "", code: '',},
        timer: null,
        
        
        specialCar: false,
        selectSpecial: false,
        specialCarNo: '',
        
        carNoList: ['沪A-211YH', '沪A-473YH', '沪A-453YH'],
        carNoListIndex: -1,
        showCarNoList: false,
        
      }
    },
    created() {
      document.title = '停车缴费'
      
      if (localStorage.getItem('carNo') == null) {
        
        this.carno = ''
        
      } else {
        
        this.carno = localStorage.getItem('carNo')
        
        this.begininput = false
        
        this.disabled = false
      }
    },
    mounted() {
      
      if (!(this.carno == '' || this.carno == null)) {
        
        this.begininput = false
        
        this.inputindex = 7
      }
      
      if (localStorage.getItem('carNo') == null) {
        
        this.carno = ''
        
      } else {
        
        this.carno = localStorage.getItem('carNo')
        
        this.begininput = false
        
        this.disabled = false
      }
      
    },
    watch: {
      
      begininput: function (val) {
        
        if (val) {
          
          this.begininput = !this.showCarNoList
        }
      },
      activeIndex: function (val) {
        
        if (val == 1) {
          
          this.count = 8;
          
        } else {
          
          this.count = 7
          
        }
        
      },
      
      
      carno: function (newvalue) {
        
        if (this.count == 7) {
          
          newvalue.length == 7 ? this.disabled = false : this.disabled = true
          
        } else if (this.count == 8) {
          
          newvalue.length == 8 ? this.disabled = false : this.disabled = true
        }
        
        this.enable = newvalue.length > 6
        
        this.newValue == 7 ? this.disabled = false : this.disabled = true
      },
      
      newresourcecar: function (newvalue) {
        
        this.count = this.newresourcecar ? 8 : 7
      },
      
      specialCarNo: function (val) {
        
        this.specialCarNo = val.toUpperCase()
        
        val.trim().length > 5 ? this.enable = true : this.enable = false
        
        val.trim().length > 5 ? this.disabled = false : this.disabled = true
      }
    },
    methods: {
      commit() {
        
        Toast('加载中');
        
        this.$router.push({path: 'PayDetails'})
        // Indicator.open({
        //   text: '加载中',
        //   spinnerType: 'fading-circle'
        // });
        console.log(this.carno);
        
      },
      selectCarNo(val, index) {
        
        this.showCarNoList = !this.showCarNoList
        
        if (this.showCarNoList) {
          
          this.carNoListIndex = index
          
          let newcarNo = val.replace('-', '')
          
          this.carno = newcarNo
          
          this.begininput = false
          
        } else {
          
          this.carno = ''
          
          this.carNoListIndex = -1
          
          this.begininput = true
          
          this.inputindex = 0
        }
        
      },
      
      showColor(index) {
        
        this.activeIndex = index
      },
      
      deleteCarNo() {
        
        this.begininput = true
      },
      
      getLetter(index) {
        
        if (index >= this.carno.length) {
          
          return ''
        }
        
        return this.carno[index]
      },
      getchunkstyle(index) {
        
        if (this.count == 8) {
          
          
          return 'chunk greencolor'
          
          
        }
        else {
          
          return 'chunk noe'
        }
      },
      deleteletter() {
        
        this.inputindex = Math.max(0, this.inputindex - 1)
        
        this.carno = this.carno.substr(0, this.inputindex)
      },
      selectletter: function (value) {
        
        
        if (this.count == 7) {
          
          if (this.carno.length == 7) {
            
            return
          }
        }
        if (this.count == 8) {
          
          if (this.carno.length == 8) {
            
            return
          }
        }
        this.carno = this.carno + value
        
        this.inputindex += 1
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
      
      inputtype: function () {
        
        if (this.inputindex == 0) {
          
          return 0
        }
        
        if (this.inputindex == 1) {
          
          return 2
        }
        
        
        if (this.activeIndex == 0) {
          
          if (this.inputindex == 6) {
            
            return 3
          }
          
          if (this.inputindex == 7) {
            
            this.enable = true
            
            this.disabled = false
            
            this.begininput = false
          }
        }
        
        if (this.activeIndex == 1) {
          
          if (this.inputindex == 7) {
            
            this.enable = false
            
            this.disabled = true
            
            this.begininput = true
            
            return 3
          }
          
          if (this.inputindex == 8) {
            
            this.enable = true
            
            this.disabled = false
            
            this.begininput = false
            
          }
        }
        return 2
      },
    },
    
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
    bottom: 0;
    right: 0;
    left: 0;
    background: #F0EFF6;
  }
  
  header {
    box-sizing: border-box;
    padding: 0 5%;
    width: 100%;
    height: 14rem;
    background: #64C6E7;
    font-size: 1.2rem;
    color: #fff;
    display: flex;
    justify-content: space-between;
  }
  
  header p {
    margin-top: 3rem;
  }
  
  header p:nth-child(1) {
    margin-top: 3.5rem;
  }
  
  header p:nth-child(1) span {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: #fff;
    margin-right: 1rem;
  }
  
  header p:nth-child(2) {
    width: 9rem;
    height: 3rem;
    background: url("../assets/car.png") no-repeat center/ 9rem 3rem;
  }
  
  .content {
    position: absolute;
    top: 6rem;
    margin-left: 5%;
    width: 90%;
    height: 15rem;
    background: rgba(255, 255, 255, 0.90);
    box-shadow: 0 2px 14px 0 rgba(39, 52, 125, 0.10);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0 5%;
  }
  
  .cartitle {
    margin: 2rem 15%;
    height: 2.5rem;
    border-radius: 0.2rem;
    width: 70%;
  }
  
  .cartitle ul {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
  }
  
  .cartitle ul li {
    width: 50%;
    line-height: 2.5rem;
    text-align: center;
    font-size: 1rem;
    letter-spacing: 0.2rem;
    
  }
  
  .inputitem {
    box-sizing: border-box;
    height: 3rem;
    width: 100%;
    background-color: white;
    display: flex;
    display: -webkit-flex;
  }
  
  .chunk {
    border: 1px solid #C2C6DA;
    width: 50px;
    border-left: 0px;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: center;
    color: black;
    line-height: 3rem;
    font-size: 1.2rem;
    font-family: "Microsoft Yahei", "Arial", "Helvetica";
  }
  
  .noe:first-child {
    border: 1px solid #C2C6DA;
  }
  
  .greencolor {
    color: #63C8A9;
    border: 1px solid #63C8A9;
  }
  
  .greencolor:not(:last-child) {
    border-right: none;
  }
  
  .enable {
    background-color: #1C8AFA;
    color: white;
    font-size: 1.2rem;
  }
  
  .carlist ul {
    width: 100%;
    margin-top: 1.8rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
  
  .carlist ul li {
    box-sizing: border-box;
    width: 5rem;
    border: 1px dashed #979797;
    height: 2rem;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 0.8rem;
    color: #636363;
    position: relative;
  }
  
  .carlist ul li span.carnolist {
    display: inline-block;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: -0.8rem;
    right: -0.8rem;
    border: none;
    background: url("../assets/carnoselect.png") no-repeat center/1.5rem 1.5rem;
  }
  
  .licarnolist {
    border: none !important;
    background: #E6E6E6;
  }
  
  .carType {
    border: 1px solid #1C75BC;
    color: #1C75BC;
    border-radius: 0 0.5rem 0.5rem 0;
  }
  
  .carType:first-child {
    background: #1C75BC;
    color: #fff;
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  .newcarType {
    border: 1px solid #63C8A9;
    color: #63C8A9;
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  .newcarType:last-child {
    background: #63C8A9;
    color: #fff;
    border-radius: 0 0.5rem 0.5rem 0;
  }
</style>
