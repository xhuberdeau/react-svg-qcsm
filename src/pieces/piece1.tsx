import React, { FunctionComponent } from "react";
import { defaultSize, lineColor, lineWidth } from "../pieceConfig";
import { IPiece } from "../types/pieceType";

const offset = lineWidth / 2;

const Piece1: FunctionComponent<IPiece> = ({ pieceValues }: IPiece) => {
    const line1Y = defaultSize * (pieceValues.coteA || 0) / 100;
    const line2X = defaultSize * (pieceValues.coteB || 0) / 100;
    const line3Y = defaultSize * (pieceValues.coteC || 0) / 100;
    const line2Y = pieceValues.coteA < pieceValues.coteC ? line1Y - offset : line3Y - offset;
    const line4X = defaultSize * (pieceValues.coteD || 0) / 100;
    const angle1 = pieceValues.angle1 > 90 ? (pieceValues.angle1 - 90) * -1 : Math.abs(pieceValues.angle1 - 90);
    const angle2 = pieceValues.angle2 > 90 ? (pieceValues.angle2 - 90) : pieceValues.angle2 - 90;
    const angle3 = pieceValues.angle3 > 90 ? (90 - pieceValues.angle3) : 90 - pieceValues.angle3;
    const translate1 = pieceValues.coteA && pieceValues.coteC && pieceValues.coteA > pieceValues.coteC
        ? `translate(0 ${pieceValues.coteC - pieceValues.coteA})`
        : "";
    const line1YTransformOrigin = line1Y - offset + (translate1 ? pieceValues.coteC - pieceValues.coteA: 0);
    const translate2 = pieceValues.coteC && pieceValues.coteA && pieceValues.coteC > pieceValues.coteA
        ? `translate(0 ${pieceValues.coteA - pieceValues.coteC})`
        : "";
    console.log(translate1, translate2, pieceValues.coteA, pieceValues.coteB);
    return (
        <svg width="800px" height="800px" viewBox="-800 -800 1600 1600">
            <g stroke={lineColor} strokeWidth={lineWidth}
               transform={`rotate(${angle1} ${0} ${line1YTransformOrigin}) ${translate1}`}>
                <line x1="0" x2="0" y1="0" y2={line1Y} />
                <line x1="-15" x2="-15" y1="0" y2={line1Y} stroke="grey" />
                <line x1="-20" x2="-10" y1="0" y2="0" stroke="grey" />
                <line x1="-20" x2="-10" y1={line1Y} y2={line1Y} stroke="grey" />
                <text strokeWidth="1" x="-100" y={line1Y / 2}>({pieceValues.coteA}) A</text>
            </g>
            <g strokeWidth={lineWidth}>
                <line x1="0" x2={line2X} y1={line2Y} y2={line2Y} stroke={lineColor} strokeWidth={lineWidth} />
                <line x1="0" x2={line2X} y1={line2Y + 20} y2={line2Y + 20} stroke="grey" />
                <line x1="0" x2="0" y1={line2Y + 15} y2={line2Y + 25} stroke="grey" />
                <line x1={line2X} x2={line2X} y1={line2Y + 15} y2={line2Y + 25} stroke="grey" />
                <text strokeWidth="1" x={line2X / 3} y={line2Y + 50}>({pieceValues.coteB}) B</text>
            </g>
            <g strokeWidth={lineWidth} transform={`rotate(${angle2} ${line2X} ${line1YTransformOrigin}) ${translate2}`}>
                <line x1={line2X} x2={line2X} y1="0" y2={line3Y} stroke={lineColor} />
                <line x1={line2X + 15} x2={line2X + 15} y1="0" y2={line3Y} stroke="grey" />
                <line x1={line2X + 20} x2={line2X + 10} y1="0" y2="0" stroke="grey" />
                <line x1={line2X + 20} x2={line2X + 10} y1={line3Y} y2={line3Y} stroke="grey" />
                <text strokeWidth="1" x={line2X + 50} y={line3Y / 2}>({pieceValues.coteC}) C</text>
                <g strokeWidth={lineWidth} transform={`rotate(${angle3} ${line2X} ${offset})`}>
                    <line x1={line2X} x2={line4X + line2X} y1={0} y2={0} stroke={lineColor} strokeWidth={lineWidth} />
                </g>
            </g>
        </svg>
    );
}

export default Piece1;
