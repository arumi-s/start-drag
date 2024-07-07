# start-drag

[![npm version](https://badgen.net/npm/v/start-drag)](https://npm.im/start-drag) [![npm downloads](https://badgen.net/npm/dm/start-drag)](https://npm.im/start-drag)

This package is a small utility that listens and composes mouse or touch events to dragging callbacks.

## Install

```bash
npm i start-drag
```

## Usage

```typescript
import { strtr } from 'start-drag';

element.addEventListener('mousedown', (event) => {
	const destroy = startDrag(
		event,
		document.body,
		(event: MouseEvent, x: number, y: number, relX: number, relY: number) => {
			console.log(x, y, relX, relY);
		},
		(event: MouseEvent) => {
			console.log('end');
		},
	);

	// call destroy to stop listening
	destroy();
});
```

## License

MIT License
