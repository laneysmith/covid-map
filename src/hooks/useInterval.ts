import { useEffect, useRef } from 'react';

const ANIMATION_SPEED = 500; // milliseconds

function useInterval(callback: Function, animate: boolean): void {
    const savedCallback = useRef<Function>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect((): any => {
        function tick(): void {
            // @ts-ignore
            savedCallback.current();
        }
        if (animate) {
            const id = setInterval(tick, ANIMATION_SPEED);
            return (): void => clearInterval(id);
        }
    }, [animate]);
}

export default useInterval;