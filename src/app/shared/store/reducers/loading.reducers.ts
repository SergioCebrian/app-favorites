import { createReducer, on } from '@ngrx/store';
import * as ACTIONS from '../actions/loading.actions';
import { loadingState } from '../state/loading.state';

export const initialState: loadingState = {
    isLoading: false
}

const _loadingReducer = createReducer(
    initialState,
    on(ACTIONS.isLoading, state => ({ ...state, isLoading: true })),
    on(ACTIONS.stopLoading, state => ({ ...state, isLoading: false }))
);

export function loadingReducer(state, action) {
    return _loadingReducer(state, action);
}