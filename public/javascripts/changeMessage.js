/**
 * Created by 泰佑 on 2017/5/23.
 */

//设置显示的位置
function setLocation() {
    const window_width = window.innerWidth;
    const WIDTH = 767;
    if(window_width > WIDTH) {
        let l = document.getElementById("workspace");
        let height = window.innerHeight;
        let lHeight = l.clientHeight;
        let style = "padding-top: " + Math.floor((height - lHeight) / 2 - 150) + "px;";
        l.setAttribute("style", style);
    }
    else {
        //在手机上，不需要将div放置在屏幕中间
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
    }
}

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

let email;
let uesr;

window.onload = function () {
    setLocation();
    set_which_show();
    setUser();
    document.getElementById("email").value = email;
};

$(document).ready(function(){
    $(window).resize(function() {
        setLocation();
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
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

function checkInput() {
    resetInputGroupColor();
    //先去掉字符串两端的空格
    let username = $.trim(document.getElementById("username").value);
    let password1 = $.trim(document.getElementById("password1").value);
    let password2 = $.trim(document.getElementById("password2").value);

    let isOk = true;

    if(username == "") {
        document.getElementById("input-name-group").setAttribute("class","form-group has-error");
        document.getElementById("username-tip").innerText = "用户名不能为空";
        isOk = false;
    }
    else document.getElementById("input-name-group").setAttribute("class","form-group has-success");


    if(password1 == "") {
        document.getElementById("input-password1-group").setAttribute("class","form-group has-error");
        document.getElementById("password1-tip").innerText = "密码不能为空";
        isOk = false;
    }
    else if(password2 == "") {
        document.getElementById("input-password2-group").setAttribute("class","form-group has-error");
        document.getElementById("password2-tip").innerText = "密码不能为空";
        isOk = false;
    }
    else if(password1 != password2) {
        document.getElementById("input-password1-group").setAttribute("class","form-group has-error");
        document.getElementById("input-password2-group").setAttribute("class","form-group has-error");
        document.getElementById("password1-tip").innerText = "两次密码不相同";
        isOk = false;
    }
    else {
        document.getElementById("input-password1-group").setAttribute("class","form-group has-success");
        document.getElementById("input-password2-group").setAttribute("class","form-group has-success");
    }

    if(isOk == true) {
        $.post("/users/changeUserMessage",
            {
                username:username,
                email : email,
                password : password1
            },
            function (data) {
                $('#myModal').modal('show');
                // $('#myModal').modal('show');
                resetInputGroupColor();
                clearInput();
            }
        );
    }
}


//清空输入
function clearInput() {
    document.getElementById("username").value = "";
    document.getElementById("password1").value = "";
    document.getElementById("password2").value = "";
}

//重置输入框的颜色
function resetInputGroupColor() {
    document.getElementById("input-name-group").setAttribute("class","form-group");
    document.getElementById("username-tip").innerText = "";

    document.getElementById("input-password1-group").setAttribute("class","form-group");
    document.getElementById("password1-tip").innerText = "";

    document.getElementById("input-password2-group").setAttribute("class","form-group");
    document.getElementById("password2-tip").innerText = "";

}







