import React from "react";

// Modal que aparece quando clica no botão Histórico
const HistoryModal = ({ history, onClose }) => (
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-full max-w-md border-2 border-purple-500/50">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        Histórico (Últimos 10)
        </h2>
        <button
        onClick={onClose}
        className="text-purple-400 hover:text-pink-400 text-3xl font-bold transition-colors duration-200"
        >
        &times;
        </button>
    </div>
    <div className="max-h-80 overflow-y-auto space-y-2 scrollbar-custom">
        {history.length === 0 ? (
        <p className="text-purple-300 text-center py-8">
            Nenhuma operação no histórico.
        </p>
        ) : (
        history.map((item, index) => (
            <div
            key={index}
            className="bg-gray-950 p-3 rounded-lg font-mono border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200"
            >
            <p
                className="text-purple-300 text-sm truncate"
                title={item.expression}
            >
                {item.expression} =
            </p>
            <p
                className="text-white text-lg font-bold truncate"
                title={item.result}
            >
                {item.result}
            </p>
            </div>
        ))
        )}
    </div>
    </div>
</div>
);

export default HistoryModal;
