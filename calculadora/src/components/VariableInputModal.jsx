import React, { useState, useEffect } from "react";
import Complex from "../utils/Complex";

// Modal para solicitar valores de variáveis ao usuário
const VariableInputModal = ({ variables, onSubmit, onCancel }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  // Inicializa valores vazios para cada variável
  useEffect(() => {
    const initialValues = {};
    variables.forEach((v) => {
      initialValues[v] = { real: "", imaginary: "" };
    });
    setValues(initialValues);
  }, [variables]);

  // Fecha o modal ao pressionar ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  // Atualiza valor de uma variável (parte real ou imaginária)
  const handleChange = (variable, part, value) => {
    setValues((prev) => ({
      ...prev,
      [variable]: {
        ...prev[variable],
        [part]: value,
      },
    }));
    // Limpa erro ao digitar
    if (errors[variable]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[variable];
        return newErrors;
      });
    }
  };

  // Valida e submete os valores
  const handleSubmit = () => {
    const newErrors = {};
    const complexValues = {};

    // Valida cada variável
    variables.forEach((v) => {
      const realStr = values[v]?.real || "0";
      const imagStr = values[v]?.imaginary || "0";

      const real = parseFloat(realStr);
      const imag = parseFloat(imagStr);

      if (isNaN(real)) {
        newErrors[v] = "Parte real inválida";
        return;
      }
      if (isNaN(imag)) {
        newErrors[v] = "Parte imaginária inválida";
        return;
      }

      complexValues[v] = new Complex(real, imag);
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(complexValues);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-full max-w-md border-2 border-purple-500/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Valores das Variáveis
          </h2>
          <button
            onClick={onCancel}
            className="text-purple-400 hover:text-pink-400 text-3xl font-bold transition-colors duration-200"
          >
            &times;
          </button>
        </div>

        <p className="text-purple-300 text-sm mb-4">
          Digite os valores para cada variável (formato: a + bi)
        </p>

        <div className="max-h-96 overflow-y-auto space-y-4 scrollbar-custom">
          {variables.map((variable) => (
            <div
              key={variable}
              className="bg-gray-950 p-4 rounded-lg border border-purple-500/30"
            >
              <label className="block text-purple-300 font-bold mb-2 text-lg">
                {variable} =
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-purple-200 text-sm mb-1">
                    Parte Real (a)
                  </label>
                  <input
                    type="text"
                    value={values[variable]?.real || ""}
                    onChange={(e) =>
                      handleChange(variable, "real", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-purple-500/50 rounded-lg focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 text-sm mb-1">
                    Parte Imaginária (b)
                  </label>
                  <input
                    type="text"
                    value={values[variable]?.imaginary || ""}
                    onChange={(e) =>
                      handleChange(variable, "imaginary", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-purple-500/50 rounded-lg focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>
              </div>

              {errors[variable] && (
                <p className="text-pink-400 text-sm mt-2">{errors[variable]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
          >
            Calcular
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariableInputModal;
