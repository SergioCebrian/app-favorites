import { createAction, props } from '@ngrx/store';
import { Types } from '../types/logger.types';

const loadLogger = createAction(
    Types.LOAD
);

const loadLoggerError = createAction(
    Types.LOAD_ERROR,
    props<{ payload: any }>()
);

const loadLoggerSuccess = createAction(
    Types.LOAD_SUCCESS,
    props<{ logger: any }>()
);

const addLogger = createAction(
    Types.ADD
);

const addLoggerError = createAction(
    Types.ADD_ERROR,
    props<{ payload: any }>()
)

const addLoggerSuccess = createAction(
    Types.ADD_SUCCESS,
    props<{ logger: any }>()
)

export { 
    addLogger,
    addLoggerError,
    addLoggerSuccess,
    loadLogger,
    loadLoggerError,
    loadLoggerSuccess
}