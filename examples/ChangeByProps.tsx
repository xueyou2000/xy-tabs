import { action } from "@storybook/addon-actions";
import React, { useState } from "react";
import { TabPanelNode, Tabs } from "../src";
import { TabKey } from "../src/interface";

export default function() {
    const [active, setActive] = useState<TabKey>("b");

    function changeHandle(key: TabKey) {
        setActive(key);
        action("onChange")(key);
    }

    return (
        <div>
            <h1>受控组件</h1>
            <button onClick={() => changeHandle("b")}>主动切换到b</button>
            <br/>
            <Tabs style={{ width: "300px" }} activeKey={active} onChange={changeHandle}>
                <TabPanelNode tabKey="a" tab="tab1">
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab="tab2">
                    b
                </TabPanelNode>
                <TabPanelNode tabKey="c" tab="tab3">
                    c
                </TabPanelNode>
            </Tabs>
        </div>
    );
}
