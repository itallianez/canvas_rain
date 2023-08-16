import React, { useState } from "react"

import Canvas from "./components/canvas"

const App = () => {

	const [size, setSize] = useState({
		width: 600,
		height: 600
	})

	const changeSize = (value, param) => {
		setSize({...size, [param]: value})
	}

	return (
		<div>
			<h1>Canvas</h1>
			<input
				type="range"
				onChange={e => changeSize(e.target.value, "width")}
				min="100"
				max="1400"
				value={size.width}
			/>
			<input
				type="range"
				onChange={e => changeSize(e.target.value, "height")}
				min="50"
				max="800"
				value={size.height}
			/>
			<Canvas {...size} />
		</div>
	);
}

export default App