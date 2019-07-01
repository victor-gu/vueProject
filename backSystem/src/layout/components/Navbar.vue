<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <fullScreen class="fullScreen" />
      <el-dropdown class="userContainer" trigger="click">
        <div class="userWrapper">
          <div class="username">{{ $store.getters.name }}</div>
          <img class="userImage" src="@/assets/user/default.png">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              返回首页
            </el-dropdown-item>
          </router-link>
          <router-link :to="{name: 'PersonCenter'}">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import fullScreen from '@/components/fullScreen';

export default {
  components: {
    Breadcrumb,
    Hamburger,
    fullScreen
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .fullScreen{
      height: 50px;
      margin-right: 15px;
    }
    .userContainer {
      margin-right: 10px;
      .userWrapper {
        margin-top: 5px;
        cursor: pointer;
        overflow: hidden;
        .username{
          float: left;
          font-size: 14px;
          font-weight: bolder;
          white-space: nowrap;
          line-height: 45px;
        }
        .userImage {
          float: left;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin: 0 5px 0 15px;
        }
        .el-icon-caret-bottom {
          float: left;
          cursor: pointer;
          font-size: 12px;
          line-height: 45px;
        }
      }
    }
  }
}
</style>
