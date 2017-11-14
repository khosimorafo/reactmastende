import { store } from '../../store/store'

export default class Printer{


    constructor () {

        let state = store.getState();
        this.configs = state.configs;

        //this.configs.map
    }

    renderItem = (item, i) => {

        let name = item.name;

        console.log('Printer : ', name.length);

        if(name === "printer"){

            console.log('Printer : ', name);
        }
    };

    async print (data) {

        const headers = new Headers();
        headers.append('Content-Type','application-json');
        const options = {

            method: 'POST',
            headers,
            body: JSON.stringify(data),
        };

        let printer = this.configs.find(o => o.name.trim() === 'printer');

        try {

            let response = await fetch(printer.uri, options);
            let responseJson = await response.json();

            console.log(responseJson);

            return responseJson;

        } catch(error) {

            console.error('Error : ', error);
        }
    }
}