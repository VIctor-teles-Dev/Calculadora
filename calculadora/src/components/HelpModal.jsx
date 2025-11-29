import React, { useEffect } from "react";

// Modal de ajuda com informações sobre funções e atalhos
const HelpModal = ({ onClose }) => {
  // Fecha o modal ao pressionar ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-full max-w-2xl border-2 border-purple-500/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Ajuda - Funções e Atalhos
          </h2>
          <button
            onClick={onClose}
            className="text-purple-400 hover:text-pink-400 text-3xl font-bold transition-colors duration-200"
          >
            &times;
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-4 scrollbar-custom">
          {/* Seção: Funções Matemáticas */}
          <div className="bg-gray-950 p-4 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-3">
              Funções Matemáticas
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">√</span>
                <span className="text-white">Raiz quadrada (ex: √16 = 4)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">^</span>
                <span className="text-white">Potenciação (ex: 2^3 = 8)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">conj</span>
                <span className="text-white">
                  Conjugado complexo (ex: conj(3+4i) = 3-4i)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">equal</span>
                <span className="text-white">
                  Módulo/Valor absoluto (ex: equal(3+4i) = 5)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">i</span>
                <span className="text-white">
                  Unidade imaginária (ex: 2+3i)
                </span>
              </div>
            </div>
          </div>

          {/* Seção: Atalhos de Teclado - Números e Operadores */}
          <div className="bg-gray-950 p-4 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-3">
              Atalhos - Números e Operadores
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-purple-300 font-mono">0-9</span>
                <span className="text-white ml-2">→ Números</span>
              </div>
              <div>
                <span className="text-purple-300 font-mono">.</span>
                <span className="text-white ml-2">→ Ponto decimal</span>
              </div>
              <div>
                <span className="text-purple-300 font-mono">+</span>
                <span className="text-white ml-2">→ Adição</span>
              </div>
              <div>
                <span className="text-purple-300 font-mono">-</span>
                <span className="text-white ml-2">→ Subtração</span>
              </div>
              <div>
                <span className="text-purple-300 font-mono">*</span>
                <span className="text-white ml-2">→ Multiplicação</span>
              </div>
              <div>
                <span className="text-purple-300 font-mono">/</span>
                <span className="text-white ml-2">→ Divisão</span>
              </div>
              <div>
                <span className="text-purple-300 font-mono">^</span>
                <span className="text-white ml-2">→ Potência</span>
              </div>
              <div>
                <span className="text-purple-300 font-mono">( )</span>
                <span className="text-white ml-2">→ Parênteses</span>
              </div>
            </div>
          </div>

          {/* Seção: Atalhos de Teclado - Comandos */}
          <div className="bg-gray-950 p-4 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-3">
              Atalhos - Comandos
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">Enter / =</span>
                <span className="text-white">Calcular resultado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">Esc / c</span>
                <span className="text-white">Limpar (Clear)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">
                  Backspace / Delete
                </span>
                <span className="text-white">Apagar último caractere</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">s</span>
                <span className="text-white">Raiz quadrada (√)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">x</span>
                <span className="text-white">Multiplicação (*)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-300 font-mono">i</span>
                <span className="text-white">Unidade imaginária</span>
              </div>
            </div>
          </div>

          {/* Seção: Variáveis */}
          <div className="bg-gray-950 p-4 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-3">
              Variáveis
            </h3>
            <div className="space-y-2 text-sm text-white">
              <p>
                <span className="text-purple-300 font-mono">a-z</span> → Digite
                qualquer letra para criar uma variável
              </p>
              <p className="text-purple-300/80 italic">
                Exemplo: "x+5" → Calculadora pedirá o valor de x
              </p>
              <p className="text-purple-300/80 italic">
                Variáveis podem ser números reais ou complexos!
              </p>
            </div>
          </div>

          {/* Seção: Números Complexos */}
          <div className="bg-gray-950 p-4 rounded-lg border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-3">
              Números Complexos
            </h3>
            <div className="space-y-2 text-sm text-white">
              <p>Suporte completo para operações com números complexos:</p>
              <p className="text-purple-300/80 font-mono">
                • (2+3i) + (1+4i) = 3+7i
              </p>
              <p className="text-purple-300/80 font-mono">• 2i * 3i = -6</p>
              <p className="text-purple-300/80 font-mono">• √(-1) = i</p>
              <p className="text-purple-300/80 font-mono">
                • conj(3+4i) = 3-4i
              </p>
            </div>
          </div>

          {/* Dica final + link do repositório*/}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-4 rounded-lg border border-purple-500/50">
            <p className="text-purple-300 text-sm text-center">
              <span className="font-bold">Dica:</span>
              Use parênteses para controlar a ordem das operações!
            </p>
            <p className="text-purple-300 text-sm text-center">
              Para mais informações, clique neste{" "}
              <span>
                <a
                  href="https://github.com/VIctor-teles-Dev/Calculadora"
                  target="blank"
                  rel="noopener noreferrer"
                >
                  <u>link!</u>
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
