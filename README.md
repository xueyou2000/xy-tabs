# xy-tabs

---

> 基于`React Hooks` + `typescript`的基础组件

## 安装

```sh
# npm
npm install --save xy-tabs

# yarn
yarn add xy-tabs
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
        <TabPanelNode name="tab 1" tabKey="a">
            first
        </TabPanelNode>
        <TabPanelNode name="tab 2" tabKey="b">
            second
        </TabPanelNode>
        <TabPanelNode name="tab 3" tabKey="c">
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

rc-xy-tabs is released under the MIT license.
