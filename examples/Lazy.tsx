import React from "react";
import { TabPanelNode, Tabs } from "../src";
import "../src/assets/index";

export default function() {
    return (
        <div>
            <Tabs style={{ width: "300px" }} lazy={true}>
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
