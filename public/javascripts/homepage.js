/**
 * Created by 泰佑 on 2017/5/17.
 */

// const news_type_list = ['大陆','国际','台湾','社会','军事','港澳','历史','财经','娱乐',
//                         '体育','时尚','科技','读书','游戏','文化','公益','旅游','健康'];

window.onload = function () {
    // const ul = document.getElementById("news-type-show");
    set_which_show();
    getNewsList();
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


// <div class="panel panel-default">
//     <div class="panel-body">
//     Panel content
// Panel content
// Panel content
// Panel content
// Panel content
// </div>
// </div>
//将数据库获取的data显示出来
function getNewsList() {
    $.post("/news",
        {
            type : "即时"
        },
        function (data) {

            const maxLength = 150;
            const maxLine = 6;
            for(let i = 0; i < data.length; i++) {
                let div1 = document.createElement("div");
                div1.setAttribute("class","panel panel-default");
                let div2 = document.createElement("div");
                div2.setAttribute("class","panel-body");
                let h1 = document.createElement("h2");
                h1.innerText = data[i]['title'];
                let length = 0;
                div2.appendChild(h1);
                let j = 0;
                const content = data[i]['content'];
                while(j < content.length && j < maxLine && length < maxLength) {
                    let text;
                    if(content[j][0] == 'p') {
                        text = document.createElement('p');
                    }
                    else if(content[j][0] == 'strong') {
                        text = document.createElement('strong');
                    }
                    else {
                        text = document.createElement('p');
                        text.innerText = "图片";
                        div2.appendChild(text);
                        j++;
                        continue;
                    }

                    if(length + content[j][1].length > maxLength) {
                        text.innerText = content[j][1].substr(0,maxLength - length) + "·····";
                        length = maxLength;
                    }
                    else {
                        text.innerText = content[j][1];
                        length += content[j][1].length;
                        if(j >= maxLine) {
                            text.innerText = text.innerText + '·····';
                        }

                    }
                    div2.appendChild(text);
                    j++;
                }
                div1.appendChild(div2);
                document.getElementById("news-container").appendChild(div1);
            }
        }
    );
}

