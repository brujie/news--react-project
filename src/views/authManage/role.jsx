import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Tree } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;
export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [rightsList, setRightsList] = useState([]);
  const [rightsId, setRightsId] = useState(0);
  useEffect(() => {
    React.$http.get("/roles").then(res => {
      setDataSource(res);
    });
    React.$http.get("/rights?_embed=children").then(res => {
      setTreeData(res);
    });
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: id => <b>{id}</b>,
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "操作",
      render: item => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              style={{ marginRight: "10px" }}
              icon={<DeleteOutlined />}
              onClick={() => showConfirm(item)}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setIsModalVisible(true);
                setRightsList(item.rights);
                setRightsId(item.id);
              }}
            />
          </div>
        );
      },
    },
  ];
  const handleOk = () => {
    React.$http
      .patch(`/roles/${rightsId}`, {
        rights: rightsList,
      })
      .then(() => {
        dataSource.map(item => {
          if (item.id === rightsId) item.rights = rightsList;
          return item;
        });
      });

    setIsModalVisible(false);
  };
  const showConfirm = item => {
    confirm({
      title: "警告",
      icon: <ExclamationCircleOutlined />,
      content: "确认删除吗?",
      okText:'确定',
      cancelText:"取消",
      onOk() {
        deleteRightList(item);
      },
    });
  };
  const deleteRightList = item => {
    React.$http.delete(`/roles/${item.id}`).then(() => {
      setDataSource(dataSource.filter(data => data.id !== item.id));
    });
  };
  const onCheck = data => {
    //console.log(data.checked);
    setRightsList(data.checked);
  };

  return (
    <div>
      <Table
        rowKey={item => item.id}
        dataSource={dataSource}
        columns={columns}
      />
      <Modal
        title="角色权限修改"
        visible={isModalVisible}
        okText = '确定'
        cancelText = "取消"
        onOk={() => handleOk()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Tree
          checkStrictly
          checkable
          treeData={treeData}
          checkedKeys={rightsList}
          onCheck={onCheck}
        />
      </Modal>
    </div>
  );
}
