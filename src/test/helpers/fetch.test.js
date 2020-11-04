const { fetchSinToken, fetchConToken } = require("../../helpers/fetch");


describe('Pruebas en el helper  Fetch', () => {

    let token = '';
   
    test('fetchSinToken debe de funcionar',  async () => {
        
        const resp = await fetchSinToken('auth',{ email:'mcartagenacoria@gmail.com', password:'1234657' },'POST');

        expect( resp instanceof Response ).toBe( true );

        const body =  await resp.json();
        expect( body.ok ).toBe( true );

        token = body.token;

    });

    test('fetchSinToken debe de funcionar',  async () => {

        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/5fa0eccf0da2791b3edb6d3c',{ }, 'DELETE');
        const body = await resp.json();

        expect( body.msg ).toBe('Evento no existe por ese id');

    });
    
    
});
