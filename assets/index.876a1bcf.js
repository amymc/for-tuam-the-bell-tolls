import{v as e,l as n,s as t,y as o,d as s,S as a}from"./vendor.61a338d7.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&n(e)})).observe(document,{childList:!0,subtree:!0})}function n(e){if(e.ep)return;e.ep=!0;const n=function(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?n.credentials="include":"anonymous"===e.crossorigin?n.credentials="omit":n.credentials="same-origin",n}(e);fetch(e.href,n)}}();const l=({child:n})=>{const{name:t,age:o,year:s}=n;return e("div",{class:"card"},e("div",{class:"card-inner"},"In Loving Memory of",e("h2",{class:"card-title"},t),e("span",{class:"card-subtitle"},"Died in ",s," aged ",o),e("img",{class:"cross",src:"/for-whom-the-bell-tolls/assets/bloody-cross.38ac552c.svg"}),e("br",null),"Suffered at the hands of the Catholic Church",e("br",null),e("br",null),"Rest in peace",e("img",{class:"separator",src:"/for-whom-the-bell-tolls/assets/separator.1ea99e0d.svg"})))},r=()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},e("path",{d:"M0 0h24v24H0V0z"}),e("path",{class:"svg-path",d:"M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"})),i=()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},e("path",{d:"M0 0h24v24H0V0z",fill:"none"}),e("path",{class:"svg-path",d:"M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"})),c=()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},e("path",{d:"M0 0h24v24H0V0z",fill:"none"}),e("path",{class:"svg-path",d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"}));const d=({pause:t,resume:o,skip:s})=>{const[a,l]=n(!1);return e("div",null,a?e("button",{class:"control-btn",onClick:()=>{o(),l(!1)},title:"play"},e(r,null)):e("button",{class:"control-btn",onClick:()=>{t(),l(!0)},title:"pause"},e(c,null)),e("button",{class:"control-btn",onClick:s,title:"skip to end"},e(i,null)))};var h=[{name:"Patrick Derrane",age:"5 months",year:1925},{name:"Mary Blake",age:"4 months",year:1925},{name:"Matthew Griffin",age:"3 months",year:1925},{name:"Mary Kelly",age:"6 months",year:1925},{name:"Peter Lally",age:"11 months",year:1925},{name:"Julia Hynes",age:"1 year",year:1925},{name:"James Murray",age:"1 month",year:1925}];const u="intro",m="card",p="end";function g(a){const[r,i]=n(!1),[c,g]=n(null),[v,y]=n(u);n(null);let f=t(!1);o((()=>{window.speechSynthesis.onvoiceschanged=()=>i(!0)}),[]);let w=Promise.resolve();const b=async e=>{console.log("signal",e),e.map((async(e,n)=>{console.log("ddd",e),w=w.then((()=>{if(!f.current)return console.log("child",e),console.log("child ind",n),function(e){const n=new SpeechSynthesisUtterance(e);n.rate=.9;const t=window.speechSynthesis.getVoices();n.voice=t.find((e=>"Moira"==e.name)),console.log("wtf",e),o="./src/assets/angelus-bell-7.m4a",new Promise((function(e,n){var t=new Audio;t.preload="auto",t.autoplay=!0,t.onerror=n,t.onended=e,t.volume=.3,t.src=o})),window.speechSynthesis.speak(n);var o}(e.name),g(e),new Promise((function(n,t,o){console.log("child",e),setTimeout(n,3e3)}))}))}))};return e(s,null,v===u&&e(s,null,e("h1",{class:"title"},"For Tuam the bell tolls"),e("p",null,"In 2017 it was discoverd that nuns had buried the remains of children in a septic tank on the site of a mother and baby home in Tuam, Galway, Ireland. Between 1925 and 1960, a child died, on average, every two weeks at this home. ",e("br",null),'In total 796 children died there in the "care" of the nuns during that time. These are their names.'),e("button",{class:"start-btn",onClick:()=>{b(h),y(m)},disabled:!r},"Toll the bell")),v===m&&e(s,null,e(l,{child:c}),e(d,{pause:()=>{f.current=!0},resume:()=>{f.current=!1;const e=h.findIndex((e=>e===c));b(h.slice(e+1))},skip:()=>{f.current=!0,y(p)}})),v==p&&e("p",null,"The home in Tuam was one of 18 mother and baby homes that operated in Ireland over a 76 year period. Women and girls in these homes were subject to physical and emotional abuse and forced labour. Their children were subject to illegal adoptions. Approximately 9,000 children died in these homes. To date, there has been no redress paid to surviving victims.",e("br",null),"Unbelievably, Catholic organisations are still heavily involved in providing education and healthcare in Ireland."))}a(e(g,null),document.getElementById("app"));
