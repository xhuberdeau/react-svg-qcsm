import { AngleType } from "./AngleType";
import SegmentType from "./segmentType";

type GenericPieceType = {
    initialPosition: {
        xUnit: number
        yUnit: number
    }
    segments: Array<SegmentType>
    angles: Array<AngleType>
}


export default GenericPieceType;
