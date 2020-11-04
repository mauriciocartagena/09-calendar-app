import React from 'react';
import moment from 'moment'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../../actions/events';

jest.mock('sweetalert2', () =>({
    fire: jest.fn(),
}));

jest.mock('../../../actions/events', () =>({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent:jest.fn(),
    eventStartAddNew: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add( 1, 'hours');
const last = now.clone().add(1, 'hours' );

const initState = {
    calendar:{
        events:[],
        activeEvent:{
            title:'Hola Mundo',
            name:'Algunas notas',
            start: now.toDate(),
            end: last.toDate()  
        }
    },
    auth:{
        uid:'12344',
        name:'Mauricio'
    },
    ui:{
        modalOpen: true
    }
};

const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <CalendarModal/>
    </Provider>
)


describe('Pruebas en <CalendarModal />', () => {

    beforeEach(()=>{
        jest.clearAllMocks();
    })
   
    test('debe de mostar el modal', () => {
        
        // expect( wrapper.find( '.modal' ).exists() ).toBe( true );
        expect( wrapper.find( 'Modal' ).prop('isOpen') ).toBe( true );


    });

    test('debde de llamar la acción de actualizar y cerrar el modal', () => {
       
        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        expect( eventStartUpdate ).toHaveBeenCalledWith( initState.calendar.activeEvent );
        expect( eventClearActiveEvent ).toHaveBeenCalledWith();
        
    });

    test('debde de mostrar error si falta el titulo', () => {
       
        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        expect( wrapper.find( 'input[name="title"]' ).hasClass('is-invalid') ).toBe(true);

    });

    test('debe de crear un nuevo evento', () => {

        const initState = {
            calendar:{
                events:[],
                activeEvent:null
            },
            auth:{
                uid:'12344',
                name:'Mauricio'
            },
            ui:{
                modalOpen: true
            }
        };
        
        const store = mockStore( initState );
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store } >
                <CalendarModal/>
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        expect( eventStartAddNew ).toHaveBeenCalledWith({
            end:expect.anything(),
            start: expect.anything(),
            title:'Hola pruebas',
            notes:''
        });

        expect( eventClearActiveEvent ).toHaveBeenLastCalledWith();
    });

    test('debe de validar las fechas', () => {
       
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        const hoy = new Date();
        act(()=> {
            wrapper.find( 'DateTimePicker' ).at(1).prop('onChange')( hoy );
        })
        
        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        expect( Swal.fire ).toHaveBeenCalledWith('Error','La fecha fin debe de ser mayor a la fecha inicio', 'error');
    });
    
    


    
    

    
});
