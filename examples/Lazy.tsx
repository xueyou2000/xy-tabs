import { action } from "@storybook/addon-actions";
import React from "react";
import { TabPanelNode, Tabs } from "../src";

export default function() {
    function handleChange() {
        setTimeout(() => {
            const lis = document.querySelectorAll(".xy-tabs-tabpanel");
            action("onChange")(lis, lis.length);
        }, 100);
    }

    return (
        <div>
            <h1>懒加载</h1>
            <p>默认只加载激活的TabPanel, 激活过的TabPanel将被缓存</p>
            <Tabs style={{ width: "300px" }} onChange={handleChange} lazy={true}>
                <TabPanelNode tabKey="a" tab={<span className="tab_point">tab1</span>}>
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab={<span className="tab_point">tab2</span>}>
                    b
                </TabPanelNode>
                <TabPanelNode tabKey="c" tab={<span className="tab_point">tab3</span>}>
                    c
                </TabPanelNode>
            </Tabs>
        </div>
    );
}
