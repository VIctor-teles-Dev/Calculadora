import React from "react";
import { useCalculator } from "./hooks/useCalculator";
import { useKeyboardInput } from "./hooks/useKeyboardInput";
import {
  StarButtonPurpleDark,
  StarButtonGray,
  StarButtonPurple,
  HistoryButton,
  EqualButton,
} from "./components/Buttons";
import HistoryModal from "./components/HistoryModal";
import { backgroundImage } from "./constants/images";

// Componente principal - aqui tá toda a lógica da calculadora
export default function App() {
  const {
    displayValue,
    lispOutput,
    error,
    history,
    showHistory,
    handleButtonClick,
    toggleHistoryModal,
  } = useCalculator();

  const activeKey = useKeyboardInput(handleButtonClick, displayValue, error);

  return (
    <>
      {/* O Modal de Histórico (só é visível se showHistory for true) */}
      {showHistory && (
        <HistoryModal history={history} onClose={toggleHistoryModal} />
      )}

      <div
        className=" flex items-center justify-center min-h-screen font-sans"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="w-full max-w-md p-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-purple-500/50">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Calculadora LISP
          </h1>

          {/* Tela principal da calculadora */}
          <div className="bg-gray-950 text-white border-2 border-purple-500/30 text-right p-2 rounded-lg mb-2 overflow-x-auto shadow-lg scrollbar-custom">
            {error && <div className="text-pink-400 text-sm">{error}</div>}
            <div
              className="text-4xl font-mono whitespace-nowrap"
              title={displayValue}
            >
              {displayValue || "0"}
            </div>
          </div>

          {/* Tela secundária que mostra a notação LISP */}
          <div
            className="bg-gray-950 text-purple-300 text-right p-2 rounded-lg mb-4 h-12 font-mono text-sm border-2 border-purple-500/30 overflow-x-auto shadow-lg scrollbar-custom"
            title={lispOutput}
          >
            {lispOutput || "Notação LISP..."}
          </div>

          {/* Grade de botões */}
          <div className="grid grid-cols-5 grid-rows-6  gap-2">
            {/* Linha 1: parênteses, i, DEL e C */}
            <StarButtonPurple
              value="("
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              (
            </StarButtonPurple>
            <StarButtonPurple
              value=")"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              )
            </StarButtonPurple>
            <StarButtonPurple
              value="i"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              i
            </StarButtonPurple>
            <StarButtonPurpleDark
              value="DEL"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              ⌫
            </StarButtonPurpleDark>
            <StarButtonPurpleDark
              value="C"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              C
            </StarButtonPurpleDark>

            {/* Linha 2: números 7, 8, 9 e operadores ÷ e % */}
            <StarButtonGray
              value="7"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              7
            </StarButtonGray>
            <StarButtonGray
              value="8"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              8
            </StarButtonGray>
            <StarButtonGray
              value="9"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              9
            </StarButtonGray>
            <StarButtonPurple
              value="/"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              ÷
            </StarButtonPurple>
            <StarButtonPurple
              value="%"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              %
            </StarButtonPurple>

            {/* Linha 3: números 4, 5, 6 e operadores * e ^ */}
            <StarButtonGray
              value="4"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              4
            </StarButtonGray>
            <StarButtonGray
              value="5"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              5
            </StarButtonGray>
            <StarButtonGray
              value="6"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              6
            </StarButtonGray>
            <StarButtonPurple
              value="*"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              X
            </StarButtonPurple>
            <StarButtonPurple
              value="^"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              ^
            </StarButtonPurple>

            {/* Linha 4: números 1, 2, 3 e operador - */}
            <StarButtonGray
              value="1"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              1
            </StarButtonGray>
            <StarButtonGray
              value="2"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              2
            </StarButtonGray>
            <StarButtonGray
              value="3"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              3
            </StarButtonGray>
            <StarButtonPurple
              value="-"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              -
            </StarButtonPurple>

            {/* Linha 5: √, 0, ponto, =, + e conjugado */}
            <StarButtonPurple
              value="√"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              √
            </StarButtonPurple>
            <StarButtonGray
              value="0"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              0
            </StarButtonGray>
            <StarButtonGray
              value="."
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              .
            </StarButtonGray>
            <StarButtonPurpleDark
              value="="
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              =
            </StarButtonPurpleDark>
            <StarButtonPurple
              value="+"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              +
            </StarButtonPurple>
            <StarButtonPurple
              value="conj"
              onClick={handleButtonClick}
              activeKey={activeKey}
            >
              c̄
            </StarButtonPurple>

            {/* Linha 6: botões grandes de Histórico e Equal */}
            <HistoryButton onClick={toggleHistoryModal}>
              <h1 style={{ fontSize: "30px", fontFamily: "Orbitron" }}>
                Histórico
              </h1>
            </HistoryButton>

            <EqualButton value="equal" onClick={handleButtonClick}>
              <h1 style={{ fontSize: "40px", fontFamily: "Orbitron" }}>
                equal
              </h1>
            </EqualButton>
          </div>
        </div>
      </div>
    </>
  );
}
