import { useReducer } from 'react';

import { generateColorScales } from '../utils'
import { Variable, ResponseData, ResponseFipsDictionary } from '../types';

enum EventType {
    FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',
    FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE',
}

export enum FetchStatus {
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILED = 'failed',
}

type Action =
    | { event: EventType.FETCH_DATA_REQUEST }
    | { event: EventType.FETCH_DATA_SUCCESS; payload: ResponseData }
    | { event: EventType.FETCH_DATA_FAILURE; error: object };

interface ReducerState {
    data: ResponseFipsDictionary | null;
    datesList: string[];
    mostRecentDate: string;
    fipsList: string[];
    colorScales: {
        [Variable.CASES]: (string | number)[],
        [Variable.DEATHS]: (string | number)[],
    };
    status?: FetchStatus,
};

const initialState = {
    data: null,
    datesList: [],
    mostRecentDate: '',
    fipsList: [],
    colorScales: {
        [Variable.CASES]: [],
        [Variable.DEATHS]: [],
    },
};

function reducer(state: ReducerState, action: Action): ReducerState {
    switch (action.event) {
        case EventType.FETCH_DATA_SUCCESS: {
            const { data, maxCases, maxDeaths } = action.payload;
            const datesList = Object.keys(data);
            const mostRecentDate = datesList[datesList.length - 1];
            const fipsList = Object.keys(data[mostRecentDate]);
            return {
                status: FetchStatus.SUCCESS,
                data,
                datesList,
                mostRecentDate,
                fipsList,
                colorScales: {
                    [Variable.CASES]: generateColorScales(maxCases),
                    [Variable.DEATHS]: generateColorScales(maxDeaths),
                },
            };
        }
        case EventType.FETCH_DATA_REQUEST:
            return {
                ...initialState,
                status: FetchStatus.LOADING,
            }
        case EventType.FETCH_DATA_FAILURE:
            return {
                ...initialState,
                status: FetchStatus.FAILED,
            };
        default:
            throw new Error();
    }
}

export default function useFetchDataReducer(): any {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchFetchDataRequest = (): void => dispatch({ event: EventType.FETCH_DATA_REQUEST })
    const dispatchFetchDataSuccess = (payload: ResponseData): void => dispatch({ event: EventType.FETCH_DATA_SUCCESS, payload })
    const dispatchFetchDataFailure = (error: object): void => dispatch({ event: EventType.FETCH_DATA_FAILURE, error })

    return { ...state, dispatchFetchDataRequest, dispatchFetchDataSuccess, dispatchFetchDataFailure };
}
