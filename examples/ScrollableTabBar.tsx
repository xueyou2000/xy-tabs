import { action } from "@storybook/addon-actions";
import React, { useState, useRef } from "react";
import { TabPanelNode, Tabs } from "../src";
import ScrollableTabBar from "../src/ScrollableTabBar";
import "../src/assets/index.scss";
import "./examples.scss";

export default function() {
    // 初始化种子数据
    const [tabs, setTabs] = useState(["选项0", "选项1", "选项2"]);
    const [key, setKey] = useState(tabs[0]);
    const scrollToRef = useRef<Function>();

    function addTab() {
        setTabs(tabs.concat(["选项" + tabs.length]));
        action("增加tab")(tabs.concat(["选项" + tabs.length]));
    }

    function removeTab() {
        setTabs(tabs.slice(0, tabs.length - 1));
        action("移除tab")(tabs.slice(0, tabs.length - 1));
    }

    function scrollTo() {
        if (scrollToRef.current) {
            scrollToRef.current(key);
            action(`滚动到${key}`)(key);
        }
    }

    return (
        <div>
            <h1>自定义tabbar, 实现溢出箭头</h1>
            <Tabs className="exp-demo1" style={{ width: "300px" }} renderTabBar={() => <ScrollableTabBar scrollToRef={scrollToRef} />}>
                {tabs.map((tab, i) => (
                    <TabPanelNode key={tab} tabKey={tab} tab={<span className="tab_point">{tab}</span>}>
                        <p>{i}</p>
                        <p>{i}</p>
                        <p>{i}</p>
                        <p>{i}</p>
                        <p>{i}</p>
                    </TabPanelNode>
                ))}
            </Tabs>

            <button onClick={addTab}>动态增加</button>
            <button onClick={removeTab}>动态减少</button>

            <select value={key} onChange={(e) => setKey(e.target.value)}>
                {tabs.map((tab) => (
                    <option key={tab} value={tab}>
                        {tab}
                    </option>
                ))}
            </select>
            <button onClick={scrollTo}>滚动到指定tab</button>
        </div>
    );
}
