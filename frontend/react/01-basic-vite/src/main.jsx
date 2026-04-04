import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";

const ReactElement = {
  type: "a",
  props: {
    href: "https://www.google.com",
    target: "_blank",
  },
  children: "Visit Google",
};

// const root = document.getElementById('root');
// customRender(reactElement, root);

function MyApp() {
  return (
    <div>
      <h1>My App</h1>
    </div>
  );
}

const AnotherElement = (
  <a href="https://google.com" target="_blank" >Visit Google</a>
)

const realReactElement = React.createElement(
  'a',
  {
    href: 'https://google.com',
    target: '_blank'
  },
  'click to visit google'
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <App />
  </StrictMode>,
);
