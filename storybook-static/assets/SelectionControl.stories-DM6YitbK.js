import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{t as r}from"./jsx-runtime-1mKRgjuZ.js";var i,a,o,s,c,l,u,d=e((()=>{i=`_control_17neu_14`,a=`_hiddenInput_17neu_27`,o=`_controlLabel_17neu_35`,s=`_checkbox_17neu_53`,c=`_checkmark_17neu_63`,l=`_radio_17neu_90`,u={control:i,"control--disabled":`_control--disabled_17neu_20`,hiddenInput:a,controlLabel:o,"controlLabel--italic":`_controlLabel--italic_17neu_45`,checkbox:s,checkmark:c,radio:l}})),f,p,m,h,g=e((()=>{f=r(),p=t(n()),d(),m=(0,p.forwardRef)(({label:e,labelItalic:t=!1,disabled:n,className:r,id:i,...a},o)=>{let s=i??`checkbox-${e.toLowerCase().replace(/\s+/g,`-`)}`;return(0,f.jsxs)(`label`,{htmlFor:s,className:`${u.control} ${n?u[`control--disabled`]:``} ${r??``}`,children:[(0,f.jsx)(`input`,{ref:o,type:`checkbox`,id:s,disabled:n,className:u.hiddenInput,...a}),(0,f.jsx)(`span`,{className:u.checkbox,"aria-hidden":`true`,children:(0,f.jsx)(`svg`,{className:u.checkmark,viewBox:`0 0 10 8`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":`true`,children:(0,f.jsx)(`path`,{d:`M1 3.5L3.8 6.5L9 1`,stroke:`white`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})})}),(0,f.jsx)(`span`,{className:`${u.controlLabel} ${t?u[`controlLabel--italic`]:``}`,children:e})]})}),m.displayName=`Checkbox`,h=(0,p.forwardRef)(({label:e,labelItalic:t=!1,disabled:n,className:r,id:i,...a},o)=>{let s=i??`radio-${e.toLowerCase().replace(/\s+/g,`-`)}`;return(0,f.jsxs)(`label`,{htmlFor:s,className:`${u.control} ${n?u[`control--disabled`]:``} ${r??``}`,children:[(0,f.jsx)(`input`,{ref:o,type:`radio`,id:s,disabled:n,className:u.hiddenInput,...a}),(0,f.jsx)(`span`,{className:u.radio,"aria-hidden":`true`}),(0,f.jsx)(`span`,{className:`${u.controlLabel} ${t?u[`controlLabel--italic`]:``}`,children:e})]})}),h.displayName=`Radio`,m.__docgenInfo={description:`Checkbox — The Sommelier Editorial System

States:
  unchecked  → white bg, #c6c6c6 border
  checked    → black bg + white checkmark
  disabled   → 40% opacity, not-allowed cursor`,methods:[],displayName:`Checkbox`,props:{label:{required:!0,tsType:{name:`string`},description:``},labelItalic:{required:!1,tsType:{name:`boolean`},description:`Renders label in italic — used for disabled state in Figma`,defaultValue:{value:`false`,computed:!1}}},composes:[`Omit`]},h.__docgenInfo={description:`Radio — The Sommelier Editorial System

States:
  unselected → white bg, #c6c6c6 border
  selected   → black dot inside white circle
  disabled   → 40% opacity, not-allowed cursor

Note: Radio uses a circular indicator — one of the few round elements
in the system, by explicit Figma spec.`,methods:[],displayName:`Radio`,props:{label:{required:!0,tsType:{name:`string`},description:``},labelItalic:{required:!1,tsType:{name:`boolean`},description:`Renders label in italic — used for disabled state in Figma`,defaultValue:{value:`false`,computed:!1}}},composes:[`Omit`]}})),_,v,y,b,x,S,C,w,T;e((()=>{_=r(),g(),v={title:`Components/SelectionControl/Checkbox`,component:m,args:{label:`Accept terms`}},y={},b={args:{defaultChecked:!0,label:`Accepted`}},x={args:{disabled:!0,label:`Disabled checkbox`,labelItalic:!0}},S={name:`Radio / Default`,render:()=>(0,_.jsx)(h,{name:`trip`,label:`One-way`})},C={name:`Radio / Checked`,render:()=>(0,_.jsx)(h,{name:`trip`,label:`Round-trip`,defaultChecked:!0})},w={name:`Radio / Disabled`,render:()=>(0,_.jsx)(h,{name:`trip`,label:`Disabled option`,disabled:!0,labelItalic:!0})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    label: "Accepted"
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: "Disabled checkbox",
    labelItalic: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: "Radio / Default",
  render: () => <Radio name="trip" label="One-way" />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: "Radio / Checked",
  render: () => <Radio name="trip" label="Round-trip" defaultChecked />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: "Radio / Disabled",
  render: () => <Radio name="trip" label="Disabled option" disabled labelItalic />
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Checked`,`Disabled`,`RadioDefault`,`RadioChecked`,`RadioDisabled`]}))();export{b as Checked,y as Default,x as Disabled,C as RadioChecked,S as RadioDefault,w as RadioDisabled,T as __namedExportsOrder,v as default};