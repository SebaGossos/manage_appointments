import { appointmentContainer } from '../selectors.js';
import { chargeEdition } from '../function.js';

export default class AdminAppointments {
    constructor(){
        this.appointments = [];
    };
    
    add(appointment) {
        this.appointments.push(JSON.parse(JSON.stringify( appointment )));
        this.show();
    }

    edit(updateAppointment) {
        const index = this.appointments.findIndex( appoint => appoint.id === updateAppointment.id );
        if ( index !== -1 ) this.appointments[index] = structuredClone(updateAppointment);
        this.show();
    }

    delete( id ) {
        const index = this.appointments.findIndex( appoint => appoint.id === id );
        index !== -1 ? this.appointments.splice( index, 1 ) : null;
        this.show()
    }

    show() {
        // clean before HTML
        while( appointmentContainer.firstChild ) {
            appointmentContainer.removeChild(appointmentContainer.firstChild);
        }

        // if there aren´t appointments
        if( this.appointments.length === 0) {
            appointmentContainer.innerHTML = `<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`;
        }
        
        // generate appointments
        this.appointments.forEach(appoint => {
            const cloneAppoint = structuredClone(appoint)

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
            btnEdit.onclick = () => chargeEdition(cloneAppoint);
            
            const btnDelet = document.createElement('button');
            btnDelet.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnDelet.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnDelet.onclick = () => this.delete( cloneAppoint.id );

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