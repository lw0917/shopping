function ajax(obj){
    var async=obj.async===false||true;
    var type=obj.type||'get';
    var data=getData(obj.data);
    var url=obj.url;
    var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status===200){
                   obj.success&&obj.success(xhr.responseText)
                }else{
                    obj.error&&obj.error(xhr.status)
                }
            }
        }
      if(type.toUpperCase==='GET'){
           url=data?url+'?'+data:url;
           xhr.open(type,url,async)
           xhr.send()
      }else{
        xhr.open(type,url,async)
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);
      }
}
function getData(data){
    var arr=[];
    for(var key in data){
        arr.push(key+'='+data[key])
    }
    return arr.join('&')
}