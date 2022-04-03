(this["webpackJsonp@minimal/material-kit-react"]=this["webpackJsonp@minimal/material-kit-react"]||[]).push([[41],{4483:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return H}));var r=a(5),i=a(28),n=a(7),s=a(500),c=a(499),l=a(78),o=a(391),d=a(99),j=a(3630),m=a(71),b=a(25),u=a(1215),x=a(392),h=a(45),O=a(2),p=a(6),f=a.n(p),g=a(14),v=a(12),w=a(39),y=a(1),N=a(18),S=a(57),k=a(41),T=a(171),q=a.n(T),C=a(236),W=a.n(C),B=a(1097),L=a.n(B),P=a(138),F=a(3600),A=a(3599),E=a(3626),I=a(3504),M=a(3493),_=a(291),D=a(0);function J(){var e=Object(m.a)().register,t=Object(_.a)(),a=Object(S.b)(),r=a.enqueueSnackbar,i=a.closeSnackbar,n=Object(y.useState)(!1),s=Object(v.a)(n,2),c=s[0],l=s[1],o=w.e().shape({firstName:w.g().min(2,"Too Short!").max(50,"Too Long!").required("First name required"),lastName:w.g().min(2,"Too Short!").max(50,"Too Long!").required("Last name required"),email:w.g().email("Email must be a valid email address").required("Email is required"),password:w.g().required("Password is required")}),d=Object(k.c)({initialValues:{firstName:"",lastName:"",email:"",password:""},validationSchema:o,onSubmit:function(){var a=Object(g.a)(f.a.mark((function a(n,s){var c,l;return f.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=s.setErrors,l=s.setSubmitting,a.prev=1,a.next=4,e(n.email,n.password,n.firstName,n.lastName);case 4:r("Register success",{variant:"success",action:function(e){return Object(D.jsx)(h.f,{size:"small",onClick:function(){return i(e)},children:Object(D.jsx)(N.a,{icon:W.a})})}}),t.current&&l(!1),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),t.current&&(c({afterSubmit:a.t0.message}),l(!1));case 11:case"end":return a.stop()}}),a,null,[[1,8]])})));return function(e,t){return a.apply(this,arguments)}}()}),j=d.errors,b=d.touched,u=d.handleSubmit,x=d.isSubmitting,p=d.getFieldProps;return Object(D.jsx)(k.b,{value:d,children:Object(D.jsx)(k.a,{autoComplete:"off",noValidate:!0,onSubmit:u,children:Object(D.jsxs)(P.a,{spacing:3,children:[j.afterSubmit&&Object(D.jsx)(F.a,{severity:"error",children:j.afterSubmit}),Object(D.jsxs)(P.a,{direction:{xs:"column",sm:"row"},spacing:2,children:[Object(D.jsx)(A.a,Object(O.a)(Object(O.a)({fullWidth:!0,label:"First name"},p("firstName")),{},{error:Boolean(b.firstName&&j.firstName),helperText:b.firstName&&j.firstName})),Object(D.jsx)(A.a,Object(O.a)(Object(O.a)({fullWidth:!0,label:"Last name"},p("lastName")),{},{error:Boolean(b.lastName&&j.lastName),helperText:b.lastName&&j.lastName}))]}),Object(D.jsx)(A.a,Object(O.a)(Object(O.a)({fullWidth:!0,autoComplete:"username",type:"email",label:"Email address"},p("email")),{},{error:Boolean(b.email&&j.email),helperText:b.email&&j.email})),Object(D.jsx)(A.a,Object(O.a)(Object(O.a)({fullWidth:!0,autoComplete:"current-password",type:c?"text":"password",label:"Password"},p("password")),{},{InputProps:{endAdornment:Object(D.jsx)(E.a,{position:"end",children:Object(D.jsx)(I.a,{edge:"end",onClick:function(){return l((function(e){return!e}))},children:Object(D.jsx)(N.a,{icon:c?q.a:L.a})})})},error:Boolean(b.password&&j.password),helperText:b.password&&j.password})),Object(D.jsx)(M.a,{fullWidth:!0,size:"large",type:"submit",variant:"contained",loading:x,children:"Register"})]})})})}var R=a(1098),z=Object(n.a)(x.a)((function(e){var t=e.theme;return Object(r.a)({},t.breakpoints.up("md"),{display:"flex"})})),G=Object(n.a)(s.a)((function(e){return{width:"100%",maxWidth:464,display:"flex",flexDirection:"column",justifyContent:"center",margin:e.theme.spacing(2,0,2,2)}})),V=Object(n.a)("div")((function(e){return{maxWidth:480,margin:"auto",display:"flex",minHeight:"100vh",flexDirection:"column",justifyContent:"center",padding:e.theme.spacing(12,0)}}));function H(){var e=Object(m.a)().method;return Object(D.jsxs)(z,{title:"Register | Minimal-UI",children:[Object(D.jsxs)(u.a,{children:["Already have an account? \xa0",Object(D.jsx)(c.a,{underline:"none",variant:"subtitle2",component:i.b,to:b.a.login,children:"Login"})]}),Object(D.jsx)(h.e,{width:"mdDown",children:Object(D.jsxs)(G,{children:[Object(D.jsx)(l.a,{variant:"h3",sx:{px:5,mt:10,mb:5},children:"Manage the job more effectively with Minimal"}),Object(D.jsx)("img",{alt:"register",src:"/static/illustrations/illustration_register.png"})]})}),Object(D.jsx)(o.a,{children:Object(D.jsxs)(V,{children:[Object(D.jsxs)(d.a,{sx:{mb:5,display:"flex",alignItems:"center"},children:[Object(D.jsxs)(d.a,{sx:{flexGrow:1},children:[Object(D.jsx)(l.a,{variant:"h4",gutterBottom:!0,children:"Get started absolutely free."}),Object(D.jsx)(l.a,{sx:{color:"text.secondary"},children:"Free forever. No credit card needed."})]}),Object(D.jsx)(j.a,{title:("firebase"===e?"Firebase":"cognito"===e&&"Cognito")||"JWT",children:Object(D.jsx)(d.a,{component:"img",src:"/static/auth/".concat(("firebase"===e?"ic_firebase":"cognito"===e&&"ic_cognito")||"ic_jwt",".png"),sx:{width:32,height:32}})})]}),"firebase"===e&&Object(D.jsx)(R.a,{}),Object(D.jsx)(J,{}),Object(D.jsxs)(l.a,{variant:"body2",align:"center",sx:{color:"text.secondary",mt:3},children:["By registering, I agree to Minimal\xa0",Object(D.jsx)(c.a,{underline:"always",sx:{color:"text.primary"},children:"Terms of Service"}),"\xa0and\xa0",Object(D.jsx)(c.a,{underline:"always",sx:{color:"text.primary"},children:"Privacy Policy"}),"."]}),Object(D.jsxs)(l.a,{variant:"subtitle2",sx:{mt:3,textAlign:"center"},children:["Already have an account?\xa0",Object(D.jsx)(c.a,{to:b.a.login,component:i.b,children:"Login"})]})]})})]})}}}]);
//# sourceMappingURL=41.0637a407.chunk.js.map