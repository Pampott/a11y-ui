import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{B as i}from"./Button-_h6rV5uN.js";import"./index-yBjzXJbu.js";import"./index-Dx_1l3Sb.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-EXTQMK5R.js";import"./cn-BLSKlp9E.js";const P={title:"Components/Button",component:i,tags:["autodocs"],parameters:{docs:{description:{component:'Accessible button. Always renders a real `<button>`, has a visible focus ring (WCAG 2.4.7), and requires an `iconOnlyLabel` when it contains only an icon so it is never announced as just "button".'}}}},r={args:{children:"Save changes",variant:"primary"}},a={args:{children:"Cancel",variant:"secondary"}},s={args:{children:"Learn more",variant:"ghost"}},n={args:{children:"Delete",variant:"danger"}},o={args:{children:"Unavailable",disabled:!0}},t={args:{iconOnlyLabel:"Close dialog",children:"✕"},parameters:{docs:{description:{story:'Icon-only buttons MUST pass `iconOnlyLabel`. It becomes the aria-label so screen-reader users hear "Close dialog", not "button".'}}}},c={render:()=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(i,{size:"sm",children:"Small"}),e.jsx(i,{size:"md",children:"Medium"}),e.jsx(i,{size:"lg",children:"Large"})]})};var l,d,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    children: 'Save changes',
    variant: 'primary'
  }
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,u,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: 'Cancel',
    variant: 'secondary'
  }
}`,...(g=(u=a.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,b,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'Learn more',
    variant: 'ghost'
  }
}`,...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var v,S,x;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'Delete',
    variant: 'danger'
  }
}`,...(x=(S=n.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var B,L,z;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'Unavailable',
    disabled: true
  }
}`,...(z=(L=o.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var C,O,j;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    iconOnlyLabel: 'Close dialog',
    children: '✕'
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons MUST pass \`iconOnlyLabel\`. It becomes the aria-label so screen-reader users hear "Close dialog", not "button".'
      }
    }
  }
}`,...(j=(O=t.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var f,D,I;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
}`,...(I=(D=c.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};const T=["Primary","Secondary","Ghost","Danger","Disabled","IconOnly","AllSizes"];export{c as AllSizes,n as Danger,o as Disabled,s as Ghost,t as IconOnly,r as Primary,a as Secondary,T as __namedExportsOrder,P as default};
