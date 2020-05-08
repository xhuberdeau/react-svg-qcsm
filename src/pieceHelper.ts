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
const computeXPos = (angle: number, radius: number, previousAngle: number, isFirstPoint: boolean) => {
    if (isFirstPoint) {
        return convertUnitToDistance(radius) * Math.cos(convertDegreeToRadian(angle));
    }
    return convertUnitToDistance(radius) * - Math.cos(convertDegreeToRadian(angle - previousAngle));
}
const computeYPos = (angle: number, radius: number, previousAngle: number, isFirstPoint: boolean): number => {
    if (isFirstPoint) {
        return convertUnitToDistance(radius) * Math.sin(convertDegreeToRadian(angle));
    }
    return convertUnitToDistance(radius) * Math.sin(convertDegreeToRadian(angle - previousAngle));
}

export const computeSegmentsDistances = (
    {
        initialPosition: {
            xUnit: initialX,
            yUnit: initialY
        },
        segments,
        angles
    }: GenericPieceType,
    proportions: any,
    userAngles: any): Array<PositionType> => {
    let cumulatedAngle = 0;
    return segments.reduce((acc: Array<PositionType>, segment: SegmentType, index: number) => {
        const { distance } = segment;
        const { degree: modelDegree, direction } = angles[index];
        const userAngle = userAngles[index];
        let degree = modelDegree;
        if (userAngle !== undefined && userAngle !== null) {
            const factor = angles[index].degree < 0 ? -1 : 1;
            degree = userAngles[index] * factor;
        }
        if (direction === 'anticlockwise') {
            degree = degree * -1;
        }
        let x2 = computeXPos(degree,   proportions[index] || distance, cumulatedAngle, index === 0);
        let y2 = computeYPos(degree, proportions[index] || distance, cumulatedAngle, index === 0);
        if (index <= 0) {
            cumulatedAngle += degree;
        } else {
            cumulatedAngle += 180 - degree;
        }

        let x1, y1;
        if (index !== 0) {
            // from second segment, we compute based on the previous one
            const previousPosition = acc[index - 1];
            x1 = previousPosition.x2;
            y1 = previousPosition.y2;
            x2 += previousPosition.x2;
            y2 += previousPosition.y2;
        } else {
            // first segment, we place it relative to the initial position
            x1 = convertUnitToDistance(initialX);
            y1 = convertUnitToDistance(initialY);
            x2 += x1;
            y2 += y1;
        }

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

