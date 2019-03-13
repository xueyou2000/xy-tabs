import classNames from "classnames";
import React from "react";
import { TabBarRootProps } from "./interface";
import TabNode from "./TabNode";

export function TabBarRoot(props: TabBarRootProps) {
    const { prefixCls, className, style, tabsInfo = [], onTabClick, ref } = props;
    const tabs = tabsInfo.map((info, i) => (
        <TabNode key={info.tabKey} prefixCls={prefixCls} tabIndex={i} {...info} onClick={onTabClick}>
            {info.tab}
        </TabNode>
    ));

    return (
        <div className={classNames(`${prefixCls}-tabbar`, className)} style={style} ref={ref}>
            {tabs}
        </div>
    );
}

export default React.memo(TabBarRoot);
