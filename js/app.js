import { patientInput, propertyInput, emailInput, dateInput, symptomsInput, form,  } from './selectors.js'
import { dataAppointment, submitAppointment } from './function.js'

// events
patientInput.addEventListener('change', dataAppointment);
propertyInput.addEventListener('change', dataAppointment);
emailInput.addEventListener('change', dataAppointment);
dateInput.addEventListener('change', dataAppointment);
symptomsInput.addEventListener('change', dataAppointment);
form.addEventListener('submit', submitAppointment)