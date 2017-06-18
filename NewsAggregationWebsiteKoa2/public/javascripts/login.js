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
                document.getElementById("showName").innerText = user;
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
let user;

window.onload = function () {
    setLocation();
    set_which_show();
    setUser();
};

$(document).ready(function(){
    $(window).resize(function() {
        setLocation();
        set_which_show();
        //setUserButton(false);
    });
});

function jumpToHome() {
    window.location.href="/homepage";
}

function jumpTo(newsType) {
    document.cookie = "newsType= " + newsType + "; path=homepage.html";
    window.location.href="/homepage";
}

function checkInput() {
    resetInputGroupColor();
    let email = $.trim(document.getElementById("email").value);
    let password = $.trim(document.getElementById("password").value);
    //验证邮箱格式的正则表达式
    let emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    let isOk = true;


    if(email == "") {
        document.getElementById("input-email-group").setAttribute("class","form-group has-error");
        document.getElementById("email-tip").innerText = "邮箱不能为空";
        isOk = false;
    }
    else if(!emailReg.test(email)) {
        document.getElementById("input-email-group").setAttribute("class","form-group has-error");
        document.getElementById("email-tip").innerText = "邮箱格式错误";
        isOk = false;
    }
    else document.getElementById("input-email-group").setAttribute("class","form-group has-success");

    if(password == "") {
        document.getElementById("input-password-group").setAttribute("class","form-group has-error");
        document.getElementById("password-tip").innerText = "密码不能为空";
        isOk = false;
    }
    else {
        document.getElementById("input-password-group").setAttribute("class","form-group has-success");
    }

    if(isOk == true) {
        $.post("/users/checkUser",
            {
                email : email,
                password : password
            },
            function (data) {
                if(data) {
                    $('#myModal').modal('show');
                    document.cookie = "email= " + email + "; path=/";
                    $.post("/users/getUserName",
                        {
                            email : email
                        },
                        function (data) {
                            user = data;
                            document.cookie = "user= " + user + "; path=/";
                            document.getElementById("showName").innerText = user;
                            jumpToHome();
                        }
                    );
                }
                else {
                    $('#myModal2').modal('show');
                }
                // $('#myModal').modal('show');
                resetInputGroupColor();
                clearInput();
            }
        );
    }
}

//清空输入
function clearInput() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

//重置输入框的颜色
function resetInputGroupColor() {
    document.getElementById("input-email-group").setAttribute("class","form-group");
    document.getElementById("email-tip").innerText = "";

    document.getElementById("input-password-group").setAttribute("class","form-group");
    document.getElementById("password-tip").innerText = "";

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


