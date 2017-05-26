/**
 * Created by 泰佑 on 2017/5/17.
 */

// const news_type_list = ['大陆','国际','台湾','社会','军事','港澳','历史','财经','娱乐',
//                         '体育','时尚','科技','读书','游戏','文化','公益','旅游','健康'];

let newsType;
let newsData;
let pageNum = 1;
let NUM = 15;
let lastActiveButton;
let buttonList = [];
let maximgnumber = 3;
let atPC = true;

window.onload = function () {
    // const ul = document.getElementById("news-type-show");

    newsType = getCookie('newsType');
    if(newsType == '')
        newsType = '即时';
    document.getElementById("newsTitle").innerText = " " + newsType + "新闻";
    set_which_show();
    setUser();
    getNewsList();
};

//根据页面大小动态设置显示哪些bar
$(document).ready(function(){
    $(window).resize(function() {
        set_which_show();
    });
});

function setUser() {
    email = getCookie('email');
    if(email != "") {
        $.post("/users/getUserName",
            {
                email : email
            },
            function (data) {
                user = data;
                document.cookie = "user= " + user + "; path=/";
                document.getElementById("showName").innerText = "_" + user;
                setUserButton(true);
            }
        );
    }
    else {
        setUserButton(false);
    }
}

function setUserButton(login) {
    //notLoginButton
    //alreadyLoginButton
    if(login) {
        document.getElementById("notLoginButton").style.display='none';
        document.getElementById("alreadyLoginButton").style.display='block';
    }
    else {
        document.getElementById("notLoginButton").style.display='block';
        document.getElementById("alreadyLoginButton").style.display='none';
    }
}

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
        maximgnumber = 3;
    }
    else {
        document.getElementById("news-dropdown").style.display='block';
        const li_list = document.getElementsByClassName("news-type");
        let i = 0;
        for( let i = 0; i < li_list.length; i++) {
            li_list[i].style.display = 'none';
        }
        maximgnumber = 1;
        atPC = false;
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
            newsData = data;
            showNewsList();
            createButton(Math.ceil(newsData.length / NUM));
        }
    );
}

//显示出当页新闻列表
function showNewsList() {
    const maxLength = 120;
    const maxLine = 5;
    for(let i = NUM * (pageNum - 1); i < newsData.length && i < NUM * pageNum; i++) {
        let imgdiv = document.createElement("div");
        imgdiv.setAttribute("class","container-fluid");

        let j = 0,imgnumber = 0;
        const content = newsData[i]['content'];

        while(j < content.length - 1 && imgnumber < maximgnumber) {
            if(content[j][0] != "img") {
                j++;
                continue;
            }
            let div = document.createElement("div");
            if(!atPC) {
                div.setAttribute("class","col-sm-12 text-center");
            }
            else {
                div.setAttribute("class","col-sm-4 text-center");
            }
            let img = document.createElement("img");
            img.setAttribute("src",content[j][1]);
            if(atPC) {
                img.setAttribute("class","img-tab img-rounded");
            }
            else {
                img.setAttribute("class","img-tab img-rounded");
            }
            div.appendChild(img);
            imgdiv.appendChild(div);
            j++;
            imgnumber++;
        }

        let div1 = document.createElement("div");
        div1.setAttribute("class","panel panel-default");
        let div2 = document.createElement("div");
        div2.setAttribute("class","panel-body");
        let h1 = document.createElement("h2");
        let a = document.createElement('a');
        a.innerText = newsData[i]['title'];
        a.setAttribute("href","/newspage");
        a.setAttribute("target","_blank");
        a.news_id = newsData[i]['_id'];
        a.onclick = function () {
            document.cookie = "news_id= " + this.news_id + "; path=newspage.html";
        };
        h1.appendChild(a);
        let length = 0;
        div2.appendChild(h1);
        div2.appendChild(imgdiv);
        let p = document.createElement("p");
        div2.appendChild(p);
        j = 0;
        while(j < content.length && j < maxLine && length < maxLength) {
            let text;
            if(content[j][0] == 'p') {
                text = document.createElement('p');
            }
            else if(content[j][0] == 'strong') {
                text = document.createElement('strong');
            }
            else if(content[j][0] == 'img') {
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
        btn.news_id = newsData[i]['_id'];
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
// <li>
// <a href="#" aria-label="Previous">
//     <span aria-hidden="true">&laquo;</span>
// </a>
// </li>
//      <li class="active"><a href="#">1</a></li>
//     <li><a href="#">2</a></li>
//     <li><a href="#">3</a></li>
//     <li><a href="#">4</a></li>
//     <li><a href="#">5</a></li>
//     <li>
//     <a href="#" aria-label="Next">
//     <span aria-hidden="true">&raquo;</span>
// </a>
// </li>
//加载页面的时候加载翻页按钮
function createButton(num) {
    let ul = document.getElementById("button-group");
    let li_p = document.createElement("li");
    let a_p = document.createElement("a");
    let span_p = document.createElement("span");
    span_p.innerHTML = "&laquo;";
    span_p.setAttribute("aria-hidden","true");
    a_p.setAttribute("aria-label","Previous");
    a_p.setAttribute("href","#top");
    a_p.appendChild(span_p);
    li_p.appendChild(a_p);

    li_p.onclick = function () {
        if(pageNum > 1) {
            lastActiveButton.setAttribute("class","");
            pageNum = pageNum - 1;
            buttonList[pageNum - 1].setAttribute("class","active");
            lastActiveButton = buttonList[pageNum - 1];

            document.getElementById("news-container").innerHTML = "";
            showNewsList();
        }
    };

    ul.appendChild(li_p);

    for(let i = 0; i < num; i++) {
        let a = document.createElement('a');
        a.innerText = (i + 1);
        a.setAttribute("href","#top");
        let li = document.createElement('li');
        li.appendChild(a);

        li.pageNum = i + 1;

        //设置按钮的回掉函数
        li.onclick = function () {
            pageNum = this.pageNum;
            this.setAttribute("class","active");
            lastActiveButton.setAttribute("class","");
            lastActiveButton = this;

            document.getElementById("news-container").innerHTML = "";
            showNewsList();
        };
        buttonList[buttonList.length] = li;
        ul.appendChild(li);

        if(i == 0) {
            li.setAttribute("class","active");
            //记录上一个激活的button
            lastActiveButton = li;
        }
    }

    let li_n = document.createElement("li");
    let a_n = document.createElement("a");
    let span_n = document.createElement("span");
    span_n.innerHTML = "&raquo;";
    span_n.setAttribute("aria-hidden","true");
    a_n.setAttribute("aria-label","Next");
    a_n.setAttribute("href","#top");
    a_n.appendChild(span_n);
    li_n.appendChild(a_n);

    li_n.onclick = function () {
        if(pageNum < buttonList.length) {
            lastActiveButton.setAttribute("class","");
            pageNum = pageNum + 1;
            buttonList[pageNum - 1].setAttribute("class","active");
            lastActiveButton = buttonList[pageNum - 1];

            document.getElementById("news-container").innerHTML = "";
            showNewsList();
        }
    };

    ul.appendChild(li_n);

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
    window.location.href="/homepage";
}

function showLogoutModal() {
    $('#logoutModal').modal('show');
}

function logout() {
    document.cookie = "user=; path=/";
    document.cookie = "email=; path=/";
    setUser();
}

