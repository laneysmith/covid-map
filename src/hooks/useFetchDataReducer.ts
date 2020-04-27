import { useReducer } from 'react';

import { generateColorScales } from '../utils'
import { Variable, ResponseData, ResponseFipsDictionary } from '../types';

enum EventType {
    FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',
    FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE',
}

type Action =
    | { event: EventType.FETCH_DATA_REQUEST }
    | { event: EventType.FETCH_DATA_SUCCESS; payload: ResponseData }
    | { event: EventType.FETCH_DATA_FAILURE; error: object };

interface ReducerState {
    data: ResponseFipsDictionary | null;
    datesList: string[];
    mostRecentDate: string | null;
    fipsList: string[];
    colorScales: {
        [Variable.CASES]: (string | number)[],
        [Variable.DEATHS]: (string | number)[],
    };
};

const initialState = {
    data: null,
    datesList: [],
    mostRecentDate: null,
    fipsList: [],
    colorScales: {
        [Variable.CASES]: [],
        [Variable.DEATHS]: [],
    },
};

function reducer(state: ReducerState, action: Action): ReducerState {
    switch (action.event) {
        case EventType.FETCH_DATA_SUCCESS:
            const { data, maxCases, maxDeaths } = action.payload;
            const datesList = Object.keys(data);
            const mostRecentDate = datesList[datesList.length - 1];
            const fipsList = Object.keys(data[mostRecentDate]);
            return {
                data,
                datesList,
                mostRecentDate,
                fipsList,
                colorScales: {
                    [Variable.CASES]: generateColorScales(maxCases),
                    [Variable.DEATHS]: generateColorScales(maxDeaths),
                },
            };
        case EventType.FETCH_DATA_REQUEST:
        case EventType.FETCH_DATA_FAILURE:
            return initialState;
        default:
            throw new Error();
    }
}

export default function useFetchDataReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchFetchDataRequest = () => dispatch({ event: EventType.FETCH_DATA_REQUEST })
    const dispatchFetchDataSuccess = (payload: ResponseData) => dispatch({ event: EventType.FETCH_DATA_SUCCESS, payload })
    const dispatchFetchDataFailure = (error: object) => dispatch({ event: EventType.FETCH_DATA_FAILURE, error })

    return { ...state, dispatchFetchDataRequest, dispatchFetchDataSuccess, dispatchFetchDataFailure };
}
