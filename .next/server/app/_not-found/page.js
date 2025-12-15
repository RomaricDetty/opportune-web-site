(()=>{var e={};e.id=492,e.ids=[492],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},3874:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,pages:()=>u,routeModule:()=>c,tree:()=>l});var o=r(260),n=r(8203),s=r(5155),i=r.n(s),a=r(7292),d={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>a[e]);r.d(t,d);let l=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.t.bind(r,9937,23)),"next/dist/client/components/not-found-error"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,1354)),"/Users/gueuromaric/Documents/PROJETS/Opportune/opportune-web-site/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9937,23)),"next/dist/client/components/not-found-error"]}],u=[],p={require:r,loadChunk:()=>Promise.resolve()},c=new o.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},5451:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,3219,23)),Promise.resolve().then(r.t.bind(r,4863,23)),Promise.resolve().then(r.t.bind(r,5155,23)),Promise.resolve().then(r.t.bind(r,9350,23)),Promise.resolve().then(r.t.bind(r,6313,23)),Promise.resolve().then(r.t.bind(r,8530,23)),Promise.resolve().then(r.t.bind(r,8921,23))},6067:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6959,23)),Promise.resolve().then(r.t.bind(r,3875,23)),Promise.resolve().then(r.t.bind(r,8903,23)),Promise.resolve().then(r.t.bind(r,4178,23)),Promise.resolve().then(r.t.bind(r,6013,23)),Promise.resolve().then(r.t.bind(r,7190,23)),Promise.resolve().then(r.t.bind(r,1365,23))},3218:(e,t,r)=>{Promise.resolve().then(r.bind(r,7587))},1370:(e,t,r)=>{Promise.resolve().then(r.bind(r,4759))},4759:(e,t,r)=>{"use strict";r.d(t,{default:()=>a});var o=r(5512),n=r(9334),s=r(8009),i=r(3988);let a=({children:e})=>{let t=(0,n.usePathname)();return(0,s.useEffect)(()=>{let e=document.querySelector("#__next_splash"),t=document.querySelector("#splash-screen");if(!e||!t)return;r.e(655).then(r.t.bind(r,1655,23));let o=new MutationObserver(r=>{for(let o of r)"childList"===o.type&&e.hasChildNodes()&&t.classList.add("remove")});return o.observe(e,{childList:!0,subtree:!0}),e.hasChildNodes()&&t.classList.add("remove"),()=>o.disconnect()},[]),(0,s.useEffect)(()=>{setTimeout(()=>{window.HSStaticMethods&&window.HSStaticMethods.autoInit()},400)},[t]),(0,o.jsx)(s.Fragment,{children:(0,o.jsx)(i.e,{children:e})})}},3988:(e,t,r)=>{"use strict";r.d(t,{B:()=>i,e:()=>a});var o=r(5512),n=r(8009);let s=(0,n.createContext)(void 0);function i(){let e=(0,n.useContext)(s);if(void 0===e)throw Error("useCartContext must be used within a CartProvider");return e}function a({children:e}){let[t,r]=(0,n.useState)([]),i=e=>e.minQuantity||1,a=(e,t=1)=>{let o=Math.max(t,i(e));r(t=>t.find(t=>t.product.id===e.id)?t.map(t=>t.product.id===e.id?{...t,quantity:t.quantity+o}:t):[...t,{product:e,quantity:o}])},d=e=>{r(t=>t.filter(t=>t.product.id!==e))},l=(e,o)=>{let n=t.find(t=>t.product.id===e);if(n){if(o<i(n.product)){d(e);return}r(t=>t.map(t=>t.product.id===e?{...t,quantity:o}:t))}},u=()=>{r([])},p=()=>t.reduce((e,t)=>e+t.quantity,0),c=()=>t.reduce((e,t)=>e+t.product.currentPrice*t.quantity,0),m=e=>t.some(t=>t.product.id===e);return(0,o.jsx)(s.Provider,{value:(0,n.useMemo)(()=>({cartItems:t,addToCart:a,removeFromCart:d,updateQuantity:l,clearCart:u,getTotalItems:p,getTotalPrice:c,isInCart:m}),[t]),children:e})}},1354:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a,metadata:()=>s});var o=r(2740);r(6170);var n=r(7587);let s={title:{default:"Shop Electrom\xe9nager",template:"%s | Shop Electrom\xe9nager"},description:"Shop Electrom\xe9nager - Votre sp\xe9cialiste en \xe9lectrom\xe9nager \xe0 Abidjan."},i=`
#splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    background: white; /* Changez pour votre couleur pr\xe9f\xe9r\xe9e */
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s ease;
    overflow: hidden;
}

#splash-screen.remove {
    animation: fadeout 0.7s forwards;
    z-index: 0;
}

@keyframes fadeout {
    to {
        opacity: 0;
        visibility: hidden;
    }
}

/* Animation pour le logo */
#splash-screen img {
    animation: logoFadeIn 0.8s ease-in-out;
}

@keyframes logoFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Loader optionnel */
.splash-loader {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #ff6b35;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-top: 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;function a({children:e}){return(0,o.jsxs)("html",{lang:"en",children:[(0,o.jsx)("head",{children:(0,o.jsx)("style",{suppressHydrationWarning:!0,children:i})}),(0,o.jsx)("title",{children:"Shop Electrom\xe9nager"}),(0,o.jsxs)("body",{className:"antialiased",children:[(0,o.jsx)("div",{id:"splash-screen",children:(0,o.jsx)("div",{className:"splash-loader"})}),(0,o.jsx)("div",{id:"__next_splash",children:(0,o.jsx)(n.default,{children:e})})]})]})}},7587:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});let o=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/gueuromaric/Documents/PROJETS/Opportune/opportune-web-site/src/components/wrappers/AppProviders.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/gueuromaric/Documents/PROJETS/Opportune/opportune-web-site/src/components/wrappers/AppProviders.tsx","default")},6170:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[185],()=>r(3874));module.exports=o})();