<template>
  <div id="shoppingCar">
    <header class="title-wrap">
      <span class="line-v"></span>
      <span class="title">{{pageTitle}}</span>
      <span class="line-v"></span>
    </header>
    <TodoList/>
    <ShoppingCart
      :message="total"
      @change="changeCount">
      这里是shopping cart页面
      <br>
      已修改数量：{{total}}次
    </ShoppingCart>
  </div>
</template>

<script type="text/javascript">
  import ShoppingCart from './components/ShoppingCart'
  import TodoList from './components/TodoList'

  export default {
    name: 'app',
    props: ['pageTitle'],
    data(){
      return {
        total: 0
      }
    },
    components: {
      ShoppingCart,
      TodoList
      // ShoppingCart： {
      //   template: '<ShoppingCart/>',
      //   compoments: {ShoppingCart}
      // }
    },
    methods: {
      changeCount: function(){
        this.total += 1
      }
    }
  }
</script>
