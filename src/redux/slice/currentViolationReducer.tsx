import { createSlice } from "@reduxjs/toolkit";
import Violation from "../../utility/type";

interface PayloadAction<T> {
    type: string;
    payload: T;
}

const initialState: Violation = {
    parkingChargeNumber: "",
    lot: "",
    plateNumber: "",
    fee: 0,
    delay_fee: 0,
    issue_date: "",
    image1: "",
    image2: "",
}

export const currentViolationReducer = createSlice({
    name: "currentViolation",
    initialState,
    reducers: {
        setCurrentViolation: (state: Violation,  action: PayloadAction<Violation>) => {
            return action.payload;
        }
    }
})

export const {setCurrentViolation} = currentViolationReducer.actions;

export default currentViolationReducer.reducer;

