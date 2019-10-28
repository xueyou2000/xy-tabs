import { useContext } from "react";
import { useMount } from "utils-hooks";
import { TabPanelContext } from "./TabPanelContext";
import { TabsContext } from "./TabsContext";

/**
 * tab面板激活事件
 * @param func
 */
export function useTabEnter(func: Function) {
    const tabsContext = useContext(TabsContext);
    const panelContext = useContext(TabPanelContext);

    useMount(() => {
        // 懒加载模式下主动调用一次
        if (tabsContext.lazy || tabsContext.activeKey === panelContext.tabKey) {
            func();
        }
        tabsContext.enterEvents.set(panelContext.tabKey, func);
        return () => tabsContext.enterEvents.delete(panelContext.tabKey);
    });
}

/**
 * tab面板离开事件
 * @param func
 */
export function useTabLeave(func: Function) {
    const tabsContext = useContext(TabsContext);
    const panelContext = useContext(TabPanelContext);

    useMount(() => {
        tabsContext.leaveEvents.set(panelContext.tabKey, func);
        return () => tabsContext.leaveEvents.delete(panelContext.tabKey);
    });
}
