import { action } from "@storybook/addon-actions";
import React from "react";
import { TabPanel, Tabs } from "../src";
import "../src/assets/index.scss";

export default function() {
    function handleChange() {
        setTimeout(() => {
            const lis = document.querySelectorAll(".tabs-content li");
            action("onChange")(lis, lis.length);
        }, 100);
    }

    return (
        <div>
            <h1>懒加载</h1>
            <p>默认只加载激活的TabPanel, 激活过的TabPanel将被缓存</p>
            <Tabs style={{ width: "300px" }} onChange={handleChange} lazy={true}>
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
