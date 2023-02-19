<template>
  <div class="header-box">
    <div class="left">
      <img src="http://116.62.41.65:7804/assets/logo.e85dccb1.png" alt="">
    </div>
    <div class="right">
      <Navbar></Navbar>
    </div>
  </div>
</template>

<script>
import Navbar from '../Navbar.vue';
export default {
  name: '',
  components: {
    Navbar
  },
  data () {
    return {
    }
  },
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
.header-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0 0px 0;

  .left {
    margin-left: 15px;
  }

  .right {
    width: 30%;
  }
}
</style>
