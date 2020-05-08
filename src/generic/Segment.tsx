import React, { FunctionComponent } from "react";
import PositionType from "../types/positionType";

const Segment: FunctionComponent<PositionType> = ({ x1, x2, y1, y2}) => (
    <line x1={x1} x2={x2} y1={y1} y2={y2} stroke="black" />
);

export default Segment;
