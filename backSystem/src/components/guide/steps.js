const steps = [
  {
    element: '.hamburger-container',
    popover: {
      title: '侧边栏',
      description: '打开或者关闭侧边栏',
      position: 'bottom'
    }
  },
  {
    element: '.el-breadcrumb',
    popover: {
      title: '页面历史',
      description: '您访问的页面的历史',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '.addition',
    popover: {
      title: '时间',
      description: '系统时间',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '.fullScreen',
    popover: {
      title: '全屏',
      description: '页面全屏显示',
      position: 'left'
    }
  },
  {
    element: '.avatar-wrapper',
    popover: {
      title: '个人中心',
      description: '用户个人中心',
      position: 'left'
    },
    padding: 0
  },
  {
    element: '.tags-view-container',
    popover: {
      title: '标签页',
      description: '当前页面位置',
      position: 'bottom'
    }
  }
]

export default steps
