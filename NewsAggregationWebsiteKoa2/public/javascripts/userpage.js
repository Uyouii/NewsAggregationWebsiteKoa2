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
                setUserMessage();
                drawTable();
            }
        );
    }
    else {
        setUserButton(false);
    }
}

function setUserMessage() {
    document.getElementById("userName").innerText =  user['name'];
    document.getElementById("userEmail").innerText = email;
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

    email = getCookie('email');
    set_which_show();
    setUser();
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

function drawTable() {
//- PIE CHART -
//-------------
// Get context with jQuery - using jQuery's .get() method.
    let pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    let pieChart = new Chart(pieChartCanvas);
    let PieData = getBrowsingHistory();

    let pieChartCanvas2 = $("#pieChart2").get(0).getContext("2d");
    let pieChart2 = new Chart(pieChartCanvas2);
    let PieData2 = getLikesNews();

    let pieOptions = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,
        //String - The colour of each segment stroke
        segmentStrokeColor: "#fff",
        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts
        //Number - Amount of animation steps
        animationSteps: 100,
        //String - Animation easing effect
        animationEasing: "easeOutBounce",
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: true,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };

//Create pie or douhnut chart
// You can switch between pie and douhnut using the method below.
    pieChart.Doughnut(PieData, pieOptions);

    pieChart2.Doughnut(PieData2, pieOptions);
}

let colorArrary = [
    ["#EE2C2C","#f56954"],
    ["#00a65a","#00EE76"],
    ["#f39c12","#EEEE00"],
    ["#00c0ef","#00FFFF"],
    ["#3c8dbc","#00F5FF"],
    ["#d2d6de","#F8F8FF"],
    ["#E066FF","#FF00FF"],
    ["#B8860B","#FFA500"],
    ["#32CD32","#7CFC00"],
    ["#828282","#BEBEBE"],
];

function getBrowsingHistory() {
    let dataList = [];
    let total = 0;
    for (let key in user.scans) {
        if(key === " " || key === "undefined" || key === "即时" )
            continue;
        total += user.scans[key];
    }

    let i = 0;
    for (let key in user.scans) {
        if(key === " " || key === "undefined" || key === "即时" || user.scans[key] <= total / 25)
            continue;
        let obj = {
            value: user.scans[key],
            color: colorArrary[i][0],
            highlight: colorArrary[i][1],
            label: key

        };
        i++;
        if(i >= 10)
            i %= 10;
        dataList.push(obj);
    }
    return dataList;

}

function getLikesNews() {
    let dataList = [];
    let i = 0;
    for (let key in user.likes) {
        if(key === " " || key === "undefined" || key === "即时" )
            continue;
        let obj = {
            value: user.likes[key].length,
            color: colorArrary[i][0],
            highlight: colorArrary[i][1],
            label: key

        };
        i++;
        if(i >= 10)
            i %= 10;
        dataList.push(obj);
    }
    return dataList;
}




