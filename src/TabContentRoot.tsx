import classNames from "classnames";
import React from "react";
import { TabContentRootProps } from "./interface";

export function TabContentRoot(props: TabContentRootProps) {
    const { prefixCls, className, style, tabsInfo = [], lazy, destroyInactiveTabPane, ref } = props;

    return (
        <div className={classNames(`${prefixCls}-tabcontent`, className)} style={style} ref={ref}>
            {tabsInfo.map((info) =>
                React.cloneElement(info.panel, {
                    prefixCls,
                    lazy,
                    key: info.tabKey,
                    ...info,
                    destroyInactiveTabPane
                })
            )}
        </div>
    );
}

export default React.memo(TabContentRoot);
