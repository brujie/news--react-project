import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, notification } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';

const { confirm } = Modal;

export default function RoleList() {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        const { username } = JSON.parse(localStorage.getItem("token"));
        React.$http.get(`/news?author=${username}&auditState=0&_expand=category`).then((res) => {
            setDataSource(res);
        })
    }, [])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: id => <b>{id}</b>
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (title, item) =>
                <NavLink to={`/news-manage/preview/${item.id}`}>{title}</NavLink>

        },
        {
            title: '作者',
            dataIndex: 'author'
        },
        {
            title: '分类',
            dataIndex: 'category',
            render: item => <span>{item.title}</span>
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button danger shape="circle" style={{ marginRight: "10px" }} icon={<DeleteOutlined />} onClick={() => showConfirm(item)} />
                        <NavLink style={{ marginRight: "10px" }} to={`/news-manage/update/${item.id}`}><Button shape="circle" icon={<EditOutlined />} /></NavLink>
                        <NavLink to={`/audit-manage/list`}><Button type="primary" shape="circle" icon={<CloudUploadOutlined />} onClick={() => upNews(item.id)} /></NavLink>

                    </div>
                )
            }
        },
    ]

    const upNews = (id) => {
        //console.log(id);
        React.$http.patch(`/news/${id}`, {
            auditState: 1
        }).then(() => {
            notification.info({
                message: "通知",
                description:
                    `您可以在审核列表中查看您的新闻!`,
                placement: "bottomRight",
            });
        })
    }

    const showConfirm = (item) => {
        confirm({
            title: '警告',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除吗?',
            okText:'确认',
            cancelText:'取消',
            onOk() {
                deleteRightList(item)
            }
        });
    }
    const deleteRightList = (item) => {
        React.$http.delete(`/news/${item.id}`).then(() => {
            setDataSource(dataSource.filter(data => data.id !== item.id))
        })
    }

    return (
        <div>
            <Table rowKey={item => item.id} dataSource={dataSource} columns={columns} />
        </div>

    )
}
