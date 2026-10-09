/* الصفحة الرئيسية */
(function(){
 // بيانات التواصل من الإعدادات
 $('#cPhone span').textContent=CONFIG.phone;$('#cPhone').href='tel:'+CONFIG.phone;
 $('#cWa').href='https://wa.me/'+CONFIG.wa;$('#cAddr').textContent=CONFIG.address;$('#cHours').textContent=CONFIG.hours;
 // قلب الكارت باللمس على الموبايل
 $$('.card').forEach(function(c){
  c.addEventListener('click',function(e){if(e.target.closest('.btn-buy'))return;
   var was=c.classList.contains('flip');$$('.card.flip').forEach(function(x){x.classList.remove('flip')});if(!was)c.classList.add('flip')});
  c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();c.classList.toggle('flip')}});
 });
 // أسهم الباقات
 var tr=$('#track');
 $$('.icon-d button').forEach(function(b){b.addEventListener('click',function(){tr.scrollBy({left:(+b.dataset.dir)*300,behavior:'smooth'})})});
 // تكرار الآراء لحركة مستمرة بدون قطع
 var s=$('#slider');$$('.rbox',s).forEach(function(r){var c=r.cloneNode(true);c.setAttribute('aria-hidden','true');s.appendChild(c)});
})();
