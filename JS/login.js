(function(){
 var m=$('#m');
 if(DB.cur()){var cu=DB.users()[DB.cur()];location.replace(cu.role==='admin'?'admin.html':'client.html')}
 $('#eye').onclick=function(){var p=$('#p');p.type=p.type==='password'?'text':'password'};
 function go(){
  var k=$('#u').value.trim().toLowerCase(),p=$('#p').value,U=DB.users();
  if(!k||!p)return showMsg(m,'اكتب اسم المستخدم وكلمة المرور.');
  if(!U[k]||U[k].pw!==p)return showMsg(m,'اسم المستخدم أو كلمة المرور غير صحيحة. راجع البيانات وحاول مرة تانية.');
  DB.login(k);location.href=U[k].role==='admin'?'admin.html':'client.html';
 }
 $('#go').onclick=go;
 document.addEventListener('keydown',function(e){if(e.key==='Enter')go()});
})();
