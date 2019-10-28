import React from "react";
import { TabPanelContextState } from "./interface";

export const TabPanelContext = React.createContext<TabPanelContextState>({ tabKey: "" });
