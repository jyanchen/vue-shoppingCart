<template>
  <form>
    <slot>
      slot - 内容分发
      当组件被调用时，标签内没有任何内容，显示默认内容
    </slot>
    <table class="detial-wrap">
      <tr>
        <th>商品信息({{message}})</th>
        <th>商品金额</th>
        <th>商品数量</th>
        <th>总金额</th>
        <th>编辑</th>
      </tr>
      <tr v-for="item in cartList">
        <td class="goods-detial-wrap">
          <div class="checkbox-wrap left">
            <span class="checkbox" :class="{'checked': item.checked}" @click="selectItem(item)"></span>
          </div>
          <div class="goods-detial right">
            <div class="good-img left"><img :src="item.imgPic"/></div>
            <div class="good-text left">
              <div class="name">{{item.name}}</div>
              <dl class="gifts">
                <dt>赠送：</dt>
                <dd>{{item.gifts}}</dd>
              </dl>
            </div>
          </div>
        </td>
        <td class="unitprice">{{item.price | round}}</td>
        <td class="buy-num">
          <div class="choosenum-handler">
            <i class="icon-minus" @click="minus(item)"></i>
            <span class="countbox">{{item.count}}</span>
            <i class="icon-plus" @click="plus(item)"></i>
          </div>
          <div class="stock onsell"></div>
        </td>
        <td class="amount">{{item.price * item.count | round}}</td>
        <td class="icon icon-delete" @click="delItem(item)"></td>
      </tr>
    </table>
    <footer class="checkout-wrap">
      <div class="total-check-wrap left">
        <div class="checkbox-wrap left">
          <span class="checkbox" :class="{'checked': checkAllItem}" @click="onCheckAllItem(true)"></span>
        </div>
        <div class="check-text">
          <span class="checked-all" @click="onCheckAllItem(true)">全选</span>
          <span class="unchecked-all" @click="onCheckAllItem(false)">取消全选</span>
        </div>
      </div>
      <div class="checkout right">
        <div class="total-money"><span class="name">总金额 :</span><span class="amount">{{getTotalMount() | round}}元</span></div>
        <input type="submit" value="结账" class="danger"/>
      </div>
    </footer>
  </form>
</template>

<script type="text/javascript">
  export default {
    name: 'ShoppingCart',
    props: ['message'],
    data(){
      return {
        cartList: [],
        checkAll: false
      }
    },
    computed: {
      checkAllItem() {
        let checkList = this.cartList.filter((value, index) => {
          if (typeof(value.checked) == 'undefined') {
            return true
          }

          if (value.checked == false) {
            return true
          }

          return false
        })

        if (checkList.length || !this.cartList.length) {
          this.checkAll = false
          return false
        } else {
          this.checkAll = true
          return true
        }
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.getDataList()
      })
    },
    filters: {
      round(value) {
        return value.toFixed(2)
      }
    },
    methods: {
      getDataList() {
        this.$http.get('../../static/resource/cart.json').then((res) => {
          this.cartList = res.body.result
        })
      },
      minus(item) {
        if (item.count > 1) {
          item.count--
        } else {
          item.count = 1
        }
        this.$emit('change')
      },
      plus(item) {
        item.count++
        this.$emit('change')
      },
      getTotalMount() {
        let sum = 0

        this.cartList.forEach((value, index) => {
          sum += value.count*value.price
        })

        return sum
      },
      selectItem(item) {
        if (typeof(item.checked) == 'undefined') {
          this.$set(item, 'checked', true)
        } else {
          item.checked = !item.checked
        }
      },
      onCheckAllItem(type) {
        let _this = this

        _this.cartList.forEach((value, index) => {
          if (typeof(value.checked) == 'undefined') {
            _this.$set(value, 'checked', type)
          } else {
            if (!type) {
              value.checked = false
            } else {
              value.checked = !_this.checkAll
            }
          }
        })
      },
      delItem(item) {
        this.cartList.splice(this.cartList.indexOf(item), 1)
      }
    }
  }
</script>
