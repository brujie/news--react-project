import React, { useEffect,useState } from 'react'
import { withRouter} from 'react-router-dom'
import { Layout, Menu  } from 'antd';
import { connect } from 'react-redux'

import {
  UserOutlined,
  HomeOutlined,
  ControlOutlined,
  SoundOutlined,
  AuditOutlined,
  SmileOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

// 菜单图标映射
const iconList = {
  "/home": <HomeOutlined />,
  "/user-manage": <UserOutlined />,
  "/right-manage": <ControlOutlined />,
  "/news-manage":<SoundOutlined />,
  "/audit-manage":<AuditOutlined />,
  "/publish-manage":<SmileOutlined />

}

function SideMenu(props) {
  // const currentUser = JSON.parse(localStorage.getItem("token"))
  const [menuList, setMenuList] = useState([])

  useEffect(()=>{
    React.$http('/rights?_embed=children').then(res =>{
      setMenuList(res)
    })
  },[])

  //根据数据遍历列表
  const decision = (item) => {
      return item.pagepermisson === 1 
  }

  const renderMenu = (menuList) =>{
    return menuList.map(item =>{
      if(item.children?.length && decision(item)){
        return <Menu.SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
          {renderMenu(item.children)}
        </Menu.SubMenu>
      } 
      return decision(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={()=>{props.history.push(item.key)}}>{item.title}</Menu.Item>
    })
  }
  const selectKeys = [props.location.pathname];
  const selectOpenKeys = ['/' + props.location.pathname.split('/')[1]];
  return (
    // breakpoint="lg" // 取消折叠
    // collapsed 修改为redux状态数据
    <Sider
      collapsed={props.isCollapsed}
      collapsedWidth="65"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div style={{ display: 'flex', height: "100%", flexDirection: "column" }} >
      <div className="logo">
        新闻发布后台系统
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={selectOpenKeys}
          selectedKeys={selectKeys}
        >
          {renderMenu(menuList)}
        </Menu>
        </div>
      </div>
    </Sider>
  )
}
// 获取redux中的状态,使用props接收
const mapStateToProps = (state)=>{
  const { isCollapsed } = state.changeCollapsed;
  return {
    isCollapsed
  }
}

export default connect(mapStateToProps)(withRouter(SideMenu))
