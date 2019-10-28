import React from "react";
import { TabPanelNode, Tabs, useTabEnter, useTabLeave } from "../src";
import SwipeableTabContent from "../src/SwipeableTabContent";

function EventPage({ name }) {
    useTabEnter(() => {
        console.log(`${name} 进入`);
    });

    useTabLeave(() => {
        console.log(`${name} 离开`);
    });

    return <p>Tab: {name}</p>;
}

export default function() {
    return (
        <div>
            <Tabs lazy={true} renderTabContent={() => <SwipeableTabContent />}>
                <TabPanelNode tabKey="a" tab={<span className="tab_point">tab1</span>}>
                    <EventPage name="a" />
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab={<span className="tab_point">tab2</span>}>
                    <EventPage name="b" />
                </TabPanelNode>
                <TabPanelNode tabKey="c" tab={<span className="tab_point">tab3</span>}>
                    <EventPage name="c" />
                </TabPanelNode>
                <TabPanelNode tabKey="d" tab={<span className="tab_point">tab4</span>} disabled={true}>
                    <EventPage name="d" />
                </TabPanelNode>
            </Tabs>
        </div>
    );
}
