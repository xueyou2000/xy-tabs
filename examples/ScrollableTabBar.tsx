import React, { useState, useRef } from "react";
import { TabPanelNode, Tabs } from "../src";
import "../src/assets/index";
import ScrollableTabBar from "../src/ScrollableTabBar";
import SwipeableTabContent from "../src/SwipeableTabContent";

export default function() {
    // 初始化种子数据
    const [tabs, setTabs] = useState(["选项0", "选项1", "选项2"]);
    const [key, setKey] = useState(tabs[0]);
    const scrollToRef = useRef<Function>(null);

    function addTab() {
        setTabs(tabs.concat(["选项" + tabs.length]));
    }

    function removeTab() {
        setTabs(tabs.slice(0, tabs.length - 1));
    }

    function scrollTo() {
        if (scrollToRef.current) {
            scrollToRef.current(key);
        }
    }

    return (
        <div>
            <Tabs className="exp-demo1" style={{ width: "300px" }} renderTabBar={() => <ScrollableTabBar scrollToRef={scrollToRef} />} renderTabContent={() => <SwipeableTabContent />}>
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
