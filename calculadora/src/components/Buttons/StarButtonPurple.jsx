import React from "react";
import { buttonIdle2 } from "../../constants/images";

// Botão roxo (operadores matemáticos)
const StarButtonPurple = ({
value,
onClick,
starImage = buttonIdle2,
children,
className = "",
activeKey,
}) => {
const isActive = activeKey === value;

return (
    <button
    onClick={() => onClick(value)}
    className={`relative text-white text-xl font-bold transition-all duration-200 focus:outline-none transform hover:scale-110 hover:brightness-150 ${
        isActive ? "scale-110 brightness-150" : ""
    } ${className}`}
    style={{
        width: "70px",
        height: "70px",
        border: "none",
        backgroundImage: `url(${starImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
    }}
    >
    <span className="absolute inset-0 flex items-center justify-center">
        {children || value}
    </span>
    </button>
);
};

export default StarButtonPurple;
