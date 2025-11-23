import React from "react";
import { buttonSquare } from "../../constants/images";

// Botão retangular pra comparação simbólica (equal)
const EqualButton = ({
value,
onClick,
starImage = buttonSquare,
children,
className = "",
}) => (
<button
    onClick={() => onClick(value)}
    className={`relative text-white text-lg font-bold transition-all duration-200 focus:outline-none transform hover:scale-105 hover:brightness-150${className}`}
    style={{
    minWidth: "180px",
    height: "55px",
    border: "none",
    marginTop: "17px",
    marginLeft: "140px",
    backgroundImage: `url(${starImage})`,
    backgroundSize: "100% 100%",
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

export default EqualButton;
