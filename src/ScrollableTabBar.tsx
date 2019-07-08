import classNames from "classnames";
import clamp from "lodash-es/clamp";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TabBarRoot } from "./index";
import { TabBarRootProps, TabKey } from "./interface";

export function ScrollableTabBar(props: TabBarRootProps) {
    const wrapRef = useRef(null);
    const innerRef = useRef(null);
    const { tabsInfo = [], scrollToRef } = props;
    const [left, setLeft] = useState(0);
    const [overflow, setOverflow] = useState(false);

    function checkOverflow() {
        const wrap = wrapRef.current as HTMLElement;
        const inner = innerRef.current as HTMLElement;

        // Tips: 注意元素的过度属性, 包括tab节点的过度, 都会影响计算宽度
        setOverflow(inner.scrollWidth > wrap.clientWidth);
    }

    function getTabWidth() {
        const inner = innerRef.current as HTMLElement;
        const { clientWidth } = inner;
        const tabbarWidth = clientWidth;
        const max = inner.scrollWidth - clientWidth;
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
        if (scrollToRef) {
            scrollToRef.current = scrollTo;
        }

        // TODO: #1  优化监听 window.resize, 并且用节流函数, 封装到hooks库里
        function resize() {
            checkOverflow();
            scrollTo();
        }

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    useLayoutEffect(() => {
        checkOverflow();
        scrollTo();
    }, [props.tabsInfo.length]);

    return (
        <div className={classNames("scrollable-tabbar", { overflow })} ref={wrapRef}>
            <span className="tabs-arrow tab-prev" onClick={prev}>
                <span className="tabs-icon" />
            </span>
            <span className="tabs-arrow tab-next" onClick={next}>
                <span className="tabs-icon" />
            </span>
            <div className="scrollable-tabbar__wrap">
                <TabBarRoot {...props} className="scrollable_inner" style={{ transform: `translateX(-${left}px)` }} ref={innerRef} />
            </div>
        </div>
    );
}

export default React.memo(ScrollableTabBar);
