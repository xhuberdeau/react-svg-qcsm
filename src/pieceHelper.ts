import GenericPieceType from "./types/GenericPieceType";
import PositionType from "./types/positionType";
import SegmentType from "./types/segmentType";

export const lineColor = "black"
export const lineWidth = 4;
export const defaultSize: number = 100;

export const segmentIdentifier = "segment.";
export const angleIdentifier = "angle.";

export const convertUnitToDistance = (unit: number): number => unit * defaultSize;

const convertDegreeToRadian = (degree: number) => Math.PI / 180 * degree;

const computeXPos = (angle: number, radius: number): number => convertUnitToDistance(radius) * Math.cos(convertDegreeToRadian(angle));
const computeYPos = (angle: number, radius: number): number => convertUnitToDistance(radius) * Math.sin(convertDegreeToRadian(angle));

export const computeSegmentsDistances = (
    {
        initialPosition: {
            xUnit: initialX,
            yUnit: initialY
        },
        segments,
        angles
    }: GenericPieceType,
    proportions: any): Array<PositionType> => {
    return segments.reduce((acc: Array<PositionType>, segment: SegmentType, index: number) => {
        const { distance } = segment;
        const { degree } = angles[index];
        let x2 = computeXPos(degree,   proportions[index] || distance);
        let y2 = computeYPos(degree, proportions[index] || distance);
        let x1, y1;
        if (index !== 0) {
            // from second segment, we compute based on the previous one
            const previousDistance: PositionType = acc[index - 1];
            x1 = previousDistance.x2;
            y1 = previousDistance.y2;
            x2 += previousDistance.x2;
            y2 += previousDistance.y2;
        } else {
            // first segment, we place it relative to the initial position
            x1 = convertUnitToDistance(initialX);
            y1 = convertUnitToDistance(initialY);
            x2 += x1;
            y2 += y1;
        }
        console.log({
            x1, y1, x2, y2
        });
        return [
            ...acc,
            {
                x1,
                y1,
                x2,
                y2
            },
        ];
    }, []);
}

