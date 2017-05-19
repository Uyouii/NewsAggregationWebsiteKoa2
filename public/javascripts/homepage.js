/**
 * Created by 泰佑 on 2017/5/17.
 */

// const news_type_list = ['大陆','国际','台湾','社会','军事','港澳','历史','财经','娱乐',
//                         '体育','时尚','科技','读书','游戏','文化','公益','旅游','健康'];

let newsType;

window.onload = function () {
    // const ul = document.getElementById("news-type-show");

    newsType = getCookie('newsType');
    if(newsType == '')
        newsType = '即时';
    document.getElementById("newsTitle").innerText = " " + newsType + "新闻";
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
            type : newsType
        },
        function (data) {

            const maxLength = 120;
            const maxLine = 5;
            for(let i = 0; i < data.length; i++) {
                let div1 = document.createElement("div");
                div1.setAttribute("class","panel panel-default");
                let div2 = document.createElement("div");
                div2.setAttribute("class","panel-body");
                let h1 = document.createElement("h3");
                let a = document.createElement('a');
                a.innerText = data[i]['title'];
                a.setAttribute("href","/newspage");
                a.setAttribute("target","_blank");
                a.news_id = data[i]['_id'];
                a.onclick = function () {
                    document.cookie = "news_id= " + this.news_id + "; path=newspage.html";
                };
                h1.appendChild(a);
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
                let a2 = document.createElement("a");
                a2.setAttribute("href","/newspage");
                a2.setAttribute("target","_blank");
                a2.setAttribute("class","pull-right");
                let btn = document.createElement('button');
                btn.setAttribute("class","btn btn-default");
                btn.innerText = "详细";
                btn.news_id = data[i]['_id'];
                btn.onclick = function () {
                    document.cookie = "news_id= " + this.news_id + "; path=newspage.html";
                };
                a2.appendChild(btn);
                div2.appendChild(a2);
                div1.appendChild(div2);
                // let container = document.getElementById("news-container");
                document.getElementById("news-container").appendChild(div1);
            }
        }
    );
}

window.onunload = function () {
    //document.cookie = "newsType= 即时 ; path=homepage.html";
};

function getCookie(cname)
{
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++)
    {
        let c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

function jumpTo(newsType) {
    document.cookie = "newsType= " + newsType + "; path=homepage.html";
    window.location.href="/";
}

