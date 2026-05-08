import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{t as r}from"./jsx-runtime-1mKRgjuZ.js";var i,a,o,s,c,l,u,d,f=e((()=>{i=`_root_qkrfm_9`,a=`_label_qkrfm_18`,o=`_wrapper_qkrfm_36`,s=`_field_qkrfm_86`,c=`_trailing_qkrfm_115`,l=`_errorMessage_qkrfm_125`,u=`_hint_qkrfm_135`,d={root:i,label:a,"label--error":`_label--error_qkrfm_28`,wrapper:o,"wrapper--error":`_wrapper--error_qkrfm_56`,"wrapper--filled":`_wrapper--filled_qkrfm_66`,"wrapper--disabled":`_wrapper--disabled_qkrfm_76`,field:s,trailing:c,errorMessage:l,hint:u}})),p,m,h,g=e((()=>{p=r(),m=t(n()),f(),h=(0,m.forwardRef)(({label:e,errorMessage:t,hint:n,trailingElement:r,filled:i=!1,multiline:a=!1,rows:o=4,disabled:s,className:c,id:l,...u},f)=>{let m=!!t,h=l??(e?e.toLowerCase().replace(/\s+/g,`-`):void 0),g=[d.wrapper,m?d[`wrapper--error`]:``,i?d[`wrapper--filled`]:``,s?d[`wrapper--disabled`]:``,c??``].filter(Boolean).join(` `);return(0,p.jsxs)(`div`,{className:d.root,children:[e&&(0,p.jsx)(`label`,{htmlFor:h,className:`${d.label} ${m?d[`label--error`]:``}`,children:e}),(0,p.jsxs)(`div`,{className:g,children:[a?(0,p.jsx)(`textarea`,{id:h,ref:f,rows:o,disabled:s,className:d.field,...u}):(0,p.jsx)(`input`,{id:h,ref:f,disabled:s,className:d.field,...u}),r&&(0,p.jsx)(`span`,{className:d.trailing,children:r})]}),m&&(0,p.jsx)(`span`,{className:d.errorMessage,children:t}),n&&!m&&(0,p.jsx)(`span`,{className:d.hint,children:n})]})}),h.displayName=`TextInput`,h.__docgenInfo={description:`TextInput — The Sommelier Editorial System

Variants:
  default   → bottom border only (#6b7280)
  focus     → full 1px black outline via :focus-within
  error     → red label + red text + red bottom border
  disabled  → 40% opacity, not-allowed cursor
  filled    → surface-1 background (textarea style)
  multiline → textarea element, same styling`,methods:[],displayName:`TextInput`,props:{label:{required:!1,tsType:{name:`string`},description:`Field label shown above the input`},errorMessage:{required:!1,tsType:{name:`string`},description:`Error message — triggers error state when provided`},hint:{required:!1,tsType:{name:`string`},description:`Helper text below the input (non-error)`},trailingElement:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Icon or element rendered at the trailing edge (e.g. show/hide password)`},filled:{required:!1,tsType:{name:`boolean`},description:`Use surface-container background instead of transparent (matches Figma textarea style)`,defaultValue:{value:`false`,computed:!1}},multiline:{required:!1,tsType:{name:`boolean`},description:`Multiline textarea variant`,defaultValue:{value:`false`,computed:!1}},rows:{required:!1,tsType:{name:`number`},description:`Number of visible rows for textarea`,defaultValue:{value:`4`,computed:!1}}},composes:[`Omit`]}})),_,v,y,b,x,S,C;e((()=>{g(),_={title:`Components/TextInput`,component:h,args:{label:`Full name`,placeholder:`Enter your full name`}},v={},y={args:{hint:`As shown on passport`}},b={args:{errorMessage:`Please enter a valid name`,defaultValue:`!`}},x={args:{disabled:!0,defaultValue:`Samantha Havas`}},S={args:{label:`Notes`,multiline:!0,filled:!0,rows:5,placeholder:`Add tasting notes...`}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    hint: "As shown on passport"
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    errorMessage: "Please enter a valid name",
    defaultValue: "!"
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: "Samantha Havas"
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Notes",
    multiline: true,
    filled: true,
    rows: 5,
    placeholder: "Add tasting notes..."
  }
}`,...S.parameters?.docs?.source}}},C=[`Default`,`WithHint`,`Error`,`Disabled`,`FilledMultiline`]}))();export{v as Default,x as Disabled,b as Error,S as FilledMultiline,y as WithHint,C as __namedExportsOrder,_ as default};