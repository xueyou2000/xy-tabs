import classNames from "classnames";
import React from "react";
import useControll from "utils-hooks/es/useControll";
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
                active: activeKey === tabKey
            };
        }) || [];

    return tabsInfo;
}

export function Tabs(props: TabsProps) {
    const { prefixCls = "xy-tabs", className, style, onChange, renderTabBar = DEFAULT_RenderTabBar, renderTabContent = DEFAULT_renderTabContent, children, lazy, reverse = false, destroyInactiveTabPane } = props;
    const [activeKey, setActiveKey, isControll] = useControll<TabKey>(props, "activeKey", "defaultActiveKey", findDefaultTabKey(children));
    const tabsInfo = findTabsInfo(children, activeKey);

    function handleActiveClick(key: TabKey) {
        if (!isControll) {
            setActiveKey(key);
        }
        if (onChange) {
            onChange(key);
        }
    }

    function onTabClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>, activeKey: TabKey) {
        handleActiveClick(activeKey);
        if (props.onTabClick) {
            props.onTabClick(event, activeKey);
        }
    }

    function doRenderTabBar() {
        return React.cloneElement(renderTabBar(), { prefixCls, activeKey, tabsInfo, onTabClick, key: "tabbar" });
    }

    function doRenderTabContent() {
        return React.cloneElement(renderTabContent(), { prefixCls, activeKey, tabsInfo, lazy, destroyInactiveTabPane, onTabClick, key: "tabcontent" });
    }

    const childrens = [doRenderTabBar(), doRenderTabContent()];

    return (
        <TabsContext.Provider value={{ activeKey, setActiveKey }}>
            <div className={classNames(prefixCls, className)} style={style} data-active-key={activeKey}>
                {reverse ? childrens.reverse() : childrens}
            </div>
        </TabsContext.Provider>
    );
}

export default React.memo<TabsProps>(Tabs);
