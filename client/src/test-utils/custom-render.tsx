import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";

export const renderWithRouter = (ui: ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    //user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
