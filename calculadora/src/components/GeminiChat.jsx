import React, { useState, useEffect, useCallback } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Function to call Gemini API
const generateGeminiResponse = async (prompt, apiKey) => {
  if (!apiKey) {
    return "Erro: Chave de API não encontrada. Verifique o arquivo .env.";
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro na API do Gemini:", error);
    return `Erro: ${
      error.message || "Falha desconhecida na conexão com Gemini."
    }`;
  }
};

export default function GeminiChat({ lastCalculation, onBack }) {
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Olá! Sou o Gemini. Faça um cálculo na calculadora e eu explicarei o resultado para você.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const isProduction = import.meta.env.MODE === "production";

  const handleSend = useCallback(
    async (promptToGemini, messageToDisplay = null) => {
      // Se não for fornecida uma mensagem customizada, usa o prompt completo
      const displayText = messageToDisplay || promptToGemini;
      const userMessage = { role: "user", text: displayText };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Gemini recebe o prompt completo/detalhado
        const responseText = await generateGeminiResponse(
          promptToGemini,
          apiKey
        );
        setMessages((prev) => [...prev, { role: "model", text: responseText }]);
      } catch (error) {
        console.error("Erro ao processar:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: `Erro: ${
              error.message ||
              "Desculpe, ocorreu um erro ao processar sua solicitação."
            }`,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey]
  );

  useEffect(() => {
    if (lastCalculation) {
      const fullPrompt = `Explique passo a passo como resolver este cálculo: ${lastCalculation}

Siga este formato:
1. Identifique a operação
2. Mostre os passos intermediários (se houver)
3. Apresente o resultado final
4. Se for uma operação simples, dê um exemplo de aplicação prática

Use linguagem clara e acessível. Não use markdown, apenas texto simples com quebras de linha.`;

      const userDisplayMessage = `Me ajude com o último cálculo: ${lastCalculation}`;

      handleSend(fullPrompt, userDisplayMessage);
    }
  }, [lastCalculation, handleSend]);

  // Se estiver em produção e não tiver API key, mostra aviso
  if (isProduction && !apiKey) {
    return (
      <div className="flex flex-col h-full bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 text-white relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-purple-500/30 pb-2">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Gemini Assistant
          </h2>
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
            title="Voltar para Calculadora"
          >
            ✕
          </button>
        </div>

        {/* Aviso de Produção */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Gemini AI Disponível Apenas Localmente
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-md">
            Por questões de segurança, o assistente Gemini AI não está
            disponível na versão online.
          </p>
          <div className="bg-gray-800/60 border border-purple-500/30 rounded-lg p-4 text-left space-y-2 max-w-md">
            <p className="text-xs text-gray-400">
              <span className="text-purple-400 font-semibold">
                Para usar o Gemini:
              </span>
            </p>
            <ol className="text-xs text-gray-300 space-y-1 list-decimal list-inside">
              <li>Clone o repositório do GitHub</li>
              <li>Configure sua própria API key do Google Gemini</li>
              <li>
                Execute localmente com{" "}
                <code className="bg-gray-900/80 px-1 rounded">npm run dev</code>
              </li>
            </ol>
          </div>
          <a
            href="https://github.com/VIctor-teles-Dev/Calculadora"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Ver Repositório e Documentação
          </a>
          <p className="text-xs text-gray-500 mt-4">
            Leia o <span className="text-purple-400 font-semibold">README</span>{" "}
            para instruções completas de configuração.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 text-white relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-purple-500/30 pb-2">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Gemini Assistant
        </h2>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
          title="Voltar para Calculadora"
        >
          ✕
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 scrollbar-custom pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg text-sm max-w-[85%] ${
              msg.role === "user"
                ? "bg-purple-600/50 ml-auto rounded-br-none"
                : "bg-gray-800/80 mr-auto rounded-bl-none border border-purple-500/20"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-purple-400 text-sm p-2">
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        )}
      </div>

      {/* Input Area (Optional, mostly for testing or extra questions) */}
      <div className="mt-auto">
        <div className="text-xs text-gray-500 text-center mb-2">
          O Gemini explica automaticamente o último cálculo.
        </div>
      </div>
    </div>
  );
}
