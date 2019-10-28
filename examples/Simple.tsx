import React from "react";
import { TabPanelNode, Tabs, useTabEnter, useTabLeave } from "../src";

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
            <Tabs style={{ width: "300px" }}>
                <TabPanelNode tabKey="a" tab={<span className="tab_point">tab1</span>}>
                    <EventPage name="s-a-1" />
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab={<span className="tab_point">tab2</span>}>
                    <EventPage name="s-b-2" />
                </TabPanelNode>
                <TabPanelNode tabKey="c" tab={<span className="tab_point">tab3</span>}>
                    <EventPage name="s-b-3" />
                </TabPanelNode>
            </Tabs>
        </div>
    );
}
