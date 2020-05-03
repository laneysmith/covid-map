import { useEffect, useRef } from 'react';

const useDidMountEffect = (callback: Function, dependencies: string[]): void => {
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            callback();
        } else {
            didMount.current = true;
        }
    }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}

export default useDidMountEffect;