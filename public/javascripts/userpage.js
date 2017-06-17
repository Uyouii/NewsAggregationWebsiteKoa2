/**
 * Created by 泰佑 on 2017/5/24.
 */

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

function setUser() {
    email = getCookie('email');
    if(email !== "") {
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

let email;
let uesr;

window.onload = function () {
    set_which_show();
    setUser();
    document.getElementById("email").value = email;
};

$(document).ready(function(){
    $(window).resize(function() {
        set_which_show();
    });
});

function jumpTo(newsType) {
    document.cookie = "newsType= " + newsType + "; path=homepage.html";
    window.location.href="/homepage";
}


function jumpToHome() {
    window.location.href="/homepage";
}

function showLogoutModal() {
    $('#logoutModal').modal('show');
}

function logout() {
    document.cookie = "user=; path=/";
    document.cookie = "email=; path=/";
    setUser();
    jumpToHome();
}

function getCookie(cname)
{
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++)
    {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
}
