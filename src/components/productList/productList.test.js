import React from "react";
import ReactDOM from "react-dom";
import productList from "./productList";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<sproductList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
