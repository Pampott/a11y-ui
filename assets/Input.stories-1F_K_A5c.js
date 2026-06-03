import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as p}from"./index-Dx_1l3Sb.js";import{c as H}from"./cn-BLSKlp9E.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";const d=p.forwardRef(({label:q,hint:o,error:r,id:N,required:l,className:k,...A},W)=>{const F=p.useId(),a=N??F,c=`${a}-hint`,m=`${a}-error`,R=[o?c:null,r?m:null].filter(Boolean).join(" ")||void 0;return e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsxs("label",{htmlFor:a,className:"text-sm font-medium text-gray-900",children:[q,l&&e.jsxs("span",{className:"text-danger","aria-hidden":"true",children:[" ","*"]})]}),o&&e.jsx("p",{id:c,className:"text-sm text-gray-600",children:o}),e.jsx("input",{ref:W,id:a,required:l,"aria-required":l||void 0,"aria-invalid":r?!0:void 0,"aria-describedby":R,className:H("h-10 rounded-token border px-3 text-base","focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-brand",r?"border-danger":"border-gray-400",k),...A}),r&&e.jsx("p",{id:m,role:"alert",className:"text-sm text-danger",children:r})]})});d.displayName="Input";d.__docgenInfo={description:`Accessible text input.

Accessibility notes:
- Label is always rendered and linked via htmlFor / id (WCAG 1.3.1, 4.1.2).
- Hint and error are linked with aria-describedby so they are announced.
- Errors set aria-invalid and use role="alert" for live announcement.
- Required fields are marked with aria-required, not just a visual asterisk.`,methods:[],displayName:"Input",props:{label:{required:!0,tsType:{name:"string"},description:"Visible label — required for accessibility. Never use placeholder as a label."},hint:{required:!1,tsType:{name:"string"},description:"Optional helper text shown below the field."},error:{required:!1,tsType:{name:"string"},description:"Error message. When present, the field is marked invalid and announced."}}};const V={title:"Components/Input",component:d,tags:["autodocs"],parameters:{docs:{description:{component:'Accessible text input. The label is always rendered and linked via htmlFor/id (WCAG 1.3.1, 4.1.2). Hints and errors are linked with aria-describedby; errors set aria-invalid and are announced via role="alert".'}}}},s={args:{label:"Email address",type:"email",placeholder:"you@example.com"}},t={args:{label:"Password",type:"password",hint:"At least 12 characters."}},n={args:{label:"Email address",type:"email",error:"Please enter a valid email address.",defaultValue:"not-an-email"}},i={args:{label:"Full name",required:!0}};var u,b,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com'
  }
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var f,g,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    hint: 'At least 12 characters.'
  }
}`,...(x=(g=t.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var y,v,w;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Email address',
    type: 'email',
    error: 'Please enter a valid email address.',
    defaultValue: 'not-an-email'
  }
}`,...(w=(v=n.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var E,j,I;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Full name',
    required: true
  }
}`,...(I=(j=i.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};const B=["Default","WithHint","WithError","Required"];export{s as Default,i as Required,n as WithError,t as WithHint,B as __namedExportsOrder,V as default};
