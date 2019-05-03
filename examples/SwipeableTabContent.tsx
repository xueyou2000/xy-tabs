import React from "react";
import { TabPanelNode, Tabs } from "../src";
import "../src/assets/index";
import SwipeableTabContent from "../src/SwipeableTabContent";

export default function() {
    return (
        <div>
            <Tabs lazy={true} renderTabContent={() => <SwipeableTabContent />}>
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
