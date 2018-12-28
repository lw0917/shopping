/*
 * @Author: LiWei 
 * @Date: 2018-12-28 19:30:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-28 19:33:37
 */
     var btn=document.querySelector('.btn');
     var ipt=document.querySelector('.ipt');
     var list=document.querySelector('.list');
     
    btn.onclick=function(){
        var val=ipt.value;
           if(val){
            ajax({
                url:'/api/list?key='+val,
                success:function(res){
                  var data=JSON.parse(res);
                   if(data.code===1){
                       renderList(data.msg)
                   }else if(data.code===0){
                       list.innerHTML=data.msg;
                   }
                }
            })
           }
    }
    function renderList(data){
        var str='';
        data.forEach(function(file){
            str+='<div class="con">'+
            '<img src="'+file.url+'" alt="">'+
            '<h2>'+file.title+'</h2>'+
            '<span>'+file.price+'</span>'+
        '</div>'
        })
        list.innerHTML=str;
    }

  new BScroll('section',{
       probeType:2,
       click:true
   })