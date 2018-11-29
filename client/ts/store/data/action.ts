export enum ActionTypes {
    SET_RECIEVED_JSON = 'SET_RECIEVED_JSON'
}

export const actions = {
    setRecievedJson: (json:string) => ({
        type: ActionTypes.SET_RECIEVED_JSON as ActionTypes.SET_RECIEVED_JSON,
        json: json
    })
}