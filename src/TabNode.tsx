import classNames from "classnames";
import React from "react";
import { TabNodeProps } from "./interface";

export function TabNode(props: TabNodeProps) {
    const { prefixCls, className, tabKey, style, active = false, disabled = false, children, tabIndex } = props;

    const classString = classNames(`${prefixCls}-tab`, className, {
        active,
        disabled
    });

    function handleClick(event: any) {
        if (!disabled && props.onClick) {
            props.onClick(tabKey, event);
        }
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.keyCode === 32) {
            handleClick(event);
        }
    }

    return (
        <div role="tab" data-tab-key={tabKey} style={style} className={classString} aria-selected={active} aria-disabled={disabled} tabIndex={tabIndex} onClick={handleClick} onKeyPress={handleKeyPress}>
            {children}
        </div>
    );
}

export default React.memo(TabNode);
