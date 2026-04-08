import { useCallback, useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
    const [length, setLength] = useState(8);
    const [numbersAllowed, setNumbersAllowed] = useState(false);
    const [specialCharactersAllowed, setSpecialCharacterAllowed] =
        useState(false);
    const [password, setPassword] = useState("");
    const [copyBtnText, setCopyBtnText] = useState("copy");
    const passwordRef = useRef(null);

    const generatePassword = useCallback(() => {
        let pass = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" +
            (numbersAllowed ? "0123456789" : "") +
            (specialCharactersAllowed ? "!@#$%^&*()_+" : "");
        for (let i = 0; i < length; i++) {
            const randomIndex =
                crypto.getRandomValues(new Uint32Array(1))[0] %
                characters.length;
            pass += characters.charAt(randomIndex);
        }
        setPassword(pass);
        setCopyBtnText("copy");
    }, [
        length,
        numbersAllowed,
        specialCharactersAllowed,
        setPassword,
        setCopyBtnText,
    ]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopyBtnText("copied!");
        passwordRef.current?.select();
    };

    return (
        <div className="w-full h-screen bg-blue-300 py-8">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500">
                <h1 className="text-3xl font-bold mb-2">Password Generator</h1>
                <div className="flex shadow rounded-lg overflow-hidden mb-4">
                    <input
                        type="text"
                        value={password}
                        className="outline-none w-full py-1 px-3 bg-amber-50 text-black"
                        placeholder="Password"
                        readOnly
                        ref={passwordRef}
                    />
                    <button
                        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer"
                        onClick={copyToClipboard}
                        id="copy-btn"
                    >
                        {copyBtnText}
                    </button>
                </div>
                <div className="flex text-sm gap-x-2">
                    <div className="flex items-center gap-x-1">
                        <input
                            type="range"
                            min={8}
                            max={100}
                            value={length}
                            className="cursor-pointer"
                            onChange={(e) => setLength(e.target.value)}
                            name=""
                            id="length"
                        />
                        <label htmlFor="length">Length: {length}</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            checked={numbersAllowed}
                            onChange={() => {
                                setNumbersAllowed((prev) => !prev);
                            }}
                            name=""
                            id="numbers"
                            className="cursor-pointer"
                        />
                        <label htmlFor="numbers">Include Numbers</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            checked={specialCharactersAllowed}
                            onChange={() => {
                                setSpecialCharacterAllowed((prev) => !prev);
                            }}
                            name=""
                            id="special"
                            className="cursor-pointer"
                        />
                        <label htmlFor="special">
                            Include Special Characters
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
