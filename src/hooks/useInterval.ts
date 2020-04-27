import { useEffect, useRef } from 'react';

const ANIMATION_SPEED = 500; // milliseconds

const useInterval = (callback: any, animate: boolean) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current();
        }
        if (animate) {
            let id = setInterval(tick, ANIMATION_SPEED);
            return () => clearInterval(id);
        }
    }, [animate]);
}

export default useInterval;