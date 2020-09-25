import ProLayout, {DefaultFooter, SettingDrawer} from '@ant-design/pro-layout';
import React, {useEffect} from 'react';
import {Link, useIntl, connect, history} from 'umi';
import {GithubOutlined} from '@ant-design/icons';
import {Result, Button} from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import {getAuthorityFromRouter} from '@/utils/utils';
import logo from '../assets/logo.svg';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="不好意思，你没有权限访问本页。"
    extra={
      <Button type="primary">
        <Link to="/user/login">去登录</Link>
      </Button>
    }
  />
);

/**
 * 根据权限渲染菜单
 */
const menuDataRender = (menuList) => menuList.map((item) => {
  const localItem = {
    ...item,
    children : item.children ? menuDataRender (item.children) : undefined,
  };
  return Authorized.check (item.authority, localItem, null);
});


const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname : '/',
    },
  } = props;

  useEffect (() => {
    if (dispatch) {
      dispatch ({
        type : 'user/fetchCurrent',
      });
    }
  }, []);

  // 菜单收起
  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch ({
        type : 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  const authorized = getAuthorityFromRouter (props.route.routes, location.pathname || '/') || {
    authority : undefined,
  };
  const {formatMessage} = useIntl ();
  return (
    <>
      <ProLayout
        logo={logo}
        formatMessage={formatMessage}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push ('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path : '/',
            breadcrumbName : formatMessage ({
              id : '首页',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf (route) === 0;
          return first ? (
            <Link to={paths.join ('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent/>}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
    </>
  );
};

export default connect (({global, settings}) => ({
  collapsed : global.collapsed,
  settings,
})) (BasicLayout);
