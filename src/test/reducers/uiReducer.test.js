const { uiOpenModal, uiCloseModal } = require("../../actions/ui");
const { uiReducer } = require("../../reducers/uiReducer");

const initState = {
    modalOpen: false
}

describe('Pruebas en uiReducer', () => {
    

    test('debe de retornar el estado por defecto', () => {
       
        const state = uiReducer( initState, {})

        expect( state ).toEqual( initState );
        
    });

    test('Debe de abrir y cerrar el modal', () => {
       
        const modalOpen = uiOpenModal();

        const state = uiReducer( initState, modalOpen );

        expect( state ).toEqual({ modalOpen: true  });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer( state, modalClose );

        expect( stateClose ).toEqual({ modalOpen: false });
        
    });
    
    

})
