import { types } from "../tytpes/types"

//como la acción es sincrona no se necesita pasar por el middleware
//por lo tanto no regresaría un callback como las asincronas

//acción que se va a mandar al tener un error
//setErrorAction la cual va a recibir el error que se mande de la vista
export const setError = (err) =>({
    type: types.uiSetError,
    payload: err
});

export const removeError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading
});

export const finishLoading = () => ({
    type: types.uiFinishLoading
});