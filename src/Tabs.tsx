import classNames from "classnames";
import React, { useCallback, useRef } from "react";
import { useControll, useMount } from "utils-hooks";
import { TabKey, TabsProps } from "./interface";
import TabBarRoot from "./TabBarRoot";
import TabContentRoot from "./TabContentRoot";
import { TabsContext } from "./TabsContext";

const DEFAULT_KEY = "-1";
const DEFAULT_RenderTabBar = () => <TabBarRoot />;
const DEFAULT_renderTabContent = () => <TabContentRoot />;

function findDefaultTabKey(children: React.ReactNode) {
    let firstTabKey = DEFAULT_KEY;

    React.Children.forEach(children, (d: any) => {
        if (firstTabKey === DEFAULT_KEY) {
            firstTabKey = d.props.tabKey;
        }
    });

    return firstTabKey;
}

function findTabsInfo(children: React.ReactNode, activeKey: TabKey) {
    const tabsInfo =
        React.Children.map(children, (d: any) => {
            const { tabKey, tab, disabled } = d.props;
            return {
                tabKey,
                tab,
                panel: d,
                disabled,
                active: activeKey === tabKey,
            };
        }) || [];

    return tabsInfo;
}

export function Tabs(props: TabsProps) {
    const {
        prefixCls = "xy-tabs",
        className,
        style,
        onChange,
        renderTabBar = DEFAULT_RenderTabBar,
        renderTabContent = DEFAULT_renderTabContent,
        children,
        lazy,
        reverse = false,
        destroyInactiveTabPane,
    } = props;
    const [activeKey, setActiveKey, isControll] = useControll<TabKey>(props, "activeKey", "defaultActiveKey", findDefaultTabKey(children));
    const tabsInfo = findTabsInfo(children, activeKey);
    // 进入事件map
    const EnterEventsRef = useRef(new Map<TabKey, Function>());
    // 离开事件map
    const LeaveEventsRef = useRef(new Map<TabKey, Function>());

    function handleActiveClick(key: TabKey, event?: any) {
        const enterEvents = EnterEventsRef.current;
        const leaveEvents = LeaveEventsRef.current;
        if (activeKey !== key) {
            if (leaveEvents.get(activeKey)) {
                // 发送离开事件
                leaveEvents.get(activeKey)();
            }
            if (enterEvents.get(key)) {
                // 发送进入事件
                enterEvents.get(key)();
            }
        }

        if (!isControll) {
            setActiveKey(key);
        }
        if (onChange) {
            onChange(key);
        }
        if (props.onTabClick) {
            props.onTabClick(activeKey, event);
        }
    }

    function doRenderTabBar() {
        return React.cloneElement(renderTabBar(), { prefixCls, activeKey, tabsInfo, onTabClick: handleActiveClick, key: "tabbar" });
    }

    function doRenderTabContent() {
        return React.cloneElement(renderTabContent(), { prefixCls, activeKey, tabsInfo, lazy, destroyInactiveTabPane, key: "tabcontent" });
    }

    const childrens = [doRenderTabBar(), doRenderTabContent()];

    return (
        <TabsContext.Provider value={{ activeKey, setActiveKey, lazy, enterEvents: EnterEventsRef.current, leaveEvents: LeaveEventsRef.current }}>
            <div className={classNames(prefixCls, className)} style={style} data-active-key={activeKey}>
                {reverse ? childrens.reverse() : childrens}
            </div>
        </TabsContext.Provider>
    );
}

export default React.memo<TabsProps>(Tabs);
