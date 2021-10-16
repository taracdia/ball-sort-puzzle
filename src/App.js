import { useEffect, } from "react";
import "./App.css";
import Canvas from "./components/Canvas";

function App() {
	useEffect(() => {
		window.onresize = () => {
			const cnv = document.getElementById("canvas");
			cnv.style.width = `${window.innerWidth}px`;
			cnv.style.height = `${window.innerHeight}px`;
		};
		window.onresize();
	});
	return (
		<div className="App">
			<Canvas />
		</div>
	);
}

export default App;
