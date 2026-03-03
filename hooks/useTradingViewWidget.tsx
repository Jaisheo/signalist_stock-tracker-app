'use client';
import {useEffect, useRef} from 'react';

const useTradingViewWidget = (scriptUrl:string,config:Record<string, unknown>,height=600) => {
    const containerRef=useRef<HTMLDivElement | null>(null);
    useEffect(

        () => {
            if(!containerRef.current)return;
            if(containerRef.current.dataset.loaded)return;
            containerRef.current.innerHTML=`<div class="tradingview-widget-container__widget" style="width:100%;height:${height}px;"></div>`;

            const script = document.createElement("script");
            script.src = scriptUrl;

            script.async = true;
            script.innerHTML = JSON.stringify(config);
            containerRef.current.appendChild(script);
            containerRef.current.dataset.loaded='true';

            return ()=>{
                if(containerRef.current){
                    containerRef.current.innerHTML='';
                    delete containerRef.current.dataset.loaded;
                }
            }
        }, [scriptUrl,config,height]);
    return containerRef;
}
export default useTradingViewWidget

// 'use client';
// import { useEffect, useRef } from 'react';
//
// const useTradingViewWidget = (
//     scriptUrl: string,
//     config: Record<string, unknown>,
//     height = 600
// ) => {
//     const containerRef = useRef<HTMLDivElement | null>(null);
//
//     useEffect(() => {
//         if (!containerRef.current) return;
//
//         containerRef.current.innerHTML = '';
//
//         const widgetDiv = document.createElement("div");
//         widgetDiv.className = "tradingview-widget-container__widget";
//         widgetDiv.style.width = "100%";
//         widgetDiv.style.height = `${height}px`;
//
//         containerRef.current.appendChild(widgetDiv);
//
//         const script = document.createElement("script");
//         script.src = scriptUrl;
//         script.async = true;
//         script.type = "text/javascript";
//         script.innerHTML = JSON.stringify({
//             ...config,
//             width: "100%",   // 🔥 force responsive
//             height,
//         });
//
//         containerRef.current.appendChild(script);
//
//         return () => {
//             if (containerRef.current) {
//                 containerRef.current.innerHTML = '';
//             }
//         };
//     }, [scriptUrl, config, height]);
//
//     return containerRef;
// };
//
// export default useTradingViewWidget;