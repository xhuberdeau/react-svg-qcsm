import React, { ChangeEvent, useCallback, useState } from "react";
import "./App.css";
import Form from "./Form";
import Piece1 from "./pieces/piece1";
import PieceType from "./types/pieceType";

function App() {
    const [pieceState, setPieceState] = useState<PieceType>({angle1: 90, angle2: 90, angle3: 120, coteA: 40, coteB: 120, coteC: 40, coteD: 80} as PieceType);

    const onPieceChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPieceState({
            ...pieceState,
            [event.currentTarget.name]: Number(event.currentTarget.value),
        });
    }, [pieceState]);

    return (
        <div className="container">
            <div className="form">
                <Form pieceValues={pieceState} changePieceValue={onPieceChange} />
            </div>
            <div className="pieces">
                <Piece1 pieceValues={pieceState} />
            </div>
        </div>
    );
}

export default App;
