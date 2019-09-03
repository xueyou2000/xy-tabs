import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { TabPanelNode, Tabs } from "../src";

describe("xy-tabs", () => {
    test("Click Change Tab", () => {
        const wrapper = render(
            <Tabs>
                <TabPanelNode tabKey="a" tab="tab1">
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab="tab2">
                    b
                </TabPanelNode>
            </Tabs>,
        );

        // tab1默认被选中
        const tab1 = wrapper.getByText("tab1");
        expect(tab1.classList.contains("active")).toBeTruthy();

        // tab2默认没有被选中
        const tab2 = wrapper.getByText("tab2");
        expect(tab2.classList.contains("xy-tabs-tab")).toBeTruthy();
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
                <TabPanelNode tabKey="a" tab="tab1">
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab="tab2">
                    b
                </TabPanelNode>
            </Tabs>,
        );

        const tabWrap = wrapper.container.querySelector(".xy-tabs");
        const tab2 = wrapper.getByText("tab2");
        expect(tab2.classList.contains("active")).toBeTruthy();
        expect(tabWrap.getAttribute("data-active-key")).toBe("b");

        wrapper.rerender(
            <Tabs activeKey="a" onChange={onchange}>
                <TabPanelNode tabKey="a" tab="tab1">
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab="tab2">
                    b
                </TabPanelNode>
            </Tabs>,
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
                <TabPanelNode tabKey="a" tab="tab1">
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab="tab2">
                    b
                </TabPanelNode>
            </Tabs>,
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

    test("Disabled Click Should Invalid", () => {
        const fn = jest.fn();
        const wrapper = render(
            <Tabs onChange={fn}>
                <TabPanelNode tabKey="a" tab="tab1">
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab="tab2">
                    b
                </TabPanelNode>
                <TabPanelNode tabKey="c" tab="tab3" disabled={true}>
                    c
                </TabPanelNode>
            </Tabs>,
        );

        fireEvent.click(wrapper.getByText("tab3"));
        const tabWrap = wrapper.container.querySelector(".xy-tabs");
        expect(tabWrap.getAttribute("data-active-key")).toBe("a");
        expect(fn.mock.calls.length).toBe(0);
    });

    test("Destroy In Active TabPanelNode", () => {
        const wrapper = render(
            <Tabs destroyInactiveTabPane={true}>
                <TabPanelNode tabKey="a" tab="tab1">
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab="tab2">
                    b
                </TabPanelNode>
            </Tabs>,
        );

        const TabPanelNodes = wrapper.container.querySelector(".xy-tabs-tabcontent");
        expect(TabPanelNodes.children.length).toBe(1);
        expect(TabPanelNodes.firstChild.textContent).toBe("a");

        const tab2 = wrapper.getByText("tab2");
        fireEvent.click(tab2);

        expect(TabPanelNodes.children.length).toBe(1);
        expect(TabPanelNodes.firstChild.textContent).toBe("b");
    });

    test("Lazy Load TabPanelNode", () => {
        const wrapper = render(
            <Tabs lazy={true}>
                <TabPanelNode tabKey="a" tab="tab1">
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab="tab2">
                    b
                </TabPanelNode>
            </Tabs>,
        );

        const TabPanelNodes = wrapper.container.querySelector(".xy-tabs-tabcontent");
        expect(TabPanelNodes.children.length).toBe(1);
        expect(TabPanelNodes.firstChild.textContent).toBe("a");

        const tab2 = wrapper.getByText("tab2");
        fireEvent.click(tab2);

        expect(TabPanelNodes.children.length).toBe(2);
        expect(tab2.classList.contains("active")).toBeTruthy();
    });

    test("Trigger onChange", () => {
        const onchange = jest.fn();
        const wrapper = render(
            <Tabs onChange={onchange}>
                <TabPanelNode tabKey="a" tab="tab1">
                    a
                </TabPanelNode>
                <TabPanelNode tabKey="b" tab="tab2">
                    b
                </TabPanelNode>
            </Tabs>,
        );

        fireEvent.click(wrapper.getByText("tab2"));
        expect(onchange).toBeCalled();
    });

    test("When Not TabPanelNode Should Not Error", () => {
        const wrapper = render(<Tabs />);
        const tabWrap = wrapper.container.querySelector(".xy-tabs");
        expect(tabWrap.getAttribute("data-active-key")).toBe("-1");
    });
});
