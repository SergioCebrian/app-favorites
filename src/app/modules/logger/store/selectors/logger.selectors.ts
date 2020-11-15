import { createSelector } from '@ngrx/store';
import { AppState } from '@shared/store/state/app.state';
import { LoggerState } from '../state/logger.state';

const selectLogger = (state: AppState) => state.logger;

const selectLoggerAll = createSelector(
    selectLogger,
    (state: LoggerState, { start, end }) => state.logger/*.slice(start, end)*/
);

const selectLoggerCount = createSelector(
    selectLogger,
    (state: LoggerState) => state.logger.length
);

const selectOneLogger = createSelector(
    selectLogger,
    (state: LoggerState, { logger }) => state.logger.filter(log => logger === log.date.formatted.url)
);

export {
    selectLogger,
    selectLoggerAll,
    selectLoggerCount,
    selectOneLogger
}