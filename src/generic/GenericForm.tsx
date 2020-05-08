import React, { FunctionComponent } from "react";
import { angleIdentifier, segmentIdentifier } from "../pieceHelper";
import { AngleType } from "../types/AngleType";
import ChangeEventType from "../types/changeEvent";
import WithGenericPieceType from "../types/withGenericPieceType";

type Form = {
    pieceValues: any,
    changeSegmentSize: (event: ChangeEventType) => void,
    changeAngle: (event: ChangeEventType) => void,
}
const GenericForm: FunctionComponent<WithGenericPieceType & Form> = ({ piece: { segments, angles }, pieceValues, changeSegmentSize, changeAngle }) => (
    <>
        {
            segments.map(({ name }, index) => (
                <>
                    <label htmlFor={name}>Cote {name}</label>
                    <input key={name} type="number" name={String(index)} id={name}
                           defaultValue={pieceValues[name]}
                           onChange={changeSegmentSize} />
                </>
            ))
        }
        {
            angles.filter(({ editable }) => editable)
                .map((angle, index) => {
                    const { name } = angle as AngleType;
                    return (
                        <>
                            <label htmlFor={name}>Angle {name}</label>
                            <input key={name} type="number" name={name} id={name}
                                   defaultValue={pieceValues[name]}
                                   onChange={changeAngle} />
                        </>
                    )
                })
        }
    </>
);

export default GenericForm;
