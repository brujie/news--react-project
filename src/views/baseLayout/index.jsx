import React, { useEffect, useState } from 'react'
import SideMenu from '../../components/SideMenu.jsx'
import TopHeader from '../../components/TopHeader.jsx'
import NewsPreview from '../../components/NewsPreview.jsx'; // 预览/修改组件
import { Route, Switch, Redirect } from 'react-router-dom'
import NotPremission from '../notPremission/index.jsx'
import Home from '../home/index.jsx'
import UserList from '../userManage/list.jsx' // 用户管理
import AuthList from '../authManage/list.jsx' // 权限管理
import AuthRole from '../authManage/role.jsx' // 权限管理
import NewsAdd from '../newsManage/add.jsx' // 新闻管理
import NewsDraft from '../newsManage/draft.jsx' // 新闻管理
import NewsAudit from '../newsManage/audit.jsx' // 新闻管理
import Audit from '../auditManage/index.jsx' // 审核管理
import AuditList from '../auditManage/list.jsx' // 审核管理
import PublishUnpublished from '../publishManage/unpublished.jsx' // 发布管理
import PublishPublished from '../publishManage/published.jsx' // 发布管理
import PublishSunset from '../publishManage/sunset.jsx' // 发布管理
import ECharts  from '../echarts/index.jsx';
import { Layout, Spin } from 'antd'
import { connect } from 'react-redux'
const { Content } = Layout;
const routerList = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": AuthRole,
  "/right-manage/right/list": AuthList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": PublishUnpublished,
  "/publish-manage/published": PublishPublished,
  "/publish-manage/sunset": PublishSunset,
  "/news-manage/preview/:id": NewsPreview,
  "/news-manage/update/:id": NewsAdd,
  "/echarts": ECharts
}

function BaseLayout(props) {
  const saveUser = JSON.parse(localStorage.getItem("token"))
  const [saveRouterList, setSaveRouterList] = useState([])
  useEffect(()=>{
    Promise.all([
      React.$http('/rights'),
      React.$http('/children'),
    ]).then(res =>{
      console.log(res)
      setSaveRouterList([...res[0], ...res[1]])
    })
  },[])

// 路由权限判断
const checkRouter = (item) => {
    return routerList[item.key] && (item.pagepermisson || item.routepermisson)
}
const checkUserRights = (item) => {
    return saveUser.role.rights.includes(item.key)
}

  return (
    <Layout>
      <SideMenu />
      <Layout>
        <TopHeader />
        <Content>
          <div
            style={{
              padding: 12,
              height: '95%',
              margin: '16px',
              background: '#fff',
              overflowY: 'auto'
            }}
          >
            <Spin spinning={props.isLoading}>
              <Switch >
              {
                    saveRouterList.map(item => {
                        if (checkRouter(item) && checkUserRights(item)) {
                            return <Route path={item.key} key={item.key} component={routerList[item.key]} exact />
                        } else {
                          return null;
                        }
                    }
                    )
                }
                {
                    saveRouterList.length > 0 && <Route path="*" component={NotPremission} />
                }
                {/* <Route path='/echarts' component={ECharts} exact /> */}
                <Redirect from="/" to="/home" exact></Redirect>
              </Switch>
            </Spin>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
const mapStateToProps = (state) => {
  const { isLoading } = state.changeLoading;
  return {
    isLoading
  }
}
export default connect(mapStateToProps)(BaseLayout)