Currency Converter App Logic

States:

- amount: number (linked to upper input box)
- converted: number (linked to lower input box)
- fromCurrency: string, default "USD" (linked to upper select)
- toCurrency: string, default "BDT" (linked to lower select)
- rates: object (exchange rates fetched from API)
- options: array of currency strings (for both selects)
- activeInput: "upper" | "lower" (to prevent circular updates)

Behavior:

- On mount / when fromCurrency changes: fetch rates for fromCurrency, set options = Object.keys(rates), recalculate converted/amount based on activeInput
- When amount changes (user types in upper box): converted = amount \* rates[toCurrency], activeInput = "upper"
- When converted changes (user types in lower box): amount = converted / rates[toCurrency], activeInput = "lower"
- When toCurrency changes: recalculate based on activeInput

The activeInput flag prevents infinite loops by ensuring only the opposite field gets updated when a user types in one field.
