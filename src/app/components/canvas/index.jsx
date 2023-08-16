import React, {useRef, useEffect} from 'react'
import Render from '../../constructor/Render';
import { imgSrc } from './img.mock';

const Canvas = ({width = 800, height = 600}) => {

	const canvasRef = useRef(null)
	
	const draw = (canvas) => {
		const image = new Image()
		image.src = imgSrc;
		image.addEventListener('load', function(){
			const drawCanvas = new Render(image, canvas);
			return drawCanvas.init();
		})
		
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = width;
		canvas.height = height;
		draw(canvas);
	}, []);

	return <canvas ref={canvasRef}/>
}

export default Canvas