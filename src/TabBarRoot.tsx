import classNames from "classnames";
import React from "react";
import { TabBarRootProps } from "./interface";
import TabNode from "./TabNode";

export const TabBarRoot = React.forwardRef((props: TabBarRootProps, ref: any) => {
    const { prefixCls, className, style, tabsInfo = [], onTabClick } = props;
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
});

export default React.memo(TabBarRoot);
