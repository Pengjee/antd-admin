import React, { useState, useRef } from 'react';
import { history } from 'umi'

import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Button, Divider, message, Input, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';

import { queryRule } from './service';

const TableList = () => {
	const columns = [{
		title: '模版ID',
		dataIndex: 'tplId'
	}, {
		title: '模版名称/ID',
		dataIndex: 'name'
	}, {
		title: '模版内容',
		dataIndex: 'content'
	}, {
		title: '创建时间',
		dataIndex: 'createTime'
	}, {
		title: '审核状态',
		dataIndex: 'status',
		valueType: 'textarea',
		valueEnum: {
			0: {
				text: '关闭',
				status: 'Default',
			},
			1: {
				text: '运行中',
				status: 'Processing',
			},
			2: {
				text: '已上线',
				status: 'Success',
			},
			3: {
				text: '异常',
				status: 'Error',
			}
		}
	}, {
		title: '归属应用',
		dataIndex: 'app'
	}, {
		title: '操作',
		dataIndex: 'option',
		valueType: 'option',
		render: (_, record) => (
			<Button>修改</Button>
		)
	} ]

	const handleCreateForm = () => {
		history.push({
			pathname: '/domestic/template/form/add',
			query: {
				a: 'b',
			}
		})
	}
	return (
		<PageContainer>
			<ProTable
				headerTitle="模版管理"
				// postData={[]}
				rowKey="key"
				search={{
					labelWidth: 120,
				}}
				toolBarRender={() => [
					<Button type="primary" onClick={() => handleCreateForm()}>
						<PlusOutlined/> 新建
					</Button>,
				]}
				options={false}
				request={(params, sorter, filter) => queryRule({...params, sorter, filter})}
				columns={columns}
			/>
		</PageContainer>
	);
};

export default TableList;
