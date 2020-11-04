import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../../router/AppRouter';


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// store.dispatch = jest.fn();





describe('Pruebas de <AppRouter />', () => {
   
    test('debe de mostar espere', () => {

        const initState = {
            auth: {
                checking:true
            }
        };
        const store = mockStore( initState );
        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter/>
            </Provider>
        );

        // expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find('h5').exists() ).toBe(true);
    })


    test('debe de mostar la ruta publica', () => {

        const initState = {
            auth: {
                checking:false,
                uid: null
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter/>
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.login-container').exists() ).toBe(true);
    })

    test('debe de mostar la ruta publica', () => {

        const initState = {
            ui:{
                modalOpen:false
            },
            calendar:{
                events:[]
            },
            auth: {
                checking:false,
                uid: '123',
                name: 'Juan carlos'
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter/>
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.calendar-screen').exists() ).toBe(true);
    })

});
