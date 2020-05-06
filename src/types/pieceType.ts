type PieceType = {
    coteA: number,
    coteB: number,
    coteC: number,
    coteD: number,
    coteE: number,
    angle1: number,
    angle2: number,
    angle3: number,
    angle4: number,
}

export interface IPiece {
    pieceValues: PieceType
}

export default PieceType;
