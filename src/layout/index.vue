<template>
  <div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <Headers></Headers>
    <div class="cnt">

      <div class="mask" v-if="drawer" :style="`left:${!this.sidebar.opened ? '68px' : '16%'}`"></div>

      <div class="left-menu" :style="`width:${!this.sidebar.opened ? '68px' : '16%'}`">
        <!-- 功能快速入口 -->
        <div class="entrance" @click="toggleDwawer" @mouseenter="showIcon" @mouseleave="hideIcon">
          <span class="entrance-img"><img src="../assets/images/titleImg.png" alt=""></span>
          <span v-if="this.sidebar.opened" style="margin-right:20px">功能快速入口</span>
          <span v-if="this.sidebar.opened">
            <svg-icon :icon-class="entranceIcon" class-name="right-arrow"></svg-icon>
          </span>
          <span v-if="this.sidebar.opened" class="bdr"></span>
        </div>

        <!-- tips -->
        <div class="tips">
          <template v-if="this.sidebar.opened">
            在功能菜单中收藏的功能将在 <br> 下面展示
          </template>
          <template v-else>
            收藏
          </template>
        </div>

        <!-- 菜单列表 -->
        <div class="menus-list">
          <!-- 菜单列表 -->

          <sidebar />


          <!-- 收起 -->
          <div :class="{ 'toggle-menu': true, 'Cor': shouqiIcon == 'shouqi2' }" @click="toggleSider"
            @mouseenter="toggleShou1" @mouseleave="toggleShou2">
            <template v-if="sidebar.opened">
              <svg-icon :icon-class="shouqiIcon" class-name="shouqi-arrow"></svg-icon>
              &ensp;收起
            </template>
            <template v-if="!sidebar.opened">
              <svg-icon :icon-class="shouqiIcon" class-name="shouqi-arrow1"></svg-icon>
            </template>
          </div>
        </div>
      </div>

      <!-- 菜单抽屉 -->
      <div class="menu-drawer" v-if="drawer" :style="`left:${!this.sidebar.opened ? '68px' : '16%'}`">
        <!-- 菜单列表 -->
        <div class="menu-box">
          <!-- 头部 -->
          <div class="menu-head">

          </div>
          <!-- 菜单列表 -->
          <div class="menu-list">

            <div class="menu-item" v-for="item, index in sidebarRouters" :key="index" v-if="item.meta">
              <!-- 1级菜单 -->
              <p style=" font-weight: 700;">
                {{ item.meta.title }}
              </p>
              <!-- 2级菜单 -->
              <div class="level-2-menu" v-for="child, idx in item.children" :key="idx"
                @click="$router.push(`${item.path}/${child.path}`)">
                <p style="margin-right:5px"> {{ child.meta.title }}</p>
                <p @click.stop="collection(child.path)">
                  <svg-icon v-if="currentCollection.indexOf(child.path) == -1" icon-class="xingxing1"></svg-icon>
                  <svg-icon v-else icon-class="xingxing"></svg-icon>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="right-container" :style="`width:${!this.sidebar.opened ? '' : '84%'}`">
        <tags-view v-if="needTagsView" />
        <app-main />
      </div>

      <!-- <div :class="{ hasTagsView: needTagsView, sidebarHide: false }" class="main-container hasTagsView">
                                                                                    <div :class="{ 'fixed-header': fixedHeader }">
                                                                                      <navbar />
                                                                                      <tags-view v-if="needTagsView" />
                                                                                    </div>
                                                                                    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
                                                                                    <app-main />
                                                                                    <right-panel>
                                                                                      <settings />
                                                                                    </right-panel>
                                                                                  </div> -->
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView, Headers } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState, mapGetters } from 'vuex'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Headers
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    ...mapGetters(["sidebarRouters", "sidebar"]),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    variables () {
      return variables;
    }
  },
  data () {
    return {
      entranceIcon: 'more-gray',
      shouqiIcon: 'shouqi1',
      drawer: false,
      shouqiCur: false,
      currentCollection: []
    }
  },
  created () {
    console.log(this.sidebarRouters);
  },
  methods: {
    toggleDwawer () {
      this.drawer = !this.drawer
    },
    toggleSider () {
      this.sidebar.opened = !this.sidebar.opened
    },
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 鼠标滑过显示高亮图标
    showIcon () {
      this.entranceIcon = 'more-current'
    },
    // 鼠标离开隐藏高亮图标
    hideIcon () {
      this.entranceIcon = 'more-gray'
    },
    toggleShou1 () {
      this.shouqiIcon = 'shouqi2'
    },
    toggleShou2 () {
      this.shouqiIcon = 'shouqi1'
    },
    // 收藏
    collection (i) {
      if (this.currentCollection.indexOf(i) == -1) {
        this.currentCollection.push(i)
      } else {
        this.currentCollection.splice(this.currentCollection.indexOf(i), 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.menu-box {
  height: calc(100vh - 62px);
  background-color: #fff;
  padding: 20px;
  position: absolute;
  top: 0;
  z-index: 99;

  .menu-list {
    columns: 3;
    column-gap: 10;

    .menu-item {
      margin-right: 20px;
      padding: 10px;

      .level-2-menu {
        display: flex;
        min-width: 120px;
        // justify-content: space-between;
        align-items: center;
      }
    }
  }
}

.right-container {
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
  box-sizing: border-box;
}

.Cor {
  color: #17bcbf;
}

.shouqi-arrow {
  transform: rotate(90deg);
}

.shouqi-arrow1 {
  transform: rotate(-90deg);
}


.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #00000073;
  opacity: 1;
  z-index: 10;
}

.menu-drawer {
  width: 50%;
  position: absolute;
  height: calc(100vh - 62px);
}

.cnt {
  position: relative;
  width: 100%;
  height: calc(100vh - 62px);
  display: flex;
  border-top: 2px solid #edeef1;
}

.left-menu {
  position: relative;
  height: calc(100vh - 62px);
  z-index: 1;
  overflow-x: auto;

  .toggle-menu {
    position: fixed;
    bottom: 10px;
    left: 20px;
  }

  .tips {
    height: 72px;
    line-height: 24px;
    color: #b3b6b9;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 0 21px 0 19px;
    border-bottom: 1px solid #edeef1;
  }

  .entrance {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #17bcbf;
    cursor: pointer;
    height: 68px;
    line-height: 68px;
    background-image: url("../assets/images/menu-bg.png");
    background-size: 100% 100%;
    padding: 0 21px 0 19px;

    .entrance-img {
      vertical-align: -12px;
    }

    .right-arrow {
      font-size: 16px;
      float: right;
      margin-top: 34px;
      transform: translateY(-50%);
    }

    .bdr {
      display: none;
      width: 4px;
      height: 48px;
      background-color: #17bcbf;
      position: absolute;
      right: 0;
      top: 11px;
    }
  }

  .entrance:hover .bdr {
    display: block;
  }
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  // &.mobile.openSidebar {
  //   position: fixed;
  //   top: 0;
  // }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
