<template>
  <div class="main">
    <div class="isshowkey" v-if="begininput" @click="isShowKey"></div>
    <div class="top"></div>
    
    <div class="con">
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
        <div class="inputitem" @click="showKey">
          <div v-for="(i,index) in count"
               v-bind:class="getchunkstyle(i - 1)"
               v-bind:key="i"
               @click="deleteCarNo">
            {{getLetter(i - 1) }}
          </div>
        </div>
        <div class="carlist">
          <ul>
            <li @click="selectCarNo(item,index)" v-for="(item,index)  in list"
                :class="{licarnolist:carNoListIndex ===index }">{{ item }}
              <span v-show="showCarNoList"
                    :class="{carnolist:carNoListIndex ===index }">
              </span>
            </li>
          </ul>
        </div>
      </div>
      <button @click="commit">车牌缴费</button>
      <user-notice></user-notice>
    </div>
    
    <carnokeyboard v-on:select="selectletter"
                   v-on:delete="deleteletter"
                   v-show="begininput"
                   v-bind:inputtype="inputtype">
    
    </carnokeyboard>
  </div>
</template>
<script>
  import Carnokeyboard from "./keyboard.vue";
  import userNotice from './UserNotice'
  import {Indicator} from 'mint-ui';
  
  import {Toast} from 'mint-ui';
  
  export default {
    name: 'CarNoInput',
    components: {Carnokeyboard, userNotice},
    data() {
      return {
        carType: [{cartype: '普通车'}, {cartype: '新能源车'}],
        activeIndex: 0,
        
        
        carno: '',
        enable: false,
        begininput: false,//键盘
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
        
        carNoList: [],
        carNoListIndex: -1,
        showCarNoList: false,
        
      }
    },
    created() {
      
      // localStorage.removeItem('carNoList')
      // localStorage.removeItem('carNo')
      
      document.title = '停车缴费'
      
      if (localStorage.getItem('carNo') == null) {
        
        this.carno = ''
        
      } else {
        
        localStorage.getItem('carNo').length == 8 ? this.activeIndex = 1 : this.activeIndex = 0
        
        this.carno = localStorage.getItem('carNo')
        
        this.begininput = false
        
        this.disabled = false
      }
    },
    mounted() {
      
      if (!(this.carno == '' || this.carno == null)) {
        
        
        this.inputindex = 7
      }
      
      if (localStorage.getItem('carNo') == null) {
        
        this.carno = ''
        
        
      } else {
        
        this.carno = localStorage.getItem('carNo')
        
        
        this.disabled = false
      }
      
    },
    watch: {
 
      activeIndex: function (val) {
        
        if (val == 1) {
          
          this.count = 8;
          
        } else {
          
          this.count = 7
          
        }
        
      },
      
      
      carno: function (newvalue) {
        
        if ((this.count == 7 && newvalue.length == 7) || (this.count == 8 && newvalue.length == 8)) {
          
          this.begininput = false
          
        } else {
          
          this.carNoListIndex = -1
          
          this.showCarNoList = false
        }
        
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
      
      showKey() {
        
        this.begininput = true
        
      },
      isShowKey() {
        
        this.begininput = false
        
      },
      commit() {
        if ((this.carno.length != 7 && this.activeIndex == 0) || (this.carno.length != 8 && this.activeIndex == 1)) {
          
          Toast('车牌格式输入有误');
          
          return
        }
        
        // Toast('加载中');
        
        if (localStorage.getItem('carNoList') != null) {
          
          this.carNoList = localStorage.getItem('carNoList').split(',')
        }
        
        localStorage.setItem('carNo', this.carno)
  
  
        if (!this.carNoList.includes(this.carno)) {
          
          this.carNoList.push(this.carno)
          
        }
        
        console.log(this.carNoList);
        
        localStorage.setItem('carNoList', this.carNoList)
        
        console.log(localStorage.getItem('carNoList').split(','));
        // Indicator.open({
        //   text: '加载中',
        //   spinnerType: 'fading-circle'
        // });
        //
        // console.log(this.carno);
        this.$router.push({path: 'PayDetails'})
      },
      selectCarNo(val, index) {
        
        if (val.length == 8) {
          
          this.showCarNoList = true
          
          this.activeIndex = 1
          
          this.begininput = false
          
          this.inputindex = 8
          
        } else {
          this.inputindex = 7
          this.activeIndex = 0
        }
        
        this.begininput = false
        
        this.showCarNoList = true
    
        this.carno = val
        
        this.carNoListIndex = index
        
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
        
        console.log(this.inputindex);
        
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
      
      list() {
        
        if (localStorage.getItem('carNoList') != null) {
          
          let arr = localStorage.getItem('carNoList').split(',')
          
          return  Array.from(new Set (arr.length > 3 ? arr.slice(-3) : arr))
        }
        return []
        
      },
      
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
    font-size: 10px;
  }
  
  .isshowkey {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    z-index: 3;
  }
  
  .main {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #F0EFF6;
    display: flex;
    justify-content: center;
  }
  
  .top {
    width: 100%;
    height: 17.5rem;
    background: #64C6E7;
  }
  
  .con {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 92%;
    margin-top: 2.5rem;
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  header p:first-child {
    font-size: 1.8rem;
    color: #fff;
  }
  
  header p:last-child {
  
  }
  
  header p:nth-child(1) span {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #fff;
    margin-right: 1rem;
  }
  
  header p:nth-child(2) {
    width: 12.5rem;
    height: 5rem;
    background: url("../assets/car.png") no-repeat center/ 100% 100%;
  }
  
  .content {
    box-sizing: border-box;
    padding: 2.5rem 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.90);
    box-shadow: 0 2px 14px 0 rgba(39, 52, 125, 0.10);
    border-radius: 0.5rem;
  }
  
  .cartitle {
    margin: 0rem 0 2rem 0;
    text-align: center;
    border-radius: 0.2rem;
    height: 3.5rem;
  }
  
  .cartitle ul {
    width: 18rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    margin: 0 auto;
  }
  
  .cartitle ul li {
    box-sizing: border-box;
    width: 9rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.2rem;
  }
  
  .inputitem {
    box-sizing: border-box;
    padding: 0 1.5rem;
    box-sizing: border-box;
    height: 4.3rem;
    width: 100%;
    display: flex;
    display: -webkit-flex;
  }
  
  .chunk {
    width: 3.5rem;
    border: 0.05rem solid #646464;
    border-left: 0px;
    height: 4.2rem;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: center;
    color: #1b1c1c;
    line-height: 4.2rem;
    font-size: 1.8rem;
    font-family: "Microsoft Yahei", "Arial", "Helvetica";
  }
  
  .noe:first-child {
    border: 0.05rem solid #646464;
  }
  
  .greencolor {
    color: #63C8A9;
    border: 0.05rem solid #63C8A9;
  }
  
  .greencolor:not(:last-child) {
    border-right: none;
  }
  
  .enable {
    background-color: #1C8AFA;
    color: white;
    font-size: 1.2rem;
  }
  
  .carlist {
    box-sizing: border-box;
    padding: 0 2.5rem;
    margin-top: 2.5rem;
    height: 2.5rem;
    width: 100%;
    display: block;
  }
  
  .carlist ul {
    display: flex;
    display: -webkit-flex;
  }
  
  .carlist ul li:nth-child(1),
  .carlist ul li:nth-child(2) {
    margin-right: 1.5rem;
  }
  
  .carlist ul li {
    position: relative;
    box-sizing: border-box;
    width: 8.9rem;
    border: 1px dotted #979797;
    height: 2.5rem;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    font-size: 1.2rem;
    color: #636363;
  }
  
  .carlist ul li span.carnolist {
    display: inline-block;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: -0.75rem;
    right: -0.75rem;
    border: none;
    background: url("../assets/carnoselect.png") no-repeat center/1.5rem 1.5rem;
  }
  
  .licarnolist {
    border: none !important;
    background: #E6E6E6;
  }
  
  .carType {
    border: 0.05rem solid #1C75BC;
    color: #1C75BC;
    border-radius: 0 0.5rem 0.5rem 0;
  }
  
  .carType:first-child {
    background: #1C75BC;
    color: #fff;
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  .newcarType {
    border: 0.05rem solid #63C8A9;
    color: #63C8A9;
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  .newcarType:last-child {
    background: #63C8A9;
    color: #fff;
    border-radius: 0 0.5rem 0.5rem 0;
  }
  
  button {
    margin-top: 1.5rem;
    height: 4.5rem;
    width: 100%;
    background: #64C6E7;
    border: none;
    box-shadow: 0 5px 12px 0 rgba(217, 226, 233, .5);
    border-radius: 0.5rem;
    outline: none;
    color: #fff;
    font-size: 1.6rem;
    letter-spacing: 0.1rem;
  }
</style>
