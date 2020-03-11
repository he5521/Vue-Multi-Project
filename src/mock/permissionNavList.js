import qs from 'qs'
var data = {
  627666: {
    data: {
      navList: [
        {
          sysTitle: '样式',
          children: [
            {
              name: 'templates',
              path: '/sub/templates/search',
              meta: {
                title: '模板'
              },
              children: [
                {
                  name: 'templates/search',
                  path: '/sub/templates/search',
                  meta: {
                    collect: true,
                    speed: true,
                    title: '查询模板',
                    icon: 'el-icon-fa-list-alt',
                    colorClass: 'bgOrg'
                  }
                }
              ]
            }
          ]
        },
        {
          sysTitle: '分销',
          children: [
            {
              menuhno: '1001',
              name: 'test',
              path: '/sub/inventory',
              meta: {
                title: '审核'
              },
              children: [
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/inventory/test',
                  meta: {
                    collect: false,
                    title: '财务审核',
                    icon: 'el-icon-fa-file-archive-o',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/inventory/test',
                  meta: {
                    collect: false,
                    title: 'LC商务审核',
                    icon: 'el-icon-fa-file-word-o',
                    colorClass: 'bgGray'
                  }
                }
              ]
            },
            {
              menuhno: '1001',
              name: 'stock',
              path: '/sub/inventory/stock/offer',
              meta: {
                title: '采购'
              },
              children: [
                {
                  name: 'inventory/stock/offer',
                  path: '/sub/inventory/stock/offer',
                  meta: {
                    collect: true,
                    speed: true,
                    title: '采购报价',
                    icon: 'el-icon-fa-rmb',
                    colorClass: 'bgBlue'
                  }
                },
                {
                  name: 'inventory/stock/requisition',
                  path: '/sub/inventory/stock/requisition',
                  meta: {
                    collect: true,
                    speed: true,
                    title: '采购申请',
                    icon: 'el-icon-fa-edit',
                    colorClass: 'bgGreen'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'inventory',
                  path: '/sub/inventory/test',
                  meta: {
                    collect: false,
                    title: '订单管理',
                    icon: 'el-icon-fa-file-text-o',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'inventory',
                  path: '/sub/inventory/test',
                  meta: {
                    collect: false,
                    title: '成本调整',
                    icon: 'el-icon-fa-database',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'inventory',
                  path: '/sub/inventory/test',
                  meta: {
                    collect: false,
                    title: '采购分析',
                    icon: 'el-icon-fa-keyboard-o',
                    colorClass: 'bgGray'
                  }
                }
              ]
            },
            {
              menuhno: '1001',
              name: 'inventory',
              path: '/inventory/test',
              meta: {
                title: '发货'
              },
              children: [
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: true,
                    title: '发货管理',
                    icon: 'el-icon-fa-print',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: true,
                    title: '发货明细',
                    icon: 'el-icon-fa-list-alt',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: true,
                    title: '标准发货',
                    icon: 'el-icon-fa-file-text-o',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: true,
                    title: '终端发货',
                    icon: 'el-icon-fa-database',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: true,
                    title: '物流送货',
                    icon: 'el-icon-fa-truck',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: false,
                    title: '物流签收',
                    icon: 'el-icon-fa-check-square-o',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: true,
                    title: '调拨确认',
                    icon: 'el-icon-fa-exchange',
                    colorClass: 'bgGray'
                  }
                }
              ]
            },
            {
              menuhno: '1001',
              name: 'test',
              path: '/sub/test',
              meta: {
                title: '收货'
              },
              children: [
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: false,
                    title: '收货管理',
                    icon: 'el-icon-fa-building-o',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: false,
                    title: '未到货订单',
                    icon: 'el-icon-fa-file-text',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: false,
                    title: '销售退货申请',
                    icon: 'el-icon-fa-edit',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: false,
                    title: '退货核销',
                    icon: 'el-icon-fa-history',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: false,
                    title: '调拨签收',
                    icon: 'el-icon-fa-check-square',
                    colorClass: 'bgGray'
                  }
                },
                {
                  menuhno: '1001',
                  menulno: '7603767',
                  name: 'test',
                  path: '/sub/test/test',
                  meta: {
                    collect: false,
                    title: '收货明细',
                    icon: 'el-icon-fa-list-alt',
                    colorClass: 'bgGray'
                  }
                }
              ]
            }
          ]
        }
      ],
      province: '湖南 测试集群',
      router: [{
        component: {
          chunkName: 'home',
          name: 'home'
        },
        meta: {
          title: '首页'
        },
        name: 'home',
        path: '/home'
      }, {
        component: {
          chunkName: 'apply',
          name: 'apply'
        },
        meta: {
          title: '应用'
        },
        name: 'apply',
        path: '/apply'
      }, {
        component: {
          chunkName: 'templates',
          name: 'sub/templates/search'
        },
        meta: {
          ptitle: '模板',
          pname: 'templates',
          title: '查询模板'
        },
        name: 'templates/search',
        path: '/sub/templates/search'
      }, {
        component: {
          chunkName: 'inventory/stock',
          name: 'sub/inventory/stock/offer'
        },
        meta: {
          ptitle: '采购',
          pname: 'stock',
          title: '采购报价'
        },
        name: 'inventory/stock/offer',
        path: '/sub/inventory/stock/offer'
      }, {
        component: {
          chunkName: 'inventory/stock',
          name: 'sub/inventory/stock/requisition'
        },
        meta: {
          ptitle: '采购',
          pname: 'stock',
          title: '采购申请'
        },
        name: 'inventory/stock/requisition',
        path: '/sub/inventory/stock/requisition'
      }
      ],
      testname: '测试集群'
    },
    state: 0
  }
}

export default {
  getNavList: config => {
    // const { token } = param2Obj(config.url)
    const { empno } = qs.parse(config.body)
    if (data[empno]) {
      return data[empno]
    } else {
      return false
    }
  }
}
