/**
 * 选项卡key(唯一)
 */
export type TabKey = string | number;

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
     * 是否翻转
     * @description 默认tabbar在tabcontent的上面
     */
    reverse?: boolean;
    /**
     * 不是激活的content是否不渲染在dom中, 默认false
     */
    destroyInactiveTabPane?: boolean;
    /**
     * 渲染选项卡tab
     * @description 默认用div包裹, 可自行实现, 比如溢出显示箭头
     */
    renderTabBar?: () => JSX.Element;
    /**
     * 渲染选项卡内容
     * @description 默认用div包裹, 可自行实现, 比如切换时内容的动画滑动
     */
    renderTabContent?: () => JSX.Element;
    /**
     * 激活改变事件
     */
    onChange?: (activeKey: TabKey) => void;
    /**
     * tab被点击事件
     * @description 与onChange不同的仅仅是多了原生事件参数, 不仅仅是鼠标事件, 也可能是tab导航并按下了空格
     */
    onTabClick?: (activeKey: TabKey, event?: any) => void;
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
    /**
     * 是否延迟载入content, 默认false
     * @description 非激活content第一次延迟显示,
     */
    lazy?: boolean;
    /**
     * 监听tab面板激活事件
     */
    enterEvents?: Map<TabKey, Function>;
    /**
     * 监听tab面板离开事件
     */
    leaveEvents?: Map<TabKey, Function>;
}

export interface TabPanelContextState {
    /**
     * 当前面板的key
     */
    tabKey: TabKey;
}

export interface TabInfo {
    /**
     * key
     */
    tabKey: TabKey;
    /**
     * tab标签
     */
    tab: React.ReactNode;
    /**
     * tab内容
     */
    panel?: JSX.Element;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否激活
     */
    active?: boolean;
}

export interface TabBarRootProps {
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
     * 当前激活key
     */
    activeKey?: TabKey;
    /**
     * tabs信息
     */
    tabsInfo?: TabInfo[];
    /**
     * tab被点击事件
     * @description 与onChange不同的仅仅是多了原生事件参数, 不仅仅是鼠标事件, 也可能是tab导航并按下了空格
     */
    onTabClick?: (activeKey: TabKey, event?: any) => void;
    /**
     * 获取定位函数
     */
    scrollToRef?: React.MutableRefObject<Function>;
}

export interface TabNodeProps {
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
     * tab索引
     */
    tabIndex?: number;
    /**
     * 是否激活样式
     */
    active?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 选项卡key(唯一)
     */
    tabKey: TabKey;
    /**
     * tab文本
     */
    children?: React.ReactNode;
    /**
     * tab被点击事件
     * @description 与onChange不同的仅仅是多了原生事件参数, 不仅仅是鼠标事件, 也可能是tab导航并按下了空格
     */
    onClick?: (activeKey: TabKey, event: any) => void;
}

export interface TabContentRootProps {
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
     * 当前激活key
     */
    activeKey?: TabKey;
    /**
     * tabs信息
     */
    tabsInfo?: TabInfo[];
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
     * ref
     */
    ref?: React.Ref<any>;
}

export interface TabPanelNodeProps {
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
     * 是否激活样式
     */
    active?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * tab内容
     */
    children?: React.ReactNode;
    /**
     * 选项卡tab内容
     */
    tab: React.ReactNode;
    /**
     * 是否延迟载入content, 默认false
     * @description 非激活content第一次延迟显示,
     */
    lazy?: boolean;
    /**
     * 选项卡key(唯一)
     */
    tabKey: TabKey;
    /**
     * 不是激活的content是否不渲染在dom中, 默认false
     */
    destroyInactiveTabPane?: boolean;
}
