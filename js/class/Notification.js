import { form } from '../selectors.js'

export default class Notify {

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