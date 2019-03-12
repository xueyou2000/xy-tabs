import React from "react";
import { TabPanel, Tabs } from "../src";
import "../src/assets/index.scss";

export default function() {
    return (
        <div>
            <Tabs>
                <TabPanel name="a" tab={<span className="tab_point">tab1</span>}>
                    a
                </TabPanel>
                <TabPanel name="b" tab={<span className="tab_point">tab2</span>}>
                    b
                </TabPanel>
                <TabPanel name="c" tab={<span className="tab_point">tab3</span>}>
                    c
                </TabPanel>
            </Tabs>
        </div>
    );
}
