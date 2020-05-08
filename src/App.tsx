import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import "./App.css";
import GenericForm from "./generic/GenericForm";
import GenericPiece from "./generic/GenericPiece";
import { computeSegmentsDistances } from "./pieceHelper";
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
            direction: "clockwise",
        },
        {
            editable: true,
            name: '1',
            degree: 90,
            direction: "clockwise",
        },
        {
            editable: true,
            name: '2',
            degree: 90,
            direction: "anticlockwise",
        },
        {
            editable: true,
            name: '3',
            degree: 90,
            direction: "anticlockwise",
        },
        {
            editable: true,
            name: '4',
            degree: 90,
            direction: "clockwise",
        },
    ]
}

function App() {
    const [pieceState, setPieceState] = useState({segments: {}, angles: {}} as any);
    const onSegmentSizeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPieceState({
            angles: {
                ...pieceState.angles
            },
            segments: {
                ...pieceState.segments,
                [event.currentTarget.name]: Number(event.currentTarget.value),
            }
        });
    }, [pieceState]);

    const onAngleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPieceState({
            segments: {
                ...pieceState.segments
            },
            angles: {
                ...pieceState.angles,
                [event.currentTarget.name]: Number(event.currentTarget.value),
            }
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
            const segmentLength = pieceState.segments[pieceName];
            if (!segmentLength) {
                return {...acc, [pieceName]: null};
            }

            return {...acc, [pieceName]: segmentLength / longest}
        }, {});
    }, [pieceState]);

    const distances = useMemo(() => {
        return computeSegmentsDistances(piece, proportions, pieceState.angles);
    }, [proportions])
    return (
        <div className="container">
            <div className="form">
                {/*<Form pieceValues={pieceState} changePieceValue={onPieceChange} />*/}
                <GenericForm piece={piece} changeAngle={onAngleChange} changeSegmentSize={onSegmentSizeChange} pieceValues={pieceState} />
            </div>
            <div className="pieces">
                {/* <Piece1 pieceValues={pieceState} /> */}
                <GenericPiece distances={distances} />
            </div>
        </div>
    );
}

export default App;
