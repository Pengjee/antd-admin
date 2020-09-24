import React, { Component } from 'react';
import { RouteContext } from '@ant-design/pro-layout';
import classNames from 'classnames';
import styles from './index.less';
export default class FooterToolbar extends Component {
  getWidth = ({ collapsed, isMobile, siderWidth }) => {
    const sider = document.querySelector('.ant-layout-sider');

    if (!sider) {
      return undefined;
    }

    return isMobile ? undefined : `calc(100% - ${collapsed ? 48 : siderWidth || 256}px)`;
  };

  render() {
    const { children, className, extra, ...restProps } = this.props;
    return (
      <RouteContext.Consumer>
        {(value) => (
          <div
            className={classNames(className, styles.toolbar)}
            style={{
              width: this.getWidth(value),
              transition: '0.3s all',
            }}
            {...restProps}
          >
            <div className={styles.left}>{extra}</div>
            <div className={styles.right}>{children}</div>
          </div>
        )}
      </RouteContext.Consumer>
    );
  }
}
