


$(function() {


    $(".menuico ").click(function() {
        $(".menuico").toggleClass("on");
        $(".menu").slideToggle();
		$(".dropdown.history").slideToggle();
    })
	
    $(".bfjl").click(function() {
		$(".bfjl").toggleClass("close");
		$(".historyhead").slideToggle();
    })
	


});



/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});

var hzwcms = {
	'Cookie': {
		'Set':function(name,value,days){
	        var expires;
	        if (days) {
	            expires = days;
	        } else{
	            expires = "";
	        }
	        $.cookie(name,value,{expires:expires,path:'/'});
		},
		'Get':function(name){
			var styles = $.cookie(name);
		    return styles;
		},
		'Del':function(name,tips){
			if(window.confirm(tips)){
	            $.cookie(name,null,{expires:-1,path: '/'});
	            location.reload();
	       	}else{
	            return false;
	        }
		}
	},
	'history': function() {
		var history_get = hzwcms.Cookie.Get("history");
		if(history_get){
		    var json=eval("("+history_get+")");
		    var list="";
		    for(i=0;i<json.length;i++){
		        list = list + "<li><a href='"+json[i].link+"' title='"+json[i].name+"'><span class='pull-right text-red'>"+json[i].part+"</span>"+json[i].name+"</a></li>";
		    }
		    $("#stui_history").append(list);
		}
		else{
	           $("#stui_history").append("<p style='padding: 80px 0; text-align: center'>您还没有看过影片哦</p>");
		}
	    $(".historyclean").on("click",function(){
	    	$.cookie("history",null,{expires:-1,path: '/'});
	    })		    
	},	
	'Other': {
		'History': {
			'Init':function(){
				if($(".vod_history").length){
	                var $that = $(".vod_history");
	                hzwcms.Other.History.Set($that.attr('data-name'),$that.attr('data-link'),$that.attr('data-pic'),$that.attr('data-part'),$that.attr('data-limit'));
	            }
			},
			'Set':function(name,link,pic,part,limit){
				if(!link){ link = document.URL;}
				var history = hzwcms.Cookie.Get("history");
			    var len=0;
			    var canadd=true;
			    if(history){
			        history = eval("("+history+")"); 
			        len=history.length;
			        $(history).each(function(){
			            if(name==this.name){
			                canadd=false;
			                var json="[";
			                $(history).each(function(i){
			                    var temp_name,temp_img,temp_url,temp_part;
			                    if(this.name==name){
			                        temp_name=name;temp_img=pic;temp_url=link;temp_part=part;
			                    }else{
			                        temp_name=this.name;temp_img=this.pic;temp_url=this.link;temp_part=this.part;
			                    }
			                    json+="{\"name\":\""+temp_name+"\",\"pic\":\""+temp_img+"\",\"link\":\""+temp_url+"\",\"part\":\""+temp_part+"\"}";
			                    if(i!=len-1)
			                    json+=",";
			                })
			                json+="]";
			                hzwcms.Cookie.Set('history',json,365);
			                return false;
			            }
			        });
			    }
			    if(canadd){
			        var json="[";
			        var start=0;
			        var isfirst="]";
			        isfirst=!len?"]":",";
			        json+="{\"name\":\""+name+"\",\"pic\":\""+pic+"\",\"link\":\""+link+"\",\"part\":\""+part+"\"}"+isfirst;
			        if(len>limit-1)
		            	len-=1;
		        	for(i=0;i<len-1;i++){
		            	json+="{\"name\":\""+history[i].name+"\",\"pic\":\""+history[i].pic+"\",\"link\":\""+history[i].link+"\",\"part\":\""+history[i].part+"\"},";
		       	 	}
		        	if(len>0){
		            	json+="{\"name\":\""+history[len-1].name+"\",\"pic\":\""+history[len-1].pic+"\",\"link\":\""+history[len-1].link+"\",\"part\":\""+history[len-1].part+"\"}]";
		        	}
			        hzwcms.Cookie.Set('history',json,365);
			    }  
			}
		}
	}	
};

$(function(){
	hzwcms.history();
	hzwcms.Other.History.Init();
	document.onkeydown=function(){
		var e = window.event||arguments[0];
		 if(e.keyCode==123){
		 	return false;
		 }
		 if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
		 	return false;
		 }
		 if((e.ctrlKey)&&(e.keyCode==85)){
		 	return false;
		 }
		 if((e.ctrlKey)&&(e.keyCode==83)){
		    return false;
		 }
	}
	 document.oncontextmenu=function(){
	 	return false;
	 }
	var threshold = 160;
	 window.setInterval(function() {
	     if (window.outerWidth - window.innerWidth > threshold ||   
	     window.outerHeight - window.innerHeight > threshold) {  
	 		function disableDebugger() {
	 			debugger;
	 		}
	 		$(document).ready(function () {
	 			disableDebugger();
	 		});
	     }  
	 }, 1e3); 
});

