/**
 * Created by 泰佑 on 2017/5/20.
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


window.onload = function () {
    setLocation();
    set_which_show();
    setUserButton(false);
};

$(document).ready(function(){
    $(window).resize(function() {
        setLocation();
        set_which_show();
        //setUserButton(false);
    });
});

function jumpTo(newsType) {
    document.cookie = "newsType= " + newsType + "; path=homepage.html";
    window.location.href="/homepage";
}

/*
* 接下来是有关注册的处理操作
* */

function checkInput() {
    resetInputGroupColor();
    //先去掉字符串两端的空格
    let username = $.trim(document.getElementById("username").value);
    let email = $.trim(document.getElementById("email").value);
    let password1 = $.trim(document.getElementById("password1").value);
    let password2 = $.trim(document.getElementById("password2").value);
    //验证邮箱格式的正则表达式
    let emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    let isOk = true;

    if(username == "") {
        document.getElementById("input-name-group").setAttribute("class","form-group has-error");
        document.getElementById("username-tip").innerText = "用户名不能为空";
        isOk = false;
    }
    else document.getElementById("input-name-group").setAttribute("class","form-group has-success");

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
        $.post("/users/addUser",
            {
                username:username,
                email : email,
                password : password1
            },
            function (data) {
                if(data) {
                    $('#myModal').modal('show');
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

function jumpToHome() {
    window.location.href="/homepage";
}

//清空输入
function clearInput() {
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password1").value = "";
    document.getElementById("password2").value = "";
}

//重置输入框的颜色
function resetInputGroupColor() {
    document.getElementById("input-name-group").setAttribute("class","form-group");
    document.getElementById("username-tip").innerText = "";

    document.getElementById("input-email-group").setAttribute("class","form-group");
    document.getElementById("email-tip").innerText = "";

    document.getElementById("input-password1-group").setAttribute("class","form-group");
    document.getElementById("password1-tip").innerText = "";

    document.getElementById("input-password2-group").setAttribute("class","form-group");
    document.getElementById("password2-tip").innerText = "";

}



