// The types of actions that you can dispatch to modify the state of the store
export const types = {

    SET_AVAILABILITY    : 'SET_AVAILABILITY',
    SEND_FEED           : 'SEND_FEED',
    SET_FEED            : 'SET_FEED',
    SET_PRINTER_ERROR   : 'SET_PRINTER_ERROR',
};

export const setFeed = feed => {

    return {
        type: types.SET_FEED, payload: feed
    }
};

export const setAvailability = flag => {

    return {
        type: types.SET_AVAILABILITY, payload: flag
    }
};

export const setPrinterError = err => {

    return {
        type: types.SET_PRINTER_ERROR, payload: err
    }
};

export function checkPrinterAvailability() {

    return (dispatch, getState) => {

        const state = getState();

        let printer = state.configs.find(o => o.name.trim() === 'printer');

        dispatch(setAvailability(true));

    }
}

export function sendFeedToPrinter() {

    return (dispatch, getState) => {

        const state = getState();

        const headers = new Headers();
        headers.append('Content-Type','application-json');
        const options = {

            method: 'POST',
            headers,
            body: JSON.stringify(state.printer.feed),
        };

        let printer = state.configs.find(o => o.name.trim() === 'printer');

        try {

            let response = fetch(printer.uri, options);
            let responseJson = response.json();

            console.log(responseJson);

            return responseJson;

        } catch(error) {

            console.error('Error : ', error);
        }
    };
}

