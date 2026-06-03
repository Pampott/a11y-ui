import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as s}from"./index-Dx_1l3Sb.js";import{c as x}from"./cn-BLSKlp9E.js";import{B as w}from"./Button-_h6rV5uN.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-EXTQMK5R.js";function n({content:m,children:u,className:b}){const[i,r]=s.useState(!1),a=s.useId(),h=s.useRef(),c=()=>{window.clearTimeout(h.current),r(!0)},o=()=>r(!1),y=f=>{f.key==="Escape"&&o()};return e.jsxs("span",{className:"relative inline-block",children:[e.jsx("span",{onMouseEnter:c,onMouseLeave:o,onFocus:c,onBlur:o,onKeyDown:y,"aria-describedby":i?a:void 0,className:"inline-block",children:u}),i&&e.jsx("span",{id:a,role:"tooltip",className:x("absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap","rounded-md bg-gray-900 px-2.5 py-1.5 text-sm text-white shadow-md",b),children:m})]})}n.__docgenInfo={description:`Accessible tooltip.

Accessibility notes:
- Shows on hover AND keyboard focus (WCAG 1.4.13 — content on hover/focus).
- Linked to the trigger via aria-describedby so it is announced.
- Dismissible with Escape without moving pointer.
- The tooltip text is in the DOM (role="tooltip"), not a title attribute,
  because title attributes are not reliably announced and not keyboard-accessible.`,methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"string"},description:"The text shown in the tooltip."},children:{required:!0,tsType:{name:"ReactReactElement",raw:"React.ReactElement"},description:"The trigger element (usually a button or link)."},className:{required:!1,tsType:{name:"string"},description:""}}};const j={title:"Components/Tooltip",component:n,tags:["autodocs"],parameters:{docs:{description:{component:"Accessible tooltip. Appears on hover AND keyboard focus (WCAG 1.4.13), is linked via aria-describedby, and is dismissible with Escape."}}}},t={render:()=>e.jsx(n,{content:"Saves your changes immediately",children:e.jsx(w,{children:"Save"})})};var l,d,p;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Tooltip content="Saves your changes immediately">
      <Button>Save</Button>
    </Tooltip>
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const N=["Default"];export{t as Default,N as __namedExportsOrder,j as default};
