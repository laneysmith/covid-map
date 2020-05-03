import { cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { generateColorScales } from '../../utils'

import useFetchDataReducer, { FetchStatus } from '../useFetchDataReducer';
import { Variable, ResponseData } from '../../types';

jest.mock('../../utils', () => ({
    ...require.requireActual('../../utils'),
    generateColorScales: jest.fn().mockImplementation(() => 'MOCK_GENERATE_COLOR_SCALES_RESPONSE')
}));

describe('useFetchDataReducer', () => {
    afterEach(() => {
        cleanup();
        generateColorScales.mockClear();
    });

    it('should return the correct values and actions with default initial state', () => {
        const { result } = renderHook(() => useFetchDataReducer())

        expect(result.current).toEqual({
            data: null,
            datesList: [],
            mostRecentDate: '',
            fipsList: [],
            colorScales: {
                [Variable.CASES]: [],
                [Variable.DEATHS]: [],
            },
            dispatchFetchDataRequest: expect.any(Function),
            dispatchFetchDataSuccess: expect.any(Function),
            dispatchFetchDataFailure: expect.any(Function),
        })
        expect(generateColorScales).not.toHaveBeenCalled();
    });

    it('dispatchFetchDataRequest should update the state correctly', () => {
        const { result } = renderHook(() => useFetchDataReducer())

        act(() => result.current.dispatchFetchDataRequest())

        expect(result.current).toEqual({
            status: FetchStatus.LOADING,
            data: null,
            datesList: [],
            mostRecentDate: '',
            fipsList: [],
            colorScales: {
                [Variable.CASES]: [],
                [Variable.DEATHS]: [],
            },
            dispatchFetchDataRequest: expect.any(Function),
            dispatchFetchDataSuccess: expect.any(Function),
            dispatchFetchDataFailure: expect.any(Function),
        })
        expect(generateColorScales).not.toHaveBeenCalled();
    });

    it('dispatchFetchDataSuccess should update the state correctly', () => {
        const responseData: ResponseData = {
            data: {
                '2020-04-23': {
                    '00001': { cases: 1, deaths: 0 },
                    '00002': { cases: 3, deaths: 1 },
                },
                '2020-04-24': {
                    '00001': { cases: 1, deaths: 0 },
                    '00002': { cases: 5, deaths: 2 },
                    '00003': { cases: 1, deaths: 0 },
                },
                '2020-04-25': {
                    '00001': { cases: 1, deaths: 1 },
                    '00002': { cases: 12, deaths: 2 },
                    '00003': { cases: 3, deaths: 1 },
                },
            },
            maxCases: 12,
            maxDeaths: 2,
        }
        const { result } = renderHook(() => useFetchDataReducer())

        act(() => result.current.dispatchFetchDataSuccess(responseData))

        expect(result.current).toEqual({
            status: FetchStatus.SUCCESS,
            data: responseData.data,
            datesList: ['2020-04-23', '2020-04-24', '2020-04-25'],
            mostRecentDate: '2020-04-25',
            fipsList: ['00001', '00002', '00003'],
            colorScales: {
                [Variable.CASES]: 'MOCK_GENERATE_COLOR_SCALES_RESPONSE',
                [Variable.DEATHS]: 'MOCK_GENERATE_COLOR_SCALES_RESPONSE',
            },
            dispatchFetchDataRequest: expect.any(Function),
            dispatchFetchDataSuccess: expect.any(Function),
            dispatchFetchDataFailure: expect.any(Function),
        })
        expect(generateColorScales).toHaveBeenCalledTimes(2);
        expect(generateColorScales).toHaveBeenCalledWith(12);
        expect(generateColorScales).toHaveBeenCalledWith(2);
    });

    it('dispatchFetchDataFailure should update the state correctly', () => {
        const { result } = renderHook(() => useFetchDataReducer())

        act(() => result.current.dispatchFetchDataFailure({ status: 500, message: 'whoops' }))

        expect(result.current).toEqual({
            status: FetchStatus.FAILED,
            data: null,
            datesList: [],
            mostRecentDate: '',
            fipsList: [],
            colorScales: {
                [Variable.CASES]: [],
                [Variable.DEATHS]: [],
            },
            dispatchFetchDataRequest: expect.any(Function),
            dispatchFetchDataSuccess: expect.any(Function),
            dispatchFetchDataFailure: expect.any(Function),
        })
        expect(generateColorScales).not.toHaveBeenCalled();
    });
})
