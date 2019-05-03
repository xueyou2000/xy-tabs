| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-tabs.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-tabs.svg?style=flat-square)

[![xy-tabs](https://nodei.co/npm/xy-tabs.png)](https://npmjs.org/package/xy-tabs)

# xy-tabs

选项卡组件, 提供了低级的组件任意组合

## 安装

```bash
# yarn
yarn add xy-tabs classNames lodash-es utils-hooks
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { TabPanelNode, Tabs } from "xy-tabs";
// 加载样式
import "xy-tabs/assets/index.css";
ReactDOM.render(
    <Tabs defaultActiveKey="b">
        <TabPanelNode tab="tab 1" tabKey="a">
            first
        </TabPanelNode>
        <TabPanelNode tab="tab 2" tabKey="b">
            second
        </TabPanelNode>
        <TabPanelNode tab="tab 3" tabKey="c">
            third
        </TabPanelNode>
    </Tabs>,
    container,
);
```

## API

### Tabs

| 属性                   | 说明                                   | 类型                                            | 默认值 |
| ---------------------- | -------------------------------------- | ----------------------------------------------- | ------ |
| children               | TabPanels                              | React.ReactNode                                 | 无     |
| activeKey              | 激活 key                               | string/number                                   | 无     |
| defaultActiveKey       | 默认激活 key                           | string/number                                   | 无     |
| lazy                   | 是否延迟载入 content                   | boolean                                         | 无     |
| reverse                | 是否翻转                               | boolean                                         | 无     |
| destroyInactiveTabPane | 不是激活的 content 是否不渲染在 dom 中 | boolean                                         | 无     |
| renderTabBar           | 渲染选项卡 tab                         | () => JSX.Element                               | 无     |
| renderTabContent       | 渲染选项卡内容                         | () => JSX.Element                               | 无     |
| onChange               | 激活改变事件                           | (activeKey: string/number) => void              | 无     |
| onTabClick             | tab 被点击事件                         | (activeKey: string/number, event?: any) => void | 无     |

### TabPanelNode

| 属性                   | 说明                                   | 类型            | 默认值 |
| ---------------------- | -------------------------------------- | --------------- | ------ |
| active                 | 是否激活样式                           | boolean         | 无     |
| disabled               | 是否禁用                               | boolean         | 无     |
| children               | tab 内容                               | React.ReactNode | 无     |
| tab                    | 选项卡 tab 内容                        | React.ReactNode | 无     |
| lazy                   | 是否延迟载入 content                   | boolean         | 无     |
| tabKey                 | 选项卡 key                             | string/number   | 无     |
| destroyInactiveTabPane | 不是激活的 content 是否不渲染在 dom 中 | boolean         | 无     |

### 使用自定义渲染

```tsx
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Tabs, TabBarRoot, TabContentRoot, TabNode, TabPanelNode, TabsContext, ScrollableTabBar, SwipeableTabContent } from "xy-tabs";
// 可选的加载样式
import "xy-tabs/assets/index.css";

const scrollToRef = useRef<Function>();

// ScrollableTabBar 自定义渲染tabbar组件, 封装了溢出tab显示左右箭头
// SwipeableTabContent 自定义渲染tabcontent组件, 封装了切换动画

ReactDOM.render(
    <Tabs renderTabBar={() => <ScrollableTabBar />} renderTabContent={() => <SwipeableTabContent />}>
        <TabPanelNode tab="tab 1" tabKey="a">
            first
        </TabPanelNode>
        <TabPanelNode tab="tab 2" tabKey="b">
            second
        </TabPanelNode>
        <TabPanelNode tab="tab 3" tabKey="c">
            third
        </TabPanelNode>
    </Tabs>,
    container,
);
```

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-tabs is released under the MIT license.
