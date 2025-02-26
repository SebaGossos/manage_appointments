// selectors
const patientInput = document.getElementById('paciente');
const propertyInput = document.getElementById('propietario');
const emailInput = document.getElementById('email');
const dateInput = document.getElementById('fecha');
const symptomsInput = document.getElementById('sintomas');
const form = document.getElementById('formulario-cita');

// events
patientInput.addEventListener('change', dataAppointment);
propertyInput.addEventListener('change', dataAppointment);
emailInput.addEventListener('change', dataAppointment);
dateInput.addEventListener('change', dataAppointment);
symptomsInput.addEventListener('change', dataAppointment);
form.addEventListener('submit', submitAppointment)


// object appointments
const appointmentObj = {
    patient: '',
    property: '',
    email: '',
    date: '',
    symptoms: ''
}

// functions
function dataAppointment( e ) {
    appointmentObj[e.target.name] = e.target.value;
    console.log( appointmentObj )
}
function submitAppointment( e ) {
    e.preventDefault();
    
    const { patient, property, email, date, symptoms } = appointmentObj;
    const areEmpty = Object.values(appointmentObj).some( value => !value?.trim());
    if( areEmpty ){
        console.log( 'all fields are required' );
        return;
    }
}