import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{c as d}from"./cn-BLSKlp9E.js";import"./index-yBjzXJbu.js";function n({targetId:i,children:r="Skip to main content",className:c}){return e.jsx("a",{href:`#${i}`,className:d("sr-only","focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]","focus:rounded-token focus:bg-brand focus:px-4 focus:py-2 focus:text-white","focus:outline-none focus:ring-focus focus:ring-offset-2 focus:ring-brand",c),children:r})}n.__docgenInfo={description:`Skip link — lets keyboard and screen-reader users jump past repeated
navigation straight to the main content (WCAG 2.4.1 — bypass blocks).

Accessibility notes:
- Visually hidden until focused, then appears at the top of the page.
- Must be the very first focusable element in the DOM.
- The target element should have tabIndex={-1} so focus lands cleanly:
    <main id="main-content" tabIndex={-1}>…</main>`,methods:[],displayName:"SkipLink",props:{targetId:{required:!0,tsType:{name:"string"},description:'The id of the main content target, e.g. "main-content".'},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"",defaultValue:{value:"'Skip to main content'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const u={title:"Components/SkipLink",component:n,tags:["autodocs"],parameters:{docs:{description:{component:"Skip link (WCAG 2.4.1 — bypass blocks). Visually hidden until focused. Press Tab when this story is focused to reveal it. Must be the first focusable element on the page."}}}},t={render:()=>e.jsxs("div",{children:[e.jsx(n,{targetId:"main-content"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Press Tab to reveal the skip link at the top."}),e.jsx("main",{id:"main-content",tabIndex:-1,className:"mt-4",children:e.jsx("h1",{className:"text-xl font-semibold",children:"Main content"})})]})};var s,a,o;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div>
      <SkipLink targetId="main-content" />
      <p className="text-sm text-gray-600">Press Tab to reveal the skip link at the top.</p>
      <main id="main-content" tabIndex={-1} className="mt-4">
        <h1 className="text-xl font-semibold">Main content</h1>
      </main>
    </div>
}`,...(o=(a=t.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const f=["Default"];export{t as Default,f as __namedExportsOrder,u as default};
