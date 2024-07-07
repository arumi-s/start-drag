export function startDrag<E extends MouseEvent | TouchEvent>(
	event: E,
	container: HTMLElement,
	onMove: (event: E, x: number, y: number, relX: number, relY: number) => void,
	onEnd?: (event: E) => void,
): () => void {
	const isTouch = event instanceof TouchEvent;
	let initX = 0;
	let initY = 0;

	const move = (event: MouseEvent | TouchEvent, init = false) => {
		const rect = container.getBoundingClientRect();
		const defaultView = container.ownerDocument.defaultView!;
		const offsetX = rect.left + defaultView.scrollX;
		const offsetY = rect.top + defaultView.scrollY;
		const isTouch = event instanceof TouchEvent;
		const x = (isTouch ? event.changedTouches[0].pageX : event.pageX) - offsetX;
		const y = (isTouch ? event.changedTouches[0].pageY : event.pageY) - offsetY;

		if (init) {
			initX = x;
			initY = y;
		}
		// event must have same type as the initial event
		onMove(event as E, x, y, x - initX, y - initY);
	};

	// Move on init
	move(event, true);

	const destroy = () => {
		if (isTouch) {
			document.removeEventListener('touchmove', move);
			document.removeEventListener('touchend', stop);
		} else {
			document.removeEventListener('mousemove', move);
			document.removeEventListener('mouseup', stop);
		}
	};

	const stop = (event: MouseEvent | TouchEvent) => {
		destroy();
		if (typeof onEnd === 'function') {
			// event must have same type as the initial event
			onEnd(event as E);
		}
	};

	if (isTouch) {
		document.addEventListener('touchmove', move, { passive: true });
		document.addEventListener('touchend', stop);
	} else {
		document.addEventListener('mousemove', move, { passive: true });
		document.addEventListener('mouseup', stop);
	}

	return destroy;
}
