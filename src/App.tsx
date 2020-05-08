import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import "./App.css";
import GenericForm from "./generic/GenericForm";
import GenericPiece from "./generic/GenericPiece";
import { computeSegmentsDistances, convertUnitToDistance } from "./pieceHelper";
import GenericPieceType from "./types/GenericPieceType";

const piece: GenericPieceType = {
    initialPosition: {
        xUnit: 0,
        yUnit: 0,
    },
    segments: [
        {
            name: "A",
            distance: 1,
        }, {
            name: "B",
            distance: 1,
        }, {
            name: "C",
            distance: 1,
        }, {
            name: "D",
            distance: 1,
        }, {
            name: "E",
            distance: 1,
        }
    ],
    angles: [
        {
            name: "ffsdf",
            editable: false,
            degree: 0,
        },
        {
            editable: true,
            name: '1',
            degree: 90,
        },
        {
            editable: true,
            name: '2',
            degree: 0,
        },
        {
            editable: true,
            name: '3',
            degree: -90,
        },
        {
            editable: false,
            name: '4',
            degree: 0,
        },
    ]
}

function App() {
    const [pieceState, setPieceState] = useState({} as any);

    const onPieceChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPieceState({
            ...pieceState,
            [event.currentTarget.name]: Number(event.currentTarget.value),
        });
    }, [pieceState]);


    const proportions = useMemo(() => {
        const longest = Object.keys(pieceState.segments).reduce((acc: number | null, pieceName) => {
            const segmentLength = pieceState.segments[pieceName];

            if (!acc) {
                return segmentLength;
            }

            if (segmentLength && segmentLength > acc) {
                return segmentLength;
            }

            return acc;
        }, null);

        if (!longest) {
            return {};
        }

        return Object.keys(pieceState.segments).reduce((acc: {}, pieceName) => {
            const segmentLength = pieceState[pieceName];
            if (!segmentLength) {
                return {...acc, [pieceName]: null};
            }

            return {...acc, [pieceName]: segmentLength / longest}
        }, {});
    }, [pieceState]);

    const distances = useMemo(() => {
        return computeSegmentsDistances(piece, proportions);
    }, [proportions])
    console.log(proportions);
    return (
        <div className="container">
            <div className="form">
                {/*<Form pieceValues={pieceState} changePieceValue={onPieceChange} />*/}
                <GenericForm piece={piece} changePieceValue={onPieceChange} pieceValues={pieceState} />
            </div>
            <div className="pieces">
                {/* <Piece1 pieceValues={pieceState} /> */}
                <GenericPiece distances={distances} />
            </div>
        </div>
    );
}

export default App;
