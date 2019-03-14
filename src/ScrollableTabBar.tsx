import classNames from "classnames";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import clamp from "lodash-es/clamp";
import { TabBarRootProps, TabKey } from "./interface";
import { TabBarRoot } from "./index";

export function ScrollableTabBar(props: TabBarRootProps) {
    const wrapRef = useRef();
    const innerRef = useRef();
    const { tabsInfo = [], scrollToRef: scrollToActiveRef } = props;
    const [left, setLeft] = useState(0);
    const [overflow, setOverflow] = useState(false);

    function checkOverflow() {
        const inner = innerRef.current as HTMLElement;
        setOverflow(inner.scrollWidth > inner.clientWidth);
    }

    function getTabWidth() {
        const tabbarInner = wrapRef.current as HTMLElement;
        const inner = innerRef.current as HTMLElement;
        const tabbarWidth = tabbarInner.clientWidth;
        const max = inner.scrollWidth - tabbarInner.clientWidth;
        return [tabbarWidth, max];
    }

    function findLeft(tabKey: TabKey): [number, HTMLElement] {
        const inner = innerRef.current as HTMLElement;
        const tab = inner.querySelector(`[data-tab-key="${tabKey}"]`) as HTMLElement;
        if (!tab) {
            return [0, tab];
        }
        const [, max] = getTabWidth();
        return [clamp(tab.offsetLeft, 0, max), tab];
    }

    /**
     * 滚动到指定tab
     * @param tabKey 默认当前激活tabkey
     */
    function scrollTo(tabKey = props.activeKey) {
        setLeft(findLeft(tabKey)[0]);
    }

    function prev() {
        const [tabbarWidth, max] = getTabWidth();
        const distance = clamp(left - tabbarWidth, 0, max);
        const first = tabsInfo[0];
        const [, tab] = findLeft(first ? first.tabKey : null);

        if (tab && distance - tab.clientWidth < 0) {
            // 还剩下不到一个tab的距离, 则直接定位到第一个
            setLeft(0);
        } else {
            setLeft(distance);
        }
    }

    function next() {
        const [tabbarWidth, max] = getTabWidth();
        const distance = clamp(left + tabbarWidth, 0, max);
        const last = tabsInfo[tabsInfo.length - 1];
        const [lastLeft, tab] = findLeft(last ? last.tabKey : null);
        if (tab && distance + tab.clientWidth > lastLeft) {
            // 接近最后一个tab, 则直接滚动到最后一个
            setLeft(lastLeft);
        } else {
            setLeft(distance);
        }
    }

    useEffect(() => {
        if (scrollToActiveRef) {
            scrollToActiveRef.current = scrollTo;
        }
    }, []);

    useLayoutEffect(() => {
        // TODO: #1 监听 window.resize, 并且用节流函数
        checkOverflow();
        scrollTo();
    }, [props.tabsInfo.length]);

    return (
        <div className={classNames("scrollable-tabbar", { overflow })}>
            {overflow && (
                <React.Fragment>
                    <span className="tabs-arrow tab-prev" onClick={prev}>
                        <span className="tabs-icon" />
                    </span>
                    <span className="tabs-arrow tab-next" onClick={next}>
                        <span className="tabs-icon" />
                    </span>
                </React.Fragment>
            )}

            <div className="scrollable-tabbar__wrap" ref={wrapRef}>
                <TabBarRoot {...props} className={classNames("scrollable_inner", { overflow })} style={{ transform: `translateX(-${left}px)` }} ref={innerRef} />
            </div>
        </div>
    );
}

export default React.memo(ScrollableTabBar);
