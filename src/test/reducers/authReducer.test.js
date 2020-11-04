const { authReducer } = require("../../reducers/authReducer");
const { types } = require("../../types/types");

const initState = {
    checking: true,
    // uid: null,
    // name: null
}

describe('Pruebas en authReducer', () => {
   
    test('debe de retornar el stado por defecto ', () => {
       
        const actions = {};

        const state = authReducer( initState, actions );

        expect( state ).toEqual( initState );
    
    });

    test('debe de autenticar el usuario ', () => {
        

        const action = { 
            type: types.authLogin,
            payload: {
                uid:'123',
                name: 'Mauri'
            }
        }
        
        const state = authReducer( initState, action );
        expect( state ).toEqual( { checking: false, uid: '123', name: 'Mauri' }  )
    })
    
    
    
});
