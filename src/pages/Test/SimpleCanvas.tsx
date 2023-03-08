import { useEffect, useRef } from "react";

export default function SimpleCanvas(props) {
    const ref= useRef<HTMLCanvasElement> ();
    useEffect(() => {
        const canvas = ref.current;
        if(!canvas) {
            return
        }
        const gl = canvas.getContext('webgl');
        const extens = gl?.getSupportedExtensions();
        console.log(gl, extens)
    }, [])
    return <canvas ref={(cavs: HTMLCanvasElement) =>ref.current = cavs}></canvas>
}