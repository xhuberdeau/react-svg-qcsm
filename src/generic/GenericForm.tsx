import React, { FunctionComponent } from "react";
import { angleIdentifier, segmentIdentifier } from "../pieceHelper";
import { AngleType } from "../types/AngleType";
import ChangeEventType from "../types/changeEvent";
import WithGenericPieceType from "../types/withGenericPieceType";

type Form = {
    pieceValues: any,
    changePieceValue: (event: ChangeEventType) => void,
}
const GenericForm: FunctionComponent<WithGenericPieceType & Form> = ({ piece: { segments, angles }, pieceValues, changePieceValue }) => (
    <>
        {
            segments.map(({ name }, index) => (
                <>
                    <label htmlFor={name}>Cote {name}</label>
                    <input key={name} type="number" name={`${segmentIdentifier}${index}`} id={name}
                           defaultValue={pieceValues[name]}
                           onChange={changePieceValue} />
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
                            <input key={name} type="number" name={`${angleIdentifier}${index}`} id={name}
                                   defaultValue={pieceValues[name]}
                                   onChange={changePieceValue} />
                        </>
                    )
                })
        }
    </>
);

export default GenericForm;
