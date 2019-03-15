import { action } from "@storybook/addon-actions";
import React from "react";
import { TabPanelNode, Tabs } from "../src";

export default function() {
    return (
        <div>
            <h1>非受控组件</h1>
            <Tabs style={{ width: "300px" }} onChange={action("onChange")}>
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
