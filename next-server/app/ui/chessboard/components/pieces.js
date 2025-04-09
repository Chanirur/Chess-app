"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Piece = ({ type, color }) => {
    return (<div className={`${type}${color} h-full w-full align-center`} style={{
            backgroundImage: `url('/pieces/${type}${color}.svg')`,
            backgroundSize: 'cover'
        }}></div>);
};
exports.default = Piece;
