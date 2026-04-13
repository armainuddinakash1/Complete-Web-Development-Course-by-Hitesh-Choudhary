import "./App.css";
import { useEffect, useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
    const [amount, setAmount] = useState(1);
    const [converted, setConverted] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("BDT");
    const [activeInput, setActiveInput] = useState("upper");

    const rates = useCurrencyInfo(fromCurrency);
    const options = Object.keys(rates);

    // Calculate converted when rates change or when amount/toCurrency changes
    useEffect(() => {
        if (rates[toCurrency]) {
            if (activeInput === "upper") {
                setConverted(amount * rates[toCurrency]);
            } else {
                setAmount(converted / rates[toCurrency]);
            }
        }
    }, [rates, amount, converted, toCurrency, activeInput]);

    // Handle amount change (upper input)
    const handleAmountChange = (value) => {
        setAmount(value);
        setActiveInput("upper");
        if (rates[toCurrency]) {
            setConverted(value * rates[toCurrency]);
        }
    };

    // Handle converted change (lower input)
    const handleConvertedChange = (value) => {
        setConverted(value);
        setActiveInput("lower");
        if (rates[toCurrency]) {
            setAmount(value / rates[toCurrency]);
        }
    };

    // Handle fromCurrency change
    const handleFromCurrencyChange = (currency) => {
        setFromCurrency(currency);
        // Rates will be refetched automatically by the hook
    };

    // Handle toCurrency change
    const handleToCurrencyChange = (currency) => {
        setToCurrency(currency);
        if (activeInput === "upper" && rates[currency]) {
            setConverted(amount * rates[currency]);
        } else if (activeInput === "lower" && rates[currency]) {
            setAmount(converted / rates[currency]);
        }
    };

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(https://res.cloudinary.com/dvomhgavh/image/upload/v1775702382/Untitled_design_vmtsi3.webp)`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto rounded-lg p-5 background-blur-sm bg-white/30">
                    <div>
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                onAmountChange={handleAmountChange}
                                currency={fromCurrency}
                                onCurrencyChange={handleFromCurrencyChange}
                                options={options}
                            />
                        </div>
                        <div className="w-full mb-1">
                            <InputBox
                                label="To"
                                amount={converted}
                                onAmountChange={handleConvertedChange}
                                currency={toCurrency}
                                onCurrencyChange={handleToCurrencyChange}
                                options={options}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
