"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pieces_1 = __importDefault(require("./pieces"));
const Square = ({ square, className, onClick, squareString }) => {
    if (square) {
        return (<div className={`square ${className} w-[12.5%] h-full`} onClick={() => onClick(squareString)}>
        <pieces_1.default color={square.color} type={square.type}/>
      </div>);
    }
    else {
        return (<div className={`square ${className} w-[12.5%] h-full`} onClick={() => onClick(squareString)}></div>);
    }
};
exports.default = Square;
