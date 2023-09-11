import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Dropdown, Menu, Avatar, Popover } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

const { Header } = Layout;

function TopHeader(props) {
  console.log(props);
  // const [collapsed, setCollapsed] = useState(false);
  // setCollapsed(!collapsed)

  const [full, setFull] = useState(false);

  const changeCCollapsed = () => {
    //修改为使用redux
    props.changeCollapsed();
  };

  // 全屏
  const handleFullScreen = () => {
    setFull(true);
    const container = document.body;
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
  };

  // 退出全屏
  const handleExitScreen = () => {
    setFull(false);
    let el = document;
    let cfs =
      el.cancelFullScreen ||
      el.mozCancelFullScreen ||
      el.msExitFullscreen ||
      el.webkitExitFullscreen ||
      el.exitFullscreen;
    if (cfs) {
      // typeof cfs != "undefined" && cfs
      cfs.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
      // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
      let wscript = new ActiveXObject("WScript.Shell"); //eslint-disable-line
      if (wscript != null) {
        wscript.SendKeys("{F11}");
      }
    }
  };

  const menu = (
    <Menu>
      <Menu.Item
        danger
        onClick={() => {
          localStorage.removeItem("token");
          props.history.replace("login");
        }}
      >
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      style={{
        padding: "0 40px 0 20px",
        background: "#fff",
      }}
    >
      {props.isCollapsed ? (
        <MenuUnfoldOutlined onClick={changeCCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changeCCollapsed} />
      )}

      <div style={{ float: "right" }}>
        {!full ? (
          <FullscreenOutlined
            onClick={handleFullScreen}
            style={{ margin: "10px 16px 0 0", cursor: "pointer" }}
          />
        ) : (
          <FullscreenExitOutlined
            onClick={handleExitScreen}
            style={{ margin: "10px 16px 0 0", cursor: "pointer" }}
          />
        )}

        <Popover content={menu} style={{ padding: "0 16px" }}>
          <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
            {JSON.parse(localStorage.getItem("token"))?.username
              .toString()
              .substring(0, 2)}
          </Avatar>
        </Popover>
      </div>
    </Header>
  );
}
const mapStateToProps = (state) => {
  const { isCollapsed } = state.changeCollapsed;
  return {
    isCollapsed,
  };
};

const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: "change_collapsed",
    };
  },
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopHeader));
