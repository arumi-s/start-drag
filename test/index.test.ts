import { describe, it, expect, vi } from 'vitest';
import { startDrag } from '../src';

describe('startDrag', () => {
	it('should be defined', () => {
		expect(startDrag).toBeDefined();
	});

	it('should call onMove with correct arguments', () => {
		const onMove = vi.fn();

		const mouseDownEvent = new MouseEvent('mousedown', { clientX: 10, clientY: 20 });
		const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 20, clientY: 40 });

		const destroy = startDrag(mouseDownEvent, document.body, onMove);
		expect(onMove).toHaveBeenCalledWith(mouseDownEvent, 10, 20, 0, 0);
		document.dispatchEvent(mouseMoveEvent);
		expect(onMove).toHaveBeenCalledWith(mouseMoveEvent, 20, 40, 10, 20);
		destroy();
	});

	it('should call onMove and onEnd with correct arguments', () => {
		const onMove = vi.fn();
		const onEnd = vi.fn();

		const mouseDownEvent = new MouseEvent('mousedown', { clientX: 10, clientY: 20 });
		const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 20, clientY: 40 });
		const mouseUpEvent = new MouseEvent('mouseup', { clientX: 20, clientY: 40 });

		const destroy = startDrag(mouseDownEvent, document.body, onMove, onEnd);
		document.dispatchEvent(mouseMoveEvent);
		expect(onMove).toHaveBeenCalledWith(mouseMoveEvent, 20, 40, 10, 20);
		document.dispatchEvent(mouseUpEvent);
		expect(onEnd).toHaveBeenCalledWith(mouseUpEvent);

		destroy();
	});

	it('should remove event listeners on destroy', () => {
		const onMove = vi.fn();
		const onEnd = vi.fn();

		const mouseDownEvent = new MouseEvent('mousedown', { clientX: 10, clientY: 20 });
		const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 20, clientY: 40 });
		const mouseUpEvent = new MouseEvent('mouseup', { clientX: 20, clientY: 40 });

		const destroy = startDrag(mouseDownEvent, document.body, onMove, onEnd);
		document.dispatchEvent(mouseMoveEvent);
		destroy();
		document.dispatchEvent(mouseMoveEvent);
		document.dispatchEvent(mouseUpEvent);
		expect(onMove).toHaveBeenCalledTimes(2);
		expect(onEnd).toHaveBeenCalledTimes(0);
	});
});
