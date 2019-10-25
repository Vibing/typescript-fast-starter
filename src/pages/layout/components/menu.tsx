import { Icon, Menu } from 'antd';
import React, { Component } from 'react';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';

const { SubMenu } = Menu;
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const getMenuMatches = (flatMenuKeys: string[] = [], path: string): string[] =>
  flatMenuKeys.filter(item => item && pathToRegexp(item).test(path));

const isUrl = (path: string): boolean => reg.test(path);

const getIcon = (icon: string) => <Icon type={icon} />;

function urlToList(url?: string): string[] {
  if (!url || url === '/') {
    return ['/'];
  }
  const urlList = url.split('/').filter(i => i);
  return urlList.map(
    (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`
  );
}

export default class BaseMenu extends Component<any> {
  public static defaultProps = {
    flatMenuKeys: [],
    onCollapse: () => undefined,
    isMobile: false,
    openKeys: [],
    collapsed: false,
    handleOpenChange: () => undefined,
    menuData: [],
    onOpenChange: () => undefined
  };

  warp: HTMLDivElement | undefined;

  state = {};

  /**
   * 获得菜单子节点
   */
  getNavMenuItems = (menusData: any) =>
    menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item: any) => {
    if (
      Array.isArray(item.children) &&
      !item.hideChildrenInMenu &&
      item.children.some(child => child && !!child.name)
    ) {
      const name = this.getIntlName(item);
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.key || item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.key || item.path}>
        {this.getMenuItemPath(item)}
      </Menu.Item>
    );
  };

  // Get the currently selected menu
  getSelectedMenuKeys = (pathname?: string): string[] => {
    const { flatMenuKeys, selectedKeys } = this.props;
    if (selectedKeys !== undefined) {
      return selectedKeys;
    }

    return urlToList(pathname)
      .map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
      .filter(item => item) as string[];
  };

  getIntlName = (item: any) => {
    const { name, locale } = item;
    const {
      menu = {
        locale: false
      },
      formatMessage
    } = this.props;
    if (locale && menu.locale && formatMessage) {
      return formatMessage({
        id: locale,
        defaultMessage: name
      });
    }
    return name;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item: any) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const {
      location = { pathname: '/' },
      isMobile,
      onCollapse,
      menuItemRender
    } = this.props;
    const { target } = item;
    // if local is true formatMessage all name。
    const name = this.getIntlName(item);
    let defaultItem = (
      <>
        {icon}
        <span>{name}</span>
      </>
    );
    const isHttpUrl = isUrl(itemPath);
    // Is it a http link
    if (isHttpUrl) {
      defaultItem = (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    if (menuItemRender) {
      return menuItemRender(
        {
          ...item,
          isUrl: isHttpUrl,
          itemPath,
          isMobile,
          replace: itemPath === location.pathname,
          onClick: () => onCollapse && onCollapse(true)
        },
        defaultItem
      );
    }
    return defaultItem;
  };

  conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  getPopupContainer = (fixedHeader: boolean, layout: string): HTMLElement => {
    if (fixedHeader && layout === 'topmenu' && this.warp) {
      return this.warp;
    }
    return document.body;
  };

  getRef = (ref: HTMLDivElement) => {
    this.warp = ref;
  };

  render(): React.ReactNode {
    const {
      openKeys,
      theme,
      mode,
      location = {
        pathname: '/'
      },
      className,
      collapsed,
      handleOpenChange,
      style,
      fixedHeader = false,
      layout = 'sidemenu',
      menuData,
      selectedKeys: defaultSelectedKeys
    } = this.props;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(location.pathname);
    if (defaultSelectedKeys === undefined && !selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed && layout === 'sidemenu') {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys
      };
    }
    const cls = classNames(className, {
      'top-nav-menu': mode === 'horizontal'
    });

    return (
      <>
        <Menu
          {...props}
          key="Menu"
          mode={'inline'}
          theme={'dark'}
          onOpenChange={handleOpenChange}
          selectedKeys={selectedKeys}
          style={style}
          className={cls}
          getPopupContainer={() => this.getPopupContainer(fixedHeader, layout)}
        ></Menu>

        {this.getNavMenuItems(menuData)}
      </>
    );
  }
}
