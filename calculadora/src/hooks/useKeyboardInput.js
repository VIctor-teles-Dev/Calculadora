import { useEffect, useState } from "react";

// Hook customizado para gerenciar entrada via teclado
export function useKeyboardInput(
  handleButtonClick,
  displayValue,
  error,
  isModalOpen = false
) {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Se o modal estiver aberto, não intercepta eventos de teclado
      if (isModalOpen) {
        return;
      }

      const key = event.key;

      // Lista de teclas que a calculadora captura
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

      // Previne comportamento padrão apenas para teclas especiais da calculadora
      if (
        calculatorKeys.includes(key) ||
        key === "Enter" ||
        key === "Escape" ||
        key === "Backspace" ||
        key === "Delete"
      ) {
        event.preventDefault();
      }

      let buttonValue = null;

      // Permite digitação de letras (variáveis) EXCETO as reservadas
      if (/^[a-zA-Z]$/.test(key)) {
        // Letras minúsculas/maiúsculas únicas
        if (key.toLowerCase() === "x") {
          // 'x' ou 'X' vira multiplicação
          buttonValue = "*";
          handleButtonClick("*");
        } else if (key.toLowerCase() === "s") {
          // 's' ou 'S' vira raiz quadrada
          buttonValue = "√";
          handleButtonClick("√");
        } else if (key.toLowerCase() === "c") {
          // 'c' ou 'C' vira Clear
          buttonValue = "C";
          handleButtonClick("C");
        } else if (key === "i") {
          // 'i' vira unidade imaginária
          buttonValue = "i";
          handleButtonClick("i");
        } else {
          // Qualquer outra letra vira variável
          handleButtonClick(key.toLowerCase()); // Normaliza para minúscula
          setActiveKey(key.toLowerCase());
          setTimeout(() => setActiveKey(null), 200);
          return; // Já processou, não precisa continuar
        }
      }

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
          buttonValue = "C";
          handleButtonClick("C");
          break;
        case "Backspace":
        case "Delete":
          buttonValue = "DEL";
          handleButtonClick("DEL");
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
  }, [displayValue, error, handleButtonClick, isModalOpen]);

  return activeKey;
}
