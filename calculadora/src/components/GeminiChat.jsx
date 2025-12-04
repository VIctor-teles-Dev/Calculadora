import React, { useState, useEffect } from "react";

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
    return `Erro: ${error.message || "Falha desconhecida na conexão com Gemini."}`;
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
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || "");

  useEffect(() => {
    if (lastCalculation) {
      handleSend(`não ultilize nenhum texto, nenhuma marcação markdown, e sempre pulando linha a cada etapa, apenas os passos executados para resolver o calculo: ${lastCalculation}`);
    }
  }, [lastCalculation]);

  const handleSend = async (text) => {
    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseText = await generateGeminiResponse(text, apiKey);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: responseText },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Desculpe, ocorreu um erro ao processar sua solicitação." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
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
