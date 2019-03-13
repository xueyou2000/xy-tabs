import { action } from "@storybook/addon-actions";
import React from "react";
import { TabPanelNode, Tabs } from "../src";
import SwipeableTabContent from "../src/SwipeableTabContent";
import "../src/assets/index.scss";

export default function() {
    return (
        <div>
            <h1>自定义内容, 实现切换动画</h1>
            <Tabs style={{ width: "300px" }} onChange={action("onChange")} lazy={true} renderTabContent={() => <SwipeableTabContent />}>
                <TabPanelNode tabKey="a" tab={<span className="tab_point">tab1</span>}>
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab={<span className="tab_point">tab2</span>}>
                    b
                </TabPanelNode>
                <TabPanelNode tabKey="c" tab={<span className="tab_point">tab3</span>}>
                    c
                </TabPanelNode>
                <TabPanelNode tabKey="d" tab={<span className="tab_point">tab4</span>} disabled={true}>
                    d
                </TabPanelNode>
            </Tabs>
        </div>
    );
}
