$(function(){$('.table-data').DataTable({"language":{"url":"//cdn.datatables.net/plug-ins/1.10.16/i18n/Portuguese-Brasil.json"}});$('#auth').on('submit',function(e){e?e.preventDefault():false;$('.alert').slideUp("slow");$('#auth button').html("Autenticando...")
$.ajax({url:"/loja/auth",type:"POST",dataType:'JSON',data:$(this).serialize(),complete:function(result){var r=JSON.parse(result.responseText);console.log(result.responseText);if(r.response=="ok"){$('.alert-success').slideDown().html(r.message);$('#auth input').prop('disabled',true);$('#auth button').prop('disabled',true);setInterval(function(){location.reload();},2000);$('#auth button').html("CONFIRMAR");}else{$('.alert-danger').slideDown().html(r.message);$('#auth button').html("CONFIRMAR");}}});return false;});$('.add-to-cart').on('click',function(e){e?e.preventDefault():false;var id=$(this).attr('id');$.ajax({url:"/loja/addCart",type:"POST",dataType:'JSON',data:{'id':id},complete:function(result){var r=JSON.parse(result.responseText);if(r.response=="ok"){window.location.href="/loja/carrinho";}}});return false;});$('.remove-from-cart').on('click',function(e){e?e.preventDefault():false;$.ajax({url:"/loja/removeCart",type:"POST",data:{'id':$(this).attr('id')},complete:function(){window.location.reload();}});return false;});$('#btn-checkout').click(function(){var nick=$('#nickname');var cupom=$('#cupom');var gateway=$('#gateway:checked');var termos=$("#termos");if(nick.val()==""){return nick.focus();}
if(!termos.is(':checked')){return termos.focus();}
nick.prop('disabled',true);cupom.prop('disabled',true);$(this).prop('disabled',true);$(this).prop('tabindex','-1');$.ajax({url:"/loja/checkout",type:"POST",dataType:'JSON',data:{nickname:nick.val(),gateway:gateway.val()},complete:function(result){console.log(result.responseText);var r=JSON.parse(result.responseText);if(r.response=="ok"){location.href=r.url;}else{$(this).prop('tabindex',"1");$(this).prop('disabled',false);}}});});function loadFeed(init,max){var dados={init:init,max:max};$.ajax({url:"/home/get",type:"POST",data:dados,dataType:"json",complete:function(data){var data=JSON.parse(data.responseText);if(data.totalResults>0){for(i=0;i<data.dados.length;i++){html="<div class=\"feed\">\n"+
"                    <div class=\"header\">"+data.dados[i].titulo+"</div>\n"+
"                    <div class=\"image\">\n"+
"                        <img src=\""+data.dados[i].imagem+"\" alt=\" - NotÃ­cia\" class=\"img-fluid\">\n"+
"                    </div>\n"+
"                    <div class=\"body\">\n"+data.dados[i].resumo+
"                    </div>\n"+
"                    <div class=\"date\">\n"+data.dados[i].data+
"                    </div>\n"+
"                    <div class=\"foo\">\n"+
"                        <div class=\"author\">\n"+
"                            Postado por "+data.dados[i].autor+" as "+data.dados[i].hora+
"                            <button class=\"btn btn-sm btn-primary float-right\" onclick=\"goTo('"+data.dados[i].noticia+"')\">Continuar lendo</button>\n"+
"                        </div>\n"+
"                    </div>\n"+
"                </div>";$('.feedlist').append(html).fadeIn("slow");}
var conta=$(".feedlist .feed").length;if(conta==data.totalResults){$("#nav-pag-feed").hide();}}else{$(".feedlist").html("<h3 class='text-center'>NÃ£o hÃ¡ notÃ­cias</h3>")
$("#nav-pag-feed").hide();}}});}
if($('.feedlist').length>0){loadFeed(0,5);}
$("#loadfeedmore").click(function(e){e.preventDefault();var init=$(".feedlist .feed").length;loadFeed(init,5);});});function goTo(str,boolean){if(boolean){return window.open(str,"_blank");}
window.location.href=str;}
function copyToClipboard(text){if(window.clipboardData&&window.clipboardData.setData){return clipboardData.setData("Text",text);}else if(document.queryCommandSupported&&document.queryCommandSupported("copy")){var textarea=document.createElement("textarea");textarea.textContent=text;textarea.style.position="fixed";document.body.appendChild(textarea);textarea.select();try{return document.execCommand("copy");}catch(ex){console.warn("Copy to clipboard failed.",ex);return false;}finally{document.body.removeChild(textarea);}}}
$('input#cupom').keyup(function(){var $this=$(this);var valueSeach=$this.val();var campo1=$(".valorDesconto");var campo2=$(".valorTotal");if(valueSeach.length>=1){$.ajax({url:"/loja/addDiscount",type:"POST",dataType:'JSON',data:{'hash':valueSeach},complete:function(result){console.log(result.responseText);var r=JSON.parse(result.responseText);if(r.response=="ok"){$this.prop('disabled',true);campo1.html(r.discount).fadeIn("slow");campo2.html(r.total).fadeIn("slow");}}});}else{campo1.html("R$00,00");}});
