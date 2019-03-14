import React from "react";
import { TabContentRoot } from "./index";
import { TabContentRootProps } from "./interface";

export function SwipeableTabContent(props: TabContentRootProps) {
    const { activeKey, tabsInfo } = props;
    // 根据激活的 tabKey, 计算需要动画偏移的x距离

    const index = tabsInfo.findIndex((info) => info.tabKey === activeKey);
    return <TabContentRoot style={{ marginLeft: `-${index * 100}%` }} className="tab-content-animated" {...props} />;
}

export default React.memo(SwipeableTabContent);
