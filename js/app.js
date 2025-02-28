// selectors
const patientInput = document.getElementById('paciente');
const propertyInput = document.getElementById('propietario');
const emailInput = document.getElementById('email');
const dateInput = document.getElementById('fecha');
const symptomsInput = document.getElementById('sintomas');

const form = document.getElementById('formulario-cita');

const appointmentContainer = document.querySelector('#citas')


// events
patientInput.addEventListener('change', dataAppointment);
propertyInput.addEventListener('change', dataAppointment);
emailInput.addEventListener('change', dataAppointment);
dateInput.addEventListener('change', dataAppointment);
symptomsInput.addEventListener('change', dataAppointment);
form.addEventListener('submit', submitAppointment)


// object appointments
const appointmentObj = {
    id: generateId(),
    patient: '',
    property: '',
    email: '',
    date: '',
    symptoms: ''
}

//class
class Notify {

    constructor({ text, type }) {
        this.text = text;
        this.type = type;

        this.show();
    }

    show() {

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

}

class AdminAppointments {
    constructor(){
        this.appointments = [];
    };

    add(appointment) {
        this.appointments.push(JSON.parse(JSON.stringify( appointment )));
        this.show();

        console.log( this.appointments )
    }

    show() {
        // clean before HTML
        while( appointmentContainer.firstChild ) {
            appointmentContainer.removeChild(appointmentContainer.firstChild);
        }
        // generate appointments

        this.appointments.forEach(appoint => {
            const appointmentDiv = document.createElement('div');
            appointmentDiv.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
        
            const patient = document.createElement('p');
            patient.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            patient.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${appoint.patient}`;
        
            const property = document.createElement('p');
            property.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            property.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${appoint.property}`;
        
            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${appoint.email}`;
        
            const date = document.createElement('p');
            date.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            date.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${appoint.date}`;
        
            const symptoms = document.createElement('p');
            symptoms.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            symptoms.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${appoint.symptoms}`;


            const btnEdit = document.createElement('button');
            btnEdit.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'boton-editar');
            btnEdit.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            const clone = structuredClone(appoint)
            btnEdit.onclick = () => chargeEdition(clone);

            const btnDelet = document.createElement('button');
            btnDelet.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnDelet.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            const btnsContainer =  document.createElement('div');
            btnsContainer.classList.add('flex', 'justify-between', 'mt-10');

            btnsContainer.appendChild(btnEdit);
            btnsContainer.appendChild(btnDelet);
        
            // Agregar al HTML
            appointmentDiv.appendChild(patient);
            appointmentDiv.appendChild(property);
            appointmentDiv.appendChild(email);
            appointmentDiv.appendChild(date);
            appointmentDiv.appendChild(symptoms);
            appointmentDiv.appendChild(btnsContainer);
            appointmentContainer.appendChild(appointmentDiv);
        });
    }

}

const appointments = new AdminAppointments()

// functions
function dataAppointment( e ) {
    appointmentObj[e.target.name] = e.target.value;
}

function submitAppointment( e ) {
    e.preventDefault();

    const areEmpty = Object.values(appointmentObj).some( value => !value?.trim());
    if( areEmpty ){
        console.log(appointmentObj)
        new Notify({
            text: 'all fields are required',
            type: 'error'
        })
        return;
    }

    appointments.add(appointmentObj)
    form.reset()
    resetObjectAppointment()
    new Notify({
        text: 'Registered patient',
        type: 'success'
    })
}

function resetObjectAppointment() {
    Object.keys(appointmentObj).forEach( key => {
        // create an id so that it does not give an error that it is empty ''
        if ( key === 'id' ) return appointmentObj[key] = generateId();
        appointmentObj[key] = ''
    });
}

function generateId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

function chargeEdition(appointment) {
    console.log( appointment );
}