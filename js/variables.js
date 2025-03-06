import { generateId } from "./function.js";

export const edit = {
    value: false
};

// object appointments
export const appointmentObj = {
    id: generateId(),
    patient: '',
    property: '',
    email: '',
    date: '',
    symptoms: ''
}