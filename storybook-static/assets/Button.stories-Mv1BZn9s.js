import{n as e}from"./chunk-vNrZSFDR.js";import{t}from"./jsx-runtime-1mKRgjuZ.js";var n,r,i,a,o,s,c,l=e((()=>{n=`_button_1kane_13`,r=`_label_1kane_192`,i=`_iconWrap_1kane_196`,a=`_iconLeft_1kane_210`,o=`_iconRight_1kane_214`,s=`_tertiaryArrow_1kane_219`,c={button:n,"variant--primary":`_variant--primary_1kane_49`,"variant--secondary":`_variant--secondary_1kane_70`,"variant--tertiary":`_variant--tertiary_1kane_91`,"variant--tonal":`_variant--tonal_1kane_114`,"size--sm":`_size--sm_1kane_141`,"size--md":`_size--md_1kane_148`,"size--lg":`_size--lg_1kane_155`,"full-width":`_full-width_1kane_166`,"icon-only":`_icon-only_1kane_171`,label:r,iconWrap:i,iconLeft:a,iconRight:o,tertiaryArrow:s}})),u,d,f=e((()=>{u=t(),l(),d=({variant:e=`primary`,size:t=`md`,iconLeft:n,iconRight:r,iconOnly:i,fullWidth:a=!1,className:o,children:s,disabled:l,...d})=>{let f=[c.button,c[`variant--${e}`],c[`size--${t}`],a?c[`full-width`]:``,i?c[`icon-only`]:``,o??``].filter(Boolean).join(` `);return i?(0,u.jsx)(`button`,{className:f,disabled:l,...d,children:(0,u.jsx)(`span`,{className:c.iconWrap,children:i})}):(0,u.jsxs)(`button`,{className:f,disabled:l,...d,children:[n&&(0,u.jsx)(`span`,{className:`${c.iconWrap} ${c.iconLeft}`,children:n}),(0,u.jsx)(`span`,{className:c.label,children:s}),r&&(0,u.jsx)(`span`,{className:`${c.iconWrap} ${c.iconRight}`,children:r}),e===`tertiary`&&!r&&(0,u.jsx)(`span`,{className:c.tertiaryArrow,"aria-hidden":`true`,children:`→`})]})},d.__docgenInfo={description:`Button — The Sommelier Editorial System

Four variants reflecting the button hierarchy:
  primary   → Solid black / ink fill — the "confident cut" anchor
  secondary → Ghost / 1px outline — subordinate action
  tertiary  → Text only with inline arrow indicator
  tonal     → Surface-3 fill — low-emphasis / destructive-adjacent

Three sizes: sm (32px), md (48px), lg (64px)
States: default, hover, active (scale 0.98), disabled
No border radius — 0px corners are intentional.`,methods:[],displayName:`Button`,props:{variant:{required:!1,tsType:{name:`union`,raw:`'primary' | 'secondary' | 'tertiary' | 'tonal'`,elements:[{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'tertiary'`},{name:`literal`,value:`'tonal'`}]},description:`Visual variant — maps to the four Sommelier hierarchy levels`,defaultValue:{value:`'primary'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`}]},description:`Size scale — sm (32px), md (48px, default), lg (64px)`,defaultValue:{value:`'md'`,computed:!1}},iconLeft:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Icon rendered to the left of the label`},iconRight:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Icon rendered to the right of the label`},iconOnly:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:`Icon-only mode — renders a square button, ignores children`},fullWidth:{required:!1,tsType:{name:`boolean`},description:`Fills the full width of its container`,defaultValue:{value:`false`,computed:!1}}}}})),p,m,h,g,_,v,y,b;e((()=>{f(),p={title:`Components/Button`,component:d,args:{children:`Book now`,variant:`primary`,size:`md`,disabled:!1}},m={},h={args:{variant:`secondary`,children:`Secondary action`}},g={args:{variant:`tertiary`,children:`Learn more`}},_={args:{variant:`tonal`,children:`Tonal action`}},v={args:{disabled:!0,children:`Disabled button`}},y={args:{iconOnly:`✈`,"aria-label":`Search flights`}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "secondary",
    children: "Secondary action"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "tertiary",
    children: "Learn more"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "tonal",
    children: "Tonal action"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: "Disabled button"
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    iconOnly: "✈",
    "aria-label": "Search flights"
  }
}`,...y.parameters?.docs?.source}}},b=[`Default`,`Secondary`,`Tertiary`,`Tonal`,`Disabled`,`IconOnly`]}))();export{m as Default,v as Disabled,y as IconOnly,h as Secondary,g as Tertiary,_ as Tonal,b as __namedExportsOrder,p as default};