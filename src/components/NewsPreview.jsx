import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Tag } from 'antd';
import { AUDITSTATE, PUBLISHSTATE, AUDITCOLOR } from '../util/constant'
import moment from 'moment'
import { useHistory } from 'react-router-dom';


export default function NewsPreview(props) {
    const [newsInfo, setNewsInfo] = useState(null)
    useEffect(() => {
        //console.log(props.match.params.id);
        //props.match.params可以获取url中的参数
        React.$http.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
            .then((res) => {
                setNewsInfo(res)
            })
    }, [props.match.params.id])

    const history = useHistory();

    const handleGoBack = () => {
      history.goBack();
    }; 
    return (
        <div>
            {/* 避免组件加载完后，数据还没出来 */}
            {newsInfo &&
                <div>   
                        <Button  style={{float:'right'}} onClick={handleGoBack}>返回</Button>
                        <h1>标题:{newsInfo.title}</h1> 
                        <Tag color="magenta" style={{margin:"10px 0px"}}>{newsInfo.category.title}</Tag>
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.createTime).format("YYYY-MM-DD HH:mm:ss") : "-"}</Descriptions.Item>
                            <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                            <Descriptions.Item label="审核状态"><span style={{ color: AUDITCOLOR[newsInfo.auditState] }}>{AUDITSTATE[newsInfo.auditState]}</span></Descriptions.Item>
                            <Descriptions.Item label="发布状态"><span >{PUBLISHSTATE[newsInfo.publishState]}</span></Descriptions.Item>
                            <Descriptions.Item label="访问数量"><span style={{ color: "green" }}>{newsInfo.view}</span></Descriptions.Item>
                            <Descriptions.Item label="点赞数量"><span style={{ color: "green" }}>{newsInfo.star}</span></Descriptions.Item>
                            <Descriptions.Item label="评论数量"><span style={{ color: "green" }}>0</span></Descriptions.Item>
                        </Descriptions>
                    {/* 让带标签的内容自动转换 */}
                    <div dangerouslySetInnerHTML={{ __html: newsInfo.content }} style={{ padding: "20px 24px", border: "1px solid #ccc" }}>
                    </div>
                </div>}
        </div>
    )
}
