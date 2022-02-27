//el nombre que esta entre [] indica el nombre del reducer al que hace referencia
export const types = {


    //saber si el usuario esta logueado o no 
    login: '[Auth] login',
    logout: '[Auth] logout',

    //saber si ocurrio un error o no 
    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    //saber si una acción se está ejecutando, inicio de cargando o finalización de cargar
    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    //types paara las acciones de las notas
    //agregar nota
    notesAddNew: '[Notes] New note',
    //nota activa o no
    notesActive: '[Notes] Set active note',
    //Cargar todas las notas
    notesLoad: '[Notes] Load notes',
    notesUpdate: '[Notes] Update note',
    notesFileUrl: '[Notes] Updated image url',
    notesDelete: '[Notes] Delete note',
    //responsable que al cerrar la sesión todas las notas se purgen 
    notesLogoutCleaning: '[Notes] Logout cleaning',







}
