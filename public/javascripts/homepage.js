/**
 * Created by 泰佑 on 2017/5/17.
 */

// const news_type_list = ['大陆','国际','台湾','社会','军事','港澳','历史','财经','娱乐',
//                         '体育','时尚','科技','读书','游戏','文化','公益','旅游','健康'];

window.onload = function () {
    // const ul = document.getElementById("news-type-show");
    set_which_show();
};


$(document).ready(function(){
    $(window).resize(function() {
        set_which_show();
    });
});

//设置显示哪些news_type
function set_which_show() {
    const window_width = window.innerWidth;
    const WIDTH = 767;
    if(window_width > WIDTH) {
        document.getElementById("news-dropdown").style.display='none';
        const li_list = document.getElementsByClassName("news-type");
        for( let i = 0; i < li_list.length; i++) {
            li_list[i].style.display = 'block';
        }
    }
    else {
        document.getElementById("news-dropdown").style.display='block';
        const li_list = document.getElementsByClassName("news-type");
        let i = 0;
        for( let i = 0; i < li_list.length; i++) {
            li_list[i].style.display = 'none';
        }
    }
}