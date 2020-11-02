import { createReducer, on } from '@ngrx/store';
import * as ACTIONS from '../actions/logger.actions';
import { LoggerState } from '../state/logger.state';

export const initialState: LoggerState = {
    logger: []
}

const _loggerReducer = createReducer(
    initialState,
    on(ACTIONS.loadLogger, state => ({ ...state })),
    on(ACTIONS.loadLoggerError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.loadLoggerSuccess, (state, { logger }) => ({ ...state, logger: [ ...logger ] })),
    on(ACTIONS.addLogger, state => ({ ...state })),
    on(ACTIONS.addLoggerError, (state, { payload }) => ({ ...state })),
    on(ACTIONS.addLoggerSuccess, (state, { logger }) => ({ ...state, logger: [ state.logger, logger ] })),
);

export function loggerReducer(state, action) {
    return _loggerReducer(state, action);
}