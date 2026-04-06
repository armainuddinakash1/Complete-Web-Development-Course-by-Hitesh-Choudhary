import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [color, setColor] = useState("olive");

  return (
      <div className={`w-full h-screen bg-${color}-600 duration-200`}>
          <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
              <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
                  <button
                      className="outline-none px-4 py-1 rounded-full shadow-lg  text-white bg-red-600"
                      onClick={() => setColor("red")}
                  >
                      Red
                  </button>
                  <button
                      className="outline-none px-4 py-1 rounded-full shadow-lg  text-white bg-green-600"
                      onClick={() => setColor("green")}
                  >
                      Green
                  </button>
                  <button
                      className="outline-none px-4 py-1 rounded-full shadow-lg  text-white bg-blue-600"
                      onClick={() => setColor("blue")}
                  >
                      Blue
                  </button>
                  <button
                      className="outline-none px-4 py-1 rounded-full shadow-lg  text-white bg-violet-600"
                      onClick={() => setColor("violet")}
                  >
                      Violet
                  </button>
                  <button
                      className="outline-none px-4 py-1 rounded-full shadow-lg  text-white bg-orange-600"
                      onClick={() => setColor("orange")}
                  >
                      Orange
                  </button>
              </div>
          </div>
      </div>
  );
}

export default App;
