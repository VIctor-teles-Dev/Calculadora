import { useEffect, useState } from "react";

// Hook customizado para gerenciar entrada via teclado
export function useKeyboardInput(handleButtonClick, displayValue, error) {
const [activeKey, setActiveKey] = useState(null);

useEffect(() => {
    const handleKeyDown = (event) => {
    const key = event.key;

    const calculatorKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "*",
        "/",
        ".",
        "(",
        ")",
        "i",
        "^",
        "%",
    ];

    if (
        calculatorKeys.includes(key) ||
        key === "Enter" ||
        key === "Escape" ||
        key === "Backspace" ||
        key === "delete"
    ) {
        event.preventDefault();
    }

    let buttonValue = null;

    switch (key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
        case "+":
        case "-":
        case "*":
        case "/":
        case "(":
        case ")":
        case "i":
        case "^":
        case "%":
        buttonValue = key;
        handleButtonClick(key);
        break;
        case "Enter":
        case "=":
        buttonValue = "=";
        handleButtonClick("=");
        break;
        case "Escape":
        case "c":
        case "C":
        buttonValue = "C";
        handleButtonClick("C");
        break;

        case "Backspace":
        case "Delete":
        buttonValue = "DEL";
        handleButtonClick("DEL");
        break;

        case "s":
        case "S":
        buttonValue = "√";
        handleButtonClick("√");
        break;

        case "x":
        case "X":
        buttonValue = "*";
        handleButtonClick("*");
        break;

        default:
        break;
    }

    if (buttonValue) {
        setActiveKey(buttonValue);
        setTimeout(() => setActiveKey(null), 200);
    }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
    window.removeEventListener("keydown", handleKeyDown);
    };
}, [displayValue, error, handleButtonClick]);

return activeKey;
}
