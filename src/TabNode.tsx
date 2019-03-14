import classNames from "classnames";
import React from "react";
import { TabNodeProps } from "./interface";

export function TabNode(props: TabNodeProps) {
    const { prefixCls, className, tabKey, style, active = false, disabled = false, children, tabIndex } = props;

    const classString = classNames(`${prefixCls}-tab`, className, {
        active,
        disabled
    });

    function handleClick(event: React.MouseEvent<any, MouseEvent>) {
        if (!disabled && props.onClick) {
            props.onClick(event, tabKey);
        }
    }

    return (
        <div role="tab" data-tab-key={tabKey} style={style} className={classString} aria-selected={active} aria-disabled={disabled} tabIndex={tabIndex} onClick={handleClick}>
            {children}
        </div>
    );
}

export default React.memo(TabNode);
