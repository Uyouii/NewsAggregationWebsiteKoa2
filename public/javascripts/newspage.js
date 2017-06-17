/**
 * Created by 泰佑 on 2017/5/19.
 */

let news_id;
let atPC = true;
let email;
let user;
let newsType;

window.onload = function () {
    // const ul = document.getElementById("news-type-show");
    news_id = getCookie('news_id');
    newsType = getCookie('newsType');
    //alert(news_id);
    email = getCookie('email');
    setUser();
    set_which_show();
    getNewsContent();
    addScans();
};



$(document).ready(function(){
    $(window).resize(function() {
        set_which_show();
    });
});

function addScans() {
    if(email !== "") {
        $.post("/users/addScans", {
            email: email,
            news_id : news_id,
            newsType : newsType
        },
        function (data) {

        }
        );
    }
}

function setUser() {
    if(email !== "") {
        $.post("/users/getUser",
            {
                email : email
            },
            function (data) {
                user = data;
                document.cookie = "user= " + user['name'] + "; path=/";
                document.getElementById("showName").innerText = "_" + user['name'];
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
    }
    else {
        document.getElementById("news-dropdown").style.display='block';
        const li_list = document.getElementsByClassName("news-type");
        let i = 0;
        for( let i = 0; i < li_list.length; i++) {
            li_list[i].style.display = 'none';
        }
        atPC = false;
    }
}

function getNewsContent() {
    $.post("/getnewscontent",
        {
            news_id : news_id
        },
        function (data) {
            let likesNewsSet = new Set();
            if(user!== undefined && user.likes !== undefined && user.likes[newsType] !== undefined)
                likesNewsSet = new Set(user.likes[newsType]);

            const message = data[0];
            let show_area = document.getElementById("news-show");

            if(atPC) {
                document.getElementById("new-title2").style.display='none';
                document.getElementById("new-title1").style.display='block';
            }
            else {
                document.getElementById("new-title2").style.display='block';
                document.getElementById("new-title1").style.display='none';
            }

            document.getElementById("new-title1").innerText = data[0]['title'];
            document.getElementById("new-title2").innerText = data[0]['title'];
            document.getElementById("news-time").innerText = data[0]['datetime'];
            const contents = data[0]['content'];

            for (let i = 0; i < contents.length; i++) {
                if(contents[i][0] === 'p') {
                    let p = document.createElement('p');
                    p.style.whiteSpace = "pre-wrap";
                    p.innerText  = "       " + contents[i][1];

                    if(i > 0 && contents[i-1][0] === "img") {
                        p.setAttribute("class","text-center");
                    }

                    show_area.appendChild(p);
                }
                else if(contents[i][0] === 'strong') {
                    let p = document.createElement('p');
                    let strong = document.createElement('strong');
                    strong.style.whiteSpace = "pre-wrap";
                    strong.innerText =contents[i][1];

                    if(i > 0 && contents[i-1][0] === "img") {
                        strong.setAttribute("class","text-center");
                    }
                    p.appendChild(strong);
                    show_area.appendChild(p);
                }
                else if(contents[i][0] === "img") {
                    let div = document.createElement("div");
                    div.setAttribute("class","text-center");
                    let img = document.createElement("img");
                    img.setAttribute("src",contents[i][1]);
                    if(atPC) {
                        img.setAttribute("class","img-rounded img-PC");
                    }
                    else {
                        img.setAttribute("class","img-rounded img-mobile");
                    }
                    div.appendChild(img);
                    let br = document.createElement("br");
                    show_area.appendChild(div);
                    show_area.appendChild(br);
                }
            }
            let a = document.createElement('a');
            //a.setAttribute('class','pull-left');
            a.setAttribute('href',data[0]['href']);
            a.setAttribute('target','_blank');
            a.innerText = "原文链接";
            show_area.appendChild(a);

            let spanHeart = document.getElementById("likeHeart");
            let spanWord = document.getElementById("likeWord");

            let like = false;
            if(likesNewsSet.has(news_id)) {
                like = true;
            }
            if(like){
                spanHeart.setAttribute("style","font-size:25px; color:#EE2C2C");
                spanWord.innerText = "已喜欢";
                spanWord.setAttribute("style","font-size:22px; color:#EE2C2C")
            }
            else{
                spanHeart.setAttribute("style","font-size:25px; color:#00868B");
                spanWord.innerText = "喜欢";
                spanWord.setAttribute("style","font-size:22px; color:#00868B")
            }
            spanHeart.news_id = news_id;
            spanHeart.like = like;

            spanHeart.onclick = function () {
                let news_id = this.news_id;
                let span = this;
                if(email !== "") {
                    if(!span.like) {
                        $.post("/users/addLikes", {
                                email: email,
                                news_id : news_id,
                                newsType: newsType
                            },
                            function (data) {
                                span.setAttribute("style","font-size:25px; color:#EE2C2C");
                                document.getElementById("likeWord").innerText = "已喜欢";
                                document.getElementById("likeWord").setAttribute("style","font-size:22px; color:#EE2C2C");
                                span.like = !span.like;
                            }
                        );
                    }
                    else{
                        $.post("/users/deleteLikes", {
                                email: email,
                                news_id : news_id,
                                newsType: newsType
                            },
                            function (data) {
                                span.setAttribute("style","font-size:25px; color:#00868B");
                                document.getElementById("likeWord").innerText = "喜欢";
                                document.getElementById("likeWord").setAttribute("style","font-size:22px; color:#00868B");
                                span.like = !span.like;
                            }
                        );
                    }
                }
            };
        }
    );
}


function jumpTo(newsType) {
    document.cookie = "newsType= " + newsType + "; path=homepage.html";
    document.cookie = "newsType= " + newsType + "; path=newspage.html";
    window.location.href="/homepage";
}

function getCookie(cname)
{
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++)
    {
        let c = ca[i].trim();
        if (c.indexOf(name)=== 0) return c.substring(name.length,c.length);
    }
    return "";
}


function showLogoutModal() {
    $('#logoutModal').modal('show');
}

function logout() {
    document.cookie = "user=; path=/";
    document.cookie = "email=; path=/";
    setUser();
}