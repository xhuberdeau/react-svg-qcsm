import React, { FunctionComponent } from "react";
import PositionType from "../types/positionType";
import Segment from "./Segment";

type PieceType = {
    distances: Array<PositionType>
}

const GenericPiece: FunctionComponent<PieceType> = ({ distances}) => {

    return (
        <svg width="1000px" height="1000px" viewBox="-500 -500 1000 1000" transform="scale(1,-1)">
            {distances.map((distance: PositionType) => (
                <Segment {...distance} />
            ))}
        </svg>
    );
}

export default GenericPiece;
