# xy-tabs

---

> 基于`React Hooks` + `typescript`的基础组件, 只提供`es`模块

## 安装

```sh
# npm
npm install --save xy-tabs classNames lodash-es utils-hooks

# yarn
yarn add xy-tabs classNames lodash-es utils-hooks
```

## 使用

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { TabPanelNode, Tabs } from "xy-tabs";
// 可选的加载样式
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
    container
);
```

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
    container
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
