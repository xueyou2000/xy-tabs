import React from "react";
import { render, fireEvent } from "react-testing-library";
import { TabPanel, Tabs } from "../src";

describe("xy-tabs", () => {
    test("Click Change Tab", () => {
        const wrapper = render(
            <Tabs>
                <TabPanel name="a" tab="tab1">
                    a
                </TabPanel>
                <TabPanel name="b" tab="tab2">
                    b
                </TabPanel>
            </Tabs>
        );

        // tab1默认被选中
        const tab1 = wrapper.getByText("tab1");
        expect(tab1.classList.contains("active")).toBeTruthy();

        // tab2默认没有被选中
        const tab2 = wrapper.getByText("tab2");
        expect(tab2.classList.contains("tab-header-item")).toBeTruthy();
        expect(tab2.classList.contains("active")).toBeFalsy();
        expect(tab2.getAttribute("data-tab-key")).toBe("b");

        // 模拟点击tab2
        fireEvent.click(tab2);
        expect(tab2.classList.contains("active")).toBeTruthy();
    });

    test("Props Change Tab", () => {
        const onchange = jest.fn();
        const wrapper = render(
            <Tabs activeKey="b" onChange={onchange}>
                <TabPanel name="a" tab="tab1">
                    a
                </TabPanel>
                <TabPanel name="b" tab="tab2">
                    b
                </TabPanel>
            </Tabs>
        );

        const tabWrap = wrapper.container.querySelector(".xy-tabs");
        const tab2 = wrapper.getByText("tab2");
        expect(tab2.classList.contains("active")).toBeTruthy();
        expect(tabWrap.getAttribute("data-active-key")).toBe("b");

        wrapper.rerender(
            <Tabs activeKey="a" onChange={onchange}>
                <TabPanel name="a" tab="tab1">
                    a
                </TabPanel>
                <TabPanel name="b" tab="tab2">
                    b
                </TabPanel>
            </Tabs>
        );

        const tab1 = wrapper.getByText("tab1");
        expect(tab1.classList.contains("active")).toBeTruthy();
        expect(tabWrap.getAttribute("data-active-key")).toBe("a");

        // 重要: 通过props改变选中tab, 不会触发onChange
        expect(onchange.mock.calls.length).toBe(0);
    });

    test("Default Active Key", () => {
        const onchange = jest.fn();
        const wrapper = render(
            <Tabs defaultActiveKey="b" onChange={onchange}>
                <TabPanel name="a" tab="tab1">
                    a
                </TabPanel>
                <TabPanel name="b" tab="tab2">
                    b
                </TabPanel>
            </Tabs>
        );

        const tabWrap = wrapper.container.querySelector(".xy-tabs");
        const tab2 = wrapper.getByText("tab2");
        expect(tab2.classList.contains("active")).toBeTruthy();
        expect(tabWrap.getAttribute("data-active-key")).toBe("b");

        const tab1 = wrapper.getByText("tab1");
        fireEvent.click(tab1);

        expect(tab1.classList.contains("active")).toBeTruthy();
        expect(tabWrap.getAttribute("data-active-key")).toBe("a");

        expect(onchange).toBeCalled();
    });

    test("Destroy In Active TabPanel", () => {
        const wrapper = render(
            <Tabs destroyInactiveTabPane={true}>
                <TabPanel name="a" tab="tab1">
                    a
                </TabPanel>
                <TabPanel name="b" tab="tab2">
                    b
                </TabPanel>
            </Tabs>
        );

        const tabpanels = wrapper.container.querySelector(".tabs-content");
        expect(tabpanels.children.length).toBe(1);
        expect(tabpanels.firstChild.textContent).toBe("a");

        const tab2 = wrapper.getByText("tab2");
        fireEvent.click(tab2);

        expect(tabpanels.children.length).toBe(1);
        expect(tabpanels.firstChild.textContent).toBe("b");
    });

    test("Lazy Load TabPanel", () => {
        const wrapper = render(
            <Tabs lazy={true}>
                <TabPanel name="a" tab="tab1">
                    a
                </TabPanel>
                <TabPanel name="b" tab="tab2">
                    b
                </TabPanel>
            </Tabs>
        );

        const tabpanels = wrapper.container.querySelector(".tabs-content");
        expect(tabpanels.children.length).toBe(1);
        expect(tabpanels.firstChild.textContent).toBe("a");

        const tab2 = wrapper.getByText("tab2");
        fireEvent.click(tab2);

        expect(tabpanels.children.length).toBe(2);
        expect(tab2.classList.contains("active")).toBeTruthy();
    });

    test("Trigger onChange", () => {
        const onchange = jest.fn();
        const wrapper = render(
            <Tabs onChange={onchange}>
                <TabPanel name="a" tab="tab1">
                    a
                </TabPanel>
                <TabPanel name="b" tab="tab2">
                    b
                </TabPanel>
            </Tabs>
        );

        fireEvent.click(wrapper.getByText("tab2"));
        expect(onchange).toBeCalled();
    });

    test("When Not TabPanel Should Not Error", () => {
        const wrapper = render(<Tabs />);
        const tabWrap = wrapper.container.querySelector(".xy-tabs");
        expect(tabWrap.getAttribute("data-active-key")).toBe("-1");
    });

    test("Custom TabBar", () => {
        const wrapper = render(
            <Tabs
                renderTabBar={(children, activeKey) => (
                    <div className="custom-tabs-header" data-my-active={activeKey}>
                        {children}
                    </div>
                )}
            >
                <TabPanel name="a" tab="tab1">
                    a
                </TabPanel>
                <TabPanel name="b" tab="tab2">
                    b
                </TabPanel>
            </Tabs>
        );

        const tab1 = wrapper.getByText("tab1");
        const customTabsWrap = tab1.parentElement;

        expect(customTabsWrap.classList.contains("custom-tabs-header")).toBeTruthy();
        expect(customTabsWrap.getAttribute("data-my-active")).toBe("a");
    });

    test("Custom TabContent", () => {
        const wrapper = render(
            <Tabs
                renderTabContent={(children, activeKey) => (
                    <div className="custom-tabs-content" data-my-active={activeKey}>
                        {children}
                    </div>
                )}
            >
                <TabPanel name="a" tab="tab1">
                    a
                </TabPanel>
                <TabPanel name="b" tab="tab2">
                    b
                </TabPanel>
            </Tabs>
        );

        const tabpanel = wrapper.getByText("a");
        const customTabsWrap = tabpanel.parentElement.parentElement;

        expect(customTabsWrap.classList.contains("custom-tabs-content")).toBeTruthy();
        expect(customTabsWrap.getAttribute("data-my-active")).toBe("a");
    });
});
