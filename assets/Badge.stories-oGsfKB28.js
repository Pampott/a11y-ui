import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{c as g}from"./index-EXTQMK5R.js";import{c as u}from"./cn-BLSKlp9E.js";import"./index-yBjzXJbu.js";const p=g("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium",{variants:{tone:{neutral:"bg-gray-200 text-gray-900",brand:"bg-brand-subtle text-brand",success:"bg-success-subtle text-success",danger:"bg-danger-subtle text-danger",warning:"bg-warning-subtle text-warning"}},defaultVariants:{tone:"neutral"}});function n({tone:d,statusLabel:s,children:i,className:c,...l}){return e.jsxs("span",{className:u(p({tone:d}),c),...l,children:[s&&e.jsx("span",{className:"sr-only",children:s}),i]})}n.__docgenInfo={description:`Accessible badge / tag.

Accessibility notes:
- Colour is never the only signal: the text content carries the meaning.
- Each tone is contrast-checked against WCAG 1.4.3 (4.5:1).
- \`statusLabel\` adds visually-hidden context when needed (e.g. "Status: ").`,methods:[],displayName:"Badge",props:{statusLabel:{required:!1,tsType:{name:"string"},description:`When the badge conveys status by colour alone, pass a textLabel so meaning
is not lost for colour-blind users or screen readers (WCAG 1.4.1).`}},composes:["VariantProps"]};const f={title:"Components/Badge",component:n,tags:["autodocs"],parameters:{docs:{description:{component:"Status badge. Every tone pairs text and background to meet WCAG 1.4.3 contrast (>= 4.5:1). Colour is never the only signal — the label always carries the meaning."}}}},a={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(n,{tone:"neutral",children:"Neutral"}),e.jsx(n,{tone:"brand",children:"Active"}),e.jsx(n,{tone:"success",children:"Completed"}),e.jsx(n,{tone:"danger",children:"Failed"}),e.jsx(n,{tone:"warning",children:"Pending"})]})};var t,r,o;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="brand">Active</Badge>
      <Badge tone="success">Completed</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="warning">Pending</Badge>
    </div>
}`,...(o=(r=a.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const y=["AllTones"];export{a as AllTones,y as __namedExportsOrder,f as default};
