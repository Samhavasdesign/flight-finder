import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{t as r}from"./jsx-runtime-1mKRgjuZ.js";var i,a,o,s,c,l,u,d,f,p=e((()=>{i=`_root_u3kvk_10`,a=`_textGroup_u3kvk_25`,o=`_label_u3kvk_30`,s=`_description_u3kvk_41`,c=`_switchWrap_u3kvk_54`,l=`_hiddenInput_u3kvk_61`,u=`_track_u3kvk_66`,d=`_thumb_u3kvk_75`,f={root:i,"root--disabled":`_root--disabled_u3kvk_15`,textGroup:a,label:o,description:s,switchWrap:c,hiddenInput:l,track:u,thumb:d}})),m,h,g,_=e((()=>{m=r(),h=t(n()),p(),g=(0,h.forwardRef)(({label:e,description:t,disabled:n,className:r,id:i,...a},o)=>{let s=i??`toggle-${e.toLowerCase().replace(/\s+/g,`-`)}`;return(0,m.jsxs)(`div`,{className:`${f.root} ${n?f[`root--disabled`]:``} ${r??``}`,children:[(0,m.jsxs)(`div`,{className:f.textGroup,children:[(0,m.jsx)(`label`,{htmlFor:s,className:f.label,children:e}),t&&(0,m.jsx)(`span`,{className:f.description,children:t})]}),(0,m.jsxs)(`div`,{className:f.switchWrap,children:[(0,m.jsx)(`input`,{ref:o,type:`checkbox`,role:`switch`,id:s,disabled:n,className:f.hiddenInput,...a}),(0,m.jsx)(`span`,{className:f.track,"aria-hidden":`true`,children:(0,m.jsx)(`span`,{className:f.thumb})})]})]})}),g.displayName=`Toggle`,g.__docgenInfo={description:`Toggle (Switch) — The Sommelier Editorial System

Binary preference switch. 48×24px pill.
On:  black track, white thumb aligned to right edge.
Off: #c6c6c6 track, white thumb aligned to left edge.

Instantaneous state cuts — no transition on thumb movement.
Used for: notification preferences, privacy settings, etc.`,methods:[],displayName:`Toggle`,props:{label:{required:!0,tsType:{name:`string`},description:`Primary label`},description:{required:!1,tsType:{name:`string`},description:`Optional secondary description line`}},composes:[`Omit`]}})),v,y,b,x,S;e((()=>{_(),v={title:`Components/Toggle`,component:g,args:{label:`Notification alerts`,description:`Receive real-time shipment updates`}},y={},b={args:{defaultChecked:!0}},x={args:{disabled:!0}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Checked`,`Disabled`]}))();export{b as Checked,y as Default,x as Disabled,S as __namedExportsOrder,v as default};