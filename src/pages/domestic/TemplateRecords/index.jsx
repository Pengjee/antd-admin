import React, { useState, useRef } from 'react';
import { history } from 'umi'

import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Button, Divider, message, Input, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';

import { queryRule } from './service';

const TableList = () => {
	const columns = [ {
		title: '规则名称',
		dataIndex: 'name',
		tip: '规则名称是唯一的 key',
		formItemProps: {
			rules: [ {
				required: true,
				message: '规则名称为必填项',
			} ],
		}
	}, {
		title: '描述',
		dataIndex: 'desc',
		valueType: 'textarea',
	}, {
		title: '服务调用次数',
		dataIndex: 'callNo',
		sorter: false,
		renderText: (val) => `${val} 万`,
	}, {
		title: '状态',
		dataIndex: 'status',
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
			},
		},
	}, {
		title: '上次调度时间',
		dataIndex: 'updatedAt',
		valueType: 'dateTime',
		renderFormItem: (item, {defaultRender, ...rest}, form) => {
			const status = form.getFieldValue('status');

			if (`${status}` === '0') {
				return false;
			}

			if (`${status}` === '3') {
				return <Input {...rest} placeholder="请输入异常原因！"/>;
			}

			return defaultRender(item);
		},
	}, {
		title: '操作',
		dataIndex: 'option',
		valueType: 'option',
		render: (_, record) => (
			<>
				操作
			</>
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
