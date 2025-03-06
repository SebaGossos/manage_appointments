import AdminAppointments from "./class/adminAppointments.js";
import Notify from "./class/Notification.js";

import { appointmentObj, edit } from "./variables.js";
import { dateInput, emailInput, form, formInput, patientInput, propertyInput, symptomsInput } from "./selectors.js";

const appointments = new AdminAppointments()


export function dataAppointment( e ) {
    appointmentObj[e.target.name] = e.target.value;
}

export function submitAppointment( e ) {
    e.preventDefault();

    const areEmpty = Object.values(appointmentObj).some( value => !value?.trim());
    if( areEmpty ){
        new Notify({
            text: 'all fields are required',
            type: 'error'
        })
        return;
    }
    
    if( edit.value ) {
        appointments.edit(appointmentObj);
        new Notify({
            text: 'Edited the patient',
            type: 'success'
        })
        edit.value = false;
        formInput.value = 'REGISTRAR PACIENTE'
    } else {
        appointments.add(appointmentObj);
        new Notify({
            text: 'Registered patient',
            type: 'success'
        })
    }
    
    form.reset()
    resetObjectAppointment()

}

export function resetObjectAppointment() {
    Object.keys(appointmentObj).forEach( key => {
        // create an id so that it does not give an error that it is empty ''
        if ( key === 'id' ) return appointmentObj[key] = generateId();
        appointmentObj[key] = ''
    });
}

export function generateId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

export function chargeEdition(appointment) {
    Object.assign(appointmentObj, appointment)

    patientInput.value = appointment.patient
    propertyInput.value = appointment.property
    emailInput.value = appointment.email
    dateInput.value = appointment.date
    symptomsInput.value = appointment.symptoms

    formInput.value = 'GUARDAR CAMBIO'

    edit.value = true;
}
