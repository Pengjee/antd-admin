export const router = [ {
	path: '/',
	component: '../layouts/BlankLayout',
	routes: [
		{
			path: '/user',
			component: '../layouts/UserLayout',
			routes: [
				{
					path: '/user',
					redirect: '/user/login',
				},
				{
					name: 'login',
					icon: 'smile',
					path: '/user/login',
					component: './user/login',
				},
				{
					name: 'register-result',
					icon: 'smile',
					path: '/user/register-result',
					component: './user/register-result',
				},
				{
					name: 'register',
					icon: 'smile',
					path: '/user/register',
					component: './user/register',
				},
				{
					component: '404',
				},
			],
		},
		{
			path: '/',
			component: '../layouts/BasicLayout',
			Routes: [ 'src/pages/Authorized' ],
			authority: [ 'admin', 'user' ],
			routes: [
				{
					path: '/',
					redirect: '/form/basic-form',
				},
				{
					path: '/form',
					icon: 'form',
					name: 'form',
					routes: [
						{
							name: 'basic-form',
							icon: 'smile',
							path: '/form/basic-form',
							component: './form/basic-form',
						},
						{
							name: 'step-form',
							icon: 'smile',
							path: '/form/step-form',
							component: './form/step-form',
						},
						{
							name: 'advanced-form',
							icon: 'smile',
							path: '/form/advanced-form',
							component: './form/advanced-form',
						},
					],
				},
				{
					path: '/list',
					icon: 'table',
					name: 'list',
					routes: [
						{
							name: 'table-list',
							icon: 'smile',
							path: '/list/table-list',
							component: './list/table-list',
						}, {
							name: 'basic-list',
							icon: 'smile',
							path: '/list/basic-list',
							component: './list/basic-list',
						}, {
							name: 'card-list',
							icon: 'smile',
							path: '/list/card-list',
							component: './list/card-list',
						}
					],
				},
				{
					path: '/profile',
					name: 'profile',
					icon: 'profile',
					routes: [
						{
							name: 'basic',
							icon: 'smile',
							path: '/profile/basic',
							component: './profile/basic',
						},
						{
							name: 'advanced',
							icon: 'smile',
							path: '/profile/advanced',
							component: './profile/advanced',
						},
					],
				},
				{
					name: 'exception',
					icon: 'warning',
					path: '/exception',
					routes: [
						{
							name: '403',
							icon: 'smile',
							path: '/exception/403',
							component: './exception/403',
						},
						{
							name: '404',
							icon: 'smile',
							path: '/exception/404',
							component: './exception/404',
						},
						{
							name: '500',
							icon: 'smile',
							path: '/exception/500',
							component: './exception/500',
						},
					],
				},
				{
					name: 'account',
					icon: 'user',
					path: '/account',
					routes: [
						{
							name: 'center',
							icon: 'smile',
							path: '/account/center',
							component: './account/center',
						},
						{
							name: 'settings',
							icon: 'smile',
							path: '/account/settings',
							component: './account/settings',
						},
					],
				},
				{
					name: '自定义页面',
					icon: 'smile',
					path: '/domestic',
					routes: [{
						name: '自定义',
						icon: 'smile',
						path: '/domestic/template',
						component: './domestic/TemplateRecords',
					}, {
						name: '基础表单',
						icon: 'smile',
						path: '/domestic/template/form/:type',
						hideInMenu: true,
						component: './domestic/TemplateForm',
					}]
				},
				{
					component: '404',
				}
			]
		}
	]
} ]
