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
}
function submitAppointment( e ) {
    e.preventDefault();
    
    const { patient, property, email, date, symptoms } = appointmentObj;
    const areEmpty = Object.values(appointmentObj).some( value => !value?.trim());
    if( areEmpty ){
        new Notify({
            text: 'all fields are required',
            type: 'error'
        })
        return;
    }
}

//class
class Notify {

    constructor({ text, type }) {
        this.text = text;
        this.type = type;

        this.show();
    }

    show() {
        // clean previous elements
        
        //Create Notification
        const alerts= document.createElement('div');
        alerts.classList.add('text-center', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm')

        // delet duplicated alerts
        const previousAlert = document.querySelector('.alert');
        previousAlert?.remove()  

        
        //if it is of type error, add a class
        this.type === 'error' ? alerts.classList.add('bg-red-500') : alerts.classList.add('bg-green-500');
        
        // error message
        alerts.textContent = this.text;
        
        // insert in DOM
        form.parentElement.insertBefore(alerts, form);
        
        setTimeout(() => {
            alerts.remove()            
        },3000)
        
    }

    clear() {

    }
}