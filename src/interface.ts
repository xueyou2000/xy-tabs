/**
 * 选项卡key(唯一)
 */
export type TabKey = string | number;

export interface TabPanelProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 选项卡tab内容
     */
    tab: React.ReactNode;
    /**
     * 选项卡key(唯一)
     */
    name: TabKey;
    /**
     * 选项卡内容
     */
    children?: React.ReactNode;
}

export interface TabsProps {
    /**
     * TabPanels
     */
    children?: React.ReactNode;
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 激活key
     */
    activeKey?: TabKey;
    /**
     * 默认激活key
     */
    defaultActiveKey?: TabKey;
    /**
     * 是否延迟载入content, 默认false
     * @description 非激活content第一次延迟显示,
     */
    lazy?: boolean;
    /**
     * 不是激活的content是否不渲染在dom中, 默认false
     */
    destroyInactiveTabPane?: boolean;
    /**
     * 渲染选项卡tab
     * @description 默认用div包裹, 可自行实现, 比如溢出显示箭头
     */
    renderTabBar?: (contents: React.ReactNode, activeKey: TabKey) => React.ReactNode;
    /**
     * 渲染选项卡内容
     * @description 默认用div包裹, 可自行实现, 比如切换时内容的动画滑动
     */
    renderTabContent?: (tabs: React.ReactNode, activeKey: TabKey) => React.ReactNode;
    /**
     * 激活改变事件
     */
    onChange?: (activeKey: TabKey) => void;
}

export interface TabsContextType {
    /**
     * 当前激活key
     */
    activeKey?: TabKey;
    /**
     * 设置激活key
     */
    setActiveKey?: (key: TabKey) => void;
}
