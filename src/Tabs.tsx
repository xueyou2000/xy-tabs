import classNames from "classnames";
import React, { useRef } from "react";
import useControll from "utils-hooks/es/useControll";
import { TabKey, TabsProps } from "./interface";
import { TabsContext } from "./TabsContext";

function useTabPanelLoadRecod(childrens: React.ReactNode[], activeKey: TabKey) {
    const recod = {};
    childrens.forEach((d: any) => {
        const { name } = d.props;
        recod[name] = name === activeKey;
    });
    return useRef(recod);
}

export function Tabs(props: TabsProps) {
    const { prefixCls = "xy-tabs", className, style, onChange, renderTabBar, renderTabContent, lazy, destroyInactiveTabPane } = props;
    // React.Children的函数非常消耗性能, 所以缓存一次减少调用
    const childrens = React.Children.map(props.children, (d) => d) || [];
    let firstTabKey = "-1";
    if (childrens.length > 0) {
        firstTabKey = (childrens[0] as any).props.name;
    }
    const [activeKey, setActiveKey, isControll] = useControll<TabKey>(props, "activeKey", "defaultActiveKey", firstTabKey);
    // 记录tabPanel是否延迟加载完毕
    const recodRef = useTabPanelLoadRecod(childrens, activeKey);

    function handleActiveClick(key: TabKey) {
        if (!isControll) {
            setActiveKey(key);
        }
        if (onChange) {
            onChange(key);
        }
    }

    function doRenderTabBar() {
        const tabs = childrens.map((node: any) => {
            const { name, tab } = node.props;
            return (
                <li key={name} data-tab-key={name} onClick={() => handleActiveClick(name)} className={classNames("tab-header-item", { active: name === activeKey })}>
                    {tab}
                </li>
            );
        });

        if (renderTabBar) {
            return renderTabBar(tabs, activeKey);
        } else {
            return <ul className="tabs-header">{tabs}</ul>;
        }
    }

    function doRenderTabContent() {
        const contents = childrens.map((node: any) => {
            const { name } = node.props;
            const isActive = name === activeKey;
            if (destroyInactiveTabPane && !isActive) {
                return null;
            }

            // 延迟加载
            if (lazy && !recodRef.current[name] && !isActive) {
                return null;
            } else {
                if (!recodRef.current[name]) {
                    recodRef.current[name] = true;
                }
            }

            return (
                <li key={name} data-content-key={name} className={classNames("tab-content-item", { active: isActive })}>
                    {node}
                </li>
            );
        });

        if (renderTabContent) {
            return renderTabContent(contents, activeKey);
        } else {
            return <ul className="tabs-content">{contents}</ul>;
        }
    }

    return (
        <TabsContext.Provider value={{ activeKey, setActiveKey }}>
            <div className={classNames(prefixCls, className)} style={style} data-active-key={activeKey}>
                {doRenderTabBar()}
                {doRenderTabContent()}
            </div>
        </TabsContext.Provider>
    );
}

export default React.memo<TabsProps>(Tabs);
