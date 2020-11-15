import { createAction } from '@ngrx/store';
import * as CONSTANTS from '../constants/loading.constants';

export const isLoading = createAction(CONSTANTS.IS_LOADING),
             stopLoading = createAction(CONSTANTS.STOP_LOADING);