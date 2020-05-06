import React, { FunctionComponent } from "react";
import ChangeEventType from "./types/changeEvent";
import PieceType from "./types/pieceType";
import "./Form.css";

interface FormProps {
    pieceValues: PieceType,
    changePieceValue: (event: ChangeEventType) => void,
}

const Form: FunctionComponent<FormProps> = ({ pieceValues, changePieceValue }: FormProps) => (
    <form className="form">
        <div className="column">
            <label htmlFor="coteA">Cote A</label>
            <input type="number" id="coteA" name="coteA" defaultValue={pieceValues.coteA} onChange={changePieceValue} />
            <label htmlFor="coteB">Cote B</label>
            <input type="number" id="coteB" name="coteB" defaultValue={pieceValues.coteB} onChange={changePieceValue} />
            <label htmlFor="coteC">Cote C</label>
            <input type="number" id="coteC" name="coteC" defaultValue={pieceValues.coteC} onChange={changePieceValue} />
            <label htmlFor="coteD">Cote D</label>
            <input type="number" id="coteD" name="coteD" defaultValue={pieceValues.coteD} onChange={changePieceValue} />
            <label htmlFor="coteE">Cote E</label>
            <input type="number" id="coteE" name="coteE" defaultValue={pieceValues.coteE} onChange={changePieceValue} />
        </div>
        <div className="column">
            <label htmlFor="angle1">Angle 1</label>
            <input type="number" id="angle1" name="angle1" defaultValue={pieceValues.angle1}
                   onChange={changePieceValue} />
            <label htmlFor="angle2">Angle 2</label>
            <input type="number" id="angle2" name="angle2" defaultValue={pieceValues.angle2}
                   onChange={changePieceValue} />
            <label htmlFor="angle3">Angle 3</label>
            <input type="number" id="angle3" name="angle3" defaultValue={pieceValues.angle3}
                   onChange={changePieceValue} />
            <label htmlFor="angle4">Angle 4</label>
            <input type="number" id="angle4" name="angle4" defaultValue={pieceValues.angle4}
                   onChange={changePieceValue} />
        </div>
    </form>
);

export default Form;
