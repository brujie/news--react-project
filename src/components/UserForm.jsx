import React, { forwardRef, useState } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select;
const UserFrom = (props, ref) => {
    const [regionsDis, setRegions] = useState(false)
    const saveCurrentUser = JSON.parse(localStorage.getItem("token"))
    const decisionRegionDisabled = (item) => {
        if (props.isUpData) {
            if (saveCurrentUser.roleId === 1) {
                return false
            } else {
                return true
            }
        } else {
            if (saveCurrentUser.roleId === 1) {
                return false
            } else {
                return (item.value !== saveCurrentUser.region)
            }
        }
    }
    const decisionRoleDisabled = (item) => {
        if (props.isUpData) {
            if (saveCurrentUser.roleId === 1) {
                return false
            } else {
                return true
            }
        } else {
            if (saveCurrentUser.roleId === 1) {
                return false
            } else {
                return (item.roleType !== 3)
            }
        }
    }

    return (
        <Form
            ref={ref}
            layout="vertical">
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: '请输入密码!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={regionsDis ? [] : [{ required: true, message: '请选择区域!' }]}>
                <Select disabled={regionsDis}>
                    {props.regionsList.map((item) => <Option disabled={decisionRegionDisabled(item)} key={item.id} value={item.value}>{item.value}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: '请选择角色!' }]}>
                <Select onChange={(value) => {
                    if (value === 1) {
                        setRegions(true)
                        ref.current.setFieldsValue({
                            region: ""
                        })
                    } else {
                        setRegions(false)
                    }
                }}>
                    {props.rolesList.map((item) => <Option disabled={decisionRoleDisabled(item)} key={item.id} value={item.id}>{item.roleName}</Option>)}
                </Select>
            </Form.Item>
        </Form>

    )
}
export default forwardRef(UserFrom)
