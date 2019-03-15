import React from "react";
import { addParameters, configure, storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import readme from "../README.md";
import Markdown from "./component/MyMarkdown";

import { Tabs } from "../src/Tabs";
import { TabContentRoot } from "../src/TabContentRoot";
import { TabNode } from "../src/TabNode";
import { TabPanelNode } from "../src/TabPanelNode";

import "./index.css";
import "./src/assets/index.scss";

function createExamplesStories() {
    const exampleStories = storiesOf("Examples", module).addParameters({
        options: {
            showPanel: true
        }
    });
    const req = require.context("../examples", true, /.tsx$/);
    req.keys().forEach((filename) => {
        const Example = req(filename).default;
        const name = filename.replace(".tsx", "").replace("./", "");
        exampleStories.add(name, () => <Example />);
    });
}

function loadStories() {
    storiesOf("Introduction", module).add("ReadMe", () => <Markdown source={readme} />);

    storiesOf("Api", module)
        .addDecorator(withInfo)
        .addParameters({ info: { inline: true, source: false } })
        .add("Tabs", () => <Tabs />)
        .add("TabContentRoot", () => <TabContentRoot />)
        .add("TabNode", () => <TabNode />)
        .add("TabPanelNode", () => <TabPanelNode />);

    createExamplesStories();
}

addParameters({
    options: {
        showPanel: false
    }
});
configure(loadStories, module);
