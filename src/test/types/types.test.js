const { types } = require("../../types/types");



describe('Pruebas en Types', () => {
   
    test('Los types debe sde ser iguales', () => {
       
        expect( types ).toEqual({

            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',
        
        
            eventStartAddNew:'[event] Set Active',
            eventLogout:'[event] Logout event',
        
        
            eventSetActive: '[event] Set Active',
            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdate: '[event] event updated',
            eventDeleted: '[event] event deleted',
            eventLoaded: '[event] Events loaded',
        
        
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout'
        
        });
    });
    
    
});
