import * as LOADING_ACTIONS from '../actions/loading.actions';
import { initialState, loadingReducer } from './loading.reducers';

describe('loading reducers', () => {

    describe('tests loading states', () => {

        it('Testing default state', () => {
            const fakeAction = { isLoading: false },
                  fakeState = loadingReducer(initialState, fakeAction);

            expect(fakeState).toBe(initialState);
        });

        it('Testing loading active', () => {
            const fakeNewState = { isLoading: true },
                  fakeAction = LOADING_ACTIONS.isLoading(),
                  fakeState = loadingReducer(initialState, fakeAction);

            expect(fakeState).toEqual(fakeNewState);
        });

        it('Testing loading stop', () => {
            const fakeNewState = { isLoading: false },
                  fakeAction = LOADING_ACTIONS.stopLoading (),
                  fakeState = loadingReducer(initialState, fakeAction);

            expect(fakeState).toEqual(fakeNewState);
        });

    });

});