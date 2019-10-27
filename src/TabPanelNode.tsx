import classNames from "classnames";
import React, { useRef } from "react";
import { TabPanelNodeProps } from "./interface";

export function TabPanelNode(props: TabPanelNodeProps) {
    const { prefixCls, className, style, active, disabled, tabKey, children, lazy, destroyInactiveTabPane } = props;
    const cached = useRef(active);
    const classString = classNames(`${prefixCls}-tabpanel`, className, {
        active,
        disabled,
    });

    if (!active && (destroyInactiveTabPane || (lazy && !cached.current))) {
        // 输出占位符而不是 null, 避免动画Content, 计算 100% 时候不正确
        return (
            <div role="tabpanel" data-content-key={tabKey} style={style} className={classString} aria-hidden={!active}>
                {""}
            </div>
        );
    } else if (!cached.current) {
        // 标记已经缓存过 tabPanel了
        cached.current = true;
    }

    return (
        <div role="tabpanel" data-content-key={tabKey} style={style} className={classString} aria-hidden={!active}>
            {children}
        </div>
    );
}

export default React.memo(TabPanelNode);
