/*----- ローディング画面設定　-----*/

var bg = $('#loader_bg'),
    loader = $('#loader');
/* ローディング画面の非表示を解除 */
bg.removeClass('is-hide');
loader.removeClass('is-hide');

/* 読み込み完了 */
$(window).on('load', stopload);

/* 10秒経ったら強制的にローディング画面を非表示にする */
setTimeout('stopload()',10000);

/* ローディング画面を非表示にする処理 */
function stopload(){
    bg.delay(900).fadeOut(800);
    loader.delay(900).fadeOut(300);
}

/*----- スクロールイン設定　-----*/

//ウィンドウの高さを取得
var window_h = $(window).height();
 
//スクロールイベント
$(window).on("scroll", function() {
  //スクロール量を取得
  var scroll_top = $(window).scrollTop();
　
 //eachにより各ボックスの処理
  $(".fadein_out").each(function() {
　　//各ボックスのトップの位置
		var elem_pos = $(this).offset().top;
		
		//どのタイミングでフェードインさせるか
		if (scroll_top >= elem_pos - window_h+500) {
			$(this).addClass("fadein_in");
		} else {
			// $(this).removeClass("fadein_in");
		}
  });
})

$(window).on("load", function() {
	$(".slidein_out").each(function() {
		$(this).addClass("slidein_in");
	})
});