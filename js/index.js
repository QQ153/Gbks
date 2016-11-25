$(function() {
	FastClick.attach(document.body);
	//首屏预加载
	var page1Num = 0;
	for(var i = 0,len=$("#page1 img").length;i<len;i++){
		var img = new Image();
		img.src = $("#page1 img").eq(i).attr("data-src");
		img.onload = function() {
			page1Num++;
			if(page1Num==len){
				$("#page1 img").attr("src",function(){
					return $(this).attr("data-src");
				})
				$("#page1 img").removeAttr("data-src");
				$("#wrap>img").attr("src",function(){
					return $(this).attr("data-src");
				})
				$("#wrap>img").removeAttr("data-src");
				$("#page1").show(0,function() {
					preload();
				});
				$("#logo").show();

			}
		}
	}

	//所有图片预加载
	// preload();
	function preload(){
		var imgNum = 0;
		for(var j = 0,allLen=$(".page img:not('#page1 img')").length;j<allLen;j++){
			var img = new Image();
			img.onload = function() {
				imgNum++;
				var percent = Math.ceil(imgNum/allLen*100);
				$("#processBar span").html(percent+"%");
				// alert(percent);
				console.log($("#processBar span").html());
				$("#processBar").css({
					width:percent*0.9468+"%"
				})
				// console.log(imgNum);
				if(imgNum==allLen){
					// alert(percent);
					$(".page img:not('#page1 img')").attr("src",function(){
						return $(this).attr("data-src");
					})
					$("#page1").hide();
					$("#page2").show();
				}
			}
			img.src = $(".page img:not('#page1 img')").eq(j).attr("data-src");
		}
	}

	//阻止页面默认事件
	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	},false);
	$("#page2").swipe( {
		swipeUp:function(e) {
			$("#page2").hide();
			$("#page3").show();
			e.stopPropagation();
		}
		});
	$("#page3").swipe( {
		swipeUp:function(e) {
			$("#page3").hide();
			$("#page4").show();
			e.stopPropagation();
		},
		swipeDown:function(e) {
			$("#page3").hide();
			$("#page2").show();
			e.stopPropagation();
		}
		});
	$("#page4").swipe( {
		swipeDown:function(e) {
			$("#page4").hide();
			$("#page3").show();
			e.stopPropagation();
		}
		});
	$("#page5").swipe( {
		swipeDown:function(e) {
			$("#page5").hide();
			$("#page4").show();
			e.stopPropagation();
		}
		});
	$("#page6").swipe( {
		swipeDown:function(e) {
			$("#page6").hide();
			$("#page4").show();
			e.stopPropagation();
		}
		});
	$("#page7").swipe( {
		swipeDown:function(e) {
			$("#page7").hide();
			$("#page6").show();
			e.stopPropagation();
		}
		});
	$("#page8").swipe( {
		swipeDown:function(e) {
			$("#page8").hide();
			$("#page7").show();
			e.stopPropagation();
		}
		});
	$("#page9").swipe( {
		swipeDown:function(e) {
			$("#page9").hide();
			$("#page8").show();
			e.stopPropagation();
		}
		});
	$("#info").swipe( {
		tap:function(e) {
			$("#page4").hide();
			$("#page5").show()
		}
		});
	$("#backBtn").swipe( {
		tap:function(e) {
			$("#page5").hide();
			$("#page4").show();
		}
		});
	//开启一重豪礼
	$("#open1").swipe({
		tap:function(){
			$("#page4").hide();
			$("#page6").show();
		}
	})
	//开启二重豪礼
	$("#open2").swipe({
		tap:function(){
			$("#page6").hide();
			$("#page7").show();
		}
	})
	//开启三重豪礼
	$("#open3").swipe({
		tap:function(){
			$("#page7").hide();
			$("#page8").show();
		}
	})
	//激情预订
	$("#bookBtn").swipe({
		tap:function(){
			$("#page8").hide();
			$("#page9").show();
		}
	})
	//分享
	$(".shareBtn").swipe({
		tap:function(){
			$("#shareMark").show();
		}
	})
	$("#shareMark").swipe({
		tap:function(){
			$(this).hide();
		}
	})
	$(".vedioBox").swipe({
		tap:function(){
			$("#vidBox").show().find('#vid')[0].play();
			$("#vid").on('ended',function(){
				$("#vidBox").hide();
			})
		}
	})

	//抽奖部分
	var timeOut = function(){  //超时函数
        $("#trunplate").rotate({
            angle:0,
            duration: 10000,
            animateTo: 2160,  //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
            callback:function(){
                alert('网络超时')
            }
        });
    };
    var rotateFunc = function(awards,angle,data){  //awards:奖项，angle:奖项对应的角度，text:提示文字
        $('#trunplate').stopRotate();
        $("#trunplate").rotate({
            angle:0,
            duration: 6000,
            animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback:function(){
                // alert(text)
                succFn(data);
            }
        });
    };
    $("#startBtn").click(function() {
        var time = [0,1];
                        //     time = time[Math.floor(Math.random()*time.length)];
        var time = 1;
        if(time==0){
            timeOut(); //网络超时
        }
        if(time==1){
            // var data = [1,2,3,0]; //返回的数组
                // data = Math.floor(Math.random()*4);
                var data = 0;
            if(data==1){
                rotateFunc(1,-75,data)
            }
            if(data==2){
                var angle = [-225,-315];
                    angle = angle[Math.floor(Math.random()*angle.length)];
                rotateFunc(2,angle,data)
            }
            if(data==3){
                var angle = [-45,-165,-345];
                    angle = angle[Math.floor(Math.random()*angle.length)]
                rotateFunc(3,angle,data)
            }
            if(data==0){
                var angle = [-15,-105,-135,-195,-255,-285];
                    angle = angle[Math.floor(Math.random()*angle.length)]
                rotateFunc(0,angle,data)
            }
        }
    });
    function succFn(data) {
        $("#page10").show();
        $("#page9").hide();
        switch (data) {
            case 0:
                $("#noawardBox").show();
            break;
            case 1:
                $("#awardBox").show().nextAll().hide();
                $("#priseBox").attr("src","img/prise1.png");
            break;
            case 2:
                $("#awardBox").show().nextAll().hide();
                $("#priseBox").attr("src","img/prise2.png");
            break;
            case 3:
                $("#awardBox").show().nextAll().hide();
                $("#priseBox").attr("src","img/prise3.png");
            break;
        }
    }
})
