import { useId } from "react";

function InputBox({
    label,
    amount,
    onAmountChange,
    currency,
    onCurrencyChange,
    options = []
}) {
    const amountId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex`}>
            <div className="w-1/2">
                <label
                    htmlFor={amountId}
                    className="text-black/40 mb-2 inline-block"
                >
                    {label}
                </label>
                <input
                    type="number"
                    id={amountId}
                    className="outline-none w-full bg-transparent py-1.5"
                    value={amount}
                    onChange={(e) => onAmountChange(Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    value={currency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                    className="rounded-lg px-1 bg-gray-100 cursor-pointer outline-none"
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
