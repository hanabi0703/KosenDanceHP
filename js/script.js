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
  $(".fadein_bf").each(function() {
　　//各ボックスのトップの位置
		var elem_pos = $(this).offset().top;
		
		//どのタイミングでフェードインさせるか
		if (scroll_top >= elem_pos - window_h/2) {
			$(this).addClass("fadein_af");
		} else {
			// $(this).removeClass("fadein_in");
		}
  });
})


/* ロード後のふわっと表示用 */
$(window).on("load", function() {
	$(".slidein_out").each(function() {
		$(this).addClass("slidein_in");
	})
});

/* ドロップダウンメニュー用 */
$('select').change(function () {
  var val = $('select option:selected').val();
  if (val == 'select') return;
  $('ul.main_movie_ul').removeClass("display_on");
  $('ul#' + val ).addClass("display_on");
});


/* youtube表示用 */
$(function (){
	var srcs = [];
	var images = [];
	var heights = [];
	var widths = [];
	var thumbs = [];
	
	// 全てのiframeタグに対して処理を実行
	$('iframe.fastyt').each(function(index, element) {
		// 属性を配列に格納
		srcs[index] = $(this).attr('data-src');
		heights[index] = $(this).attr('height');
		widths[index] = $(this).attr('width');
		thumbs[index] = $(this).attr('data-thumbnail');
		maxWidth = getAncestorWidth($(this));
	
		// 取りうる最大幅を超えている場合はそこまでにする．
		if (maxWidth < widths[index]) {
			heights[index] = Math.floor(heights[index] * maxWidth / widths[index]);
			widths[index] = Math.floor(maxWidth);
		}
		
		// URL から動画 id のみを取得して文字連結をしてサムネイルを取得
		var id = srcs[index].match(/[\/?=]([a-zA-Z0-9_-]{11})[&\?]?/)[1];
		if (thumbs[index]) {
			images[index] = thumbs[index];
		} else {
			images[index] = 'http://i.ytimg.com/vi/' + id + '/mqdefault.jpg';
		}
	
		// iframeをサムネイル画像に置換
		$(this).after('<div class="yt"><div class="yt_play"><img loading="lazy" src="' + images[index] + '" class="movie" width="' + widths[index] + '" height="' + heights[index] + '"></div></div>').remove();
		// $('.yt').eq([index]).css("width", widths[index]);
		// $('.yt').eq([index]).css("height", heights[index]);
	});
	
	// $('.yt_play').each(function(index, element) {
	// 	// サムネイルがクリックされた時の処理
	// 	$(this).click(function (){
	// 		// iframeに置換
	// 		var autoplay;
	// 		if (0 < srcs[index].indexOf("?")) {
	// 			autoplay = '&';
	// 		} else {
	// 			autoplay = '?';
	// 		}
	// 		autoplay += "autoplay=1";
	
	// 		$(this).replaceWith('<iframe class="yt_iframe" src="' + srcs[index] + autoplay + '" allow="autoplay" frameborder="0" width="' + widths[index] + '" height="' + heights[index] + '" allowfullscreen></iframe>');
	// 	});
	// });
});
	
function getAncestorWidth(element) {
	if (element.parent() === undefined) {
		return element.outerWidth(true);
	}
	width = element.parent().outerWidth(true);
	if (width == 0) {
		width = getAncestorWidth(element.parent());
	} else {
		width = element.parent().outerWidth(true);
	}
	return width;
}

/* youtube再生用2 */

(function () {
  if ($(".js-modal-video").length) { //クラス名js-modal-videoがあれば以下を実行
    $(".js-modal-video").modalVideo({
      channel: "youtube",
      youtube: {
        rel: 0, //関連動画の指定
        autoplay: 0, //自動再生の指定
        controls: 0, //コントロールさせるかどうかの指定
      },
    });
  }
})();

// $(".js-modal-btn").modalVideo();
