import { useEffect, useRef } from 'react';

function usePrevious<T>(value: T) {
	const prevChildrenRef = useRef<T>();

	useEffect(() => {
		prevChildrenRef.current = value;
	}, [value]);

	return prevChildrenRef.current;
}

export default usePrevious;
