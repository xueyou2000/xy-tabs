import React from "react";
import classNames from "classnames";
import { TabPanelProps } from "./interface";

/**
 * TabPanel必须作为tabs的直接子元素
 */
export function TabPanel(props: TabPanelProps) {
    const { prefixCls = "xy-tabpanel", className, style, children, name } = props;
    return (
        <div className={classNames([prefixCls, className])} style={style}>
            {children}
        </div>
    );
}

export default React.memo<TabPanelProps>(TabPanel);
