import { createSelector } from '@ngrx/store';
import { AppState } from '@shared/store/state/app.state';
import { LoggerState } from '../state/logger.state';

const selectLogger = (state: AppState) => state.logger;

const selectLoggerAll = createSelector(
    selectLogger,
    (state: LoggerState) => state.logger
);

const selectLoggerCount = createSelector(
    selectLogger,
    (state: LoggerState) => state.logger.length
);

export {
    selectLogger,
    selectLoggerAll,
    selectLoggerCount
}