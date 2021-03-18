var id = null;

function Member(userId, userPwd) {
  this.userId = userId;
  this.userPwd = userPwd;
}

var li1 = function (li) {
  //모든 세션 display:none
  // Jquery배운뒤로 JQuery로 처리
  $("section").css("display", "none");

  //Header부분 클릭한 값에 따라 세션 창 보여줌
  if (li.innerHTML == "Main") {
    content1.style.display = "block";
  } else if (li.innerHTML == "Introduction") {
    content2.style.display = "block";
  } else if (li.innerHTML == "Interests") {
    content3.style.display = "flex";
    inter();
  } else if (li.innerHTML == "Roadmap") {
    content4.style.display = "block";
    $("#year").val(1);
    ran();
  } else {
    content5.style.display = "block";
  }
};

//Sign out, Sign in, close클릭했을때
var li2 = function () {
  //Sign in 클릭시
  //1. Sign in 창 보여준다
  //2. remember체크 했었다면 자동으로 아이디 비밀번호 입력되어있음.
  if (li6.innerText == "Sign in") {
    $(".inputArea").val("");
    content6.style.display = "block";
    li6.innerText = "Close";

    // 아이비 비밀번호 기억했다면 자동 채워주기부분
    if (localStorage.getItem("auto") != null) {
      var auto = JSON.parse(localStorage.getItem("auto"));
      $("#userId").val(auto[0].userId);
      $("#pwd").val(auto[0].userPwd);
      remember.checked = true;
    }

    //close클릭시 창닫힘
  } else if (li6.innerText == "Close") {
    $(".inputArea").val("");
    content6.style.display = "none";
    li6.innerText = "Sign in";
    //Sign out클릭시 로그아웃 이루어짐
  } else if (li6.innerText == "Sign Out") {
    if (confirm(id + "님 정말 로그아웃 하시겠습니까?") == true) {
      id = null;
      li6.innerText = "Sign in";
      li7.style.display = "none";
    }
  }
};

//member클릭시 새창을 만들고 Table태그를 만들어 그안에 회원리스트 담아줌
var li3 = function () {
  var left = screen.availWidth / 2 - 150;
  var top = screen.availHeight / 2 - 150;
  var w = open(
    "",
    "newWindow",
    "width = 300, height=300, top=" + top + ", left=" + left
  );
  var $new = $(w.document);
  $new.find("head").append("<title>멤버 리스트 보기</title>");
  $new
    .find("head")
    .append(
      "<style>" +
        "html {display: flex;justify-content: center;align-items: center; background: black; color:white} " +
        "#member_list { border: 1px solid white;border-collapse: collapse;margin: 10px 0; text-align: center;}" +
        " #member_list th, #member_list td {border: 1px solid white;padding: 5px;}" +
        "h1 { color:white; }" +
        "</style>"
    );
  $new.find("body").append("<h1>Member List</h1>");
  $new.find("body").append('<table id="member_list"></table>');

  // localStorage.entries || []
  var members = JSON.parse(localStorage.getItem("members")) || [];

  var $table = $new.find("#member_list");

  //header추가
  $table.html("<tr><th>No</th><th>USER-ID</th><th>PassWord</th></tr>");

  if (members.length) {
    //저장된 entry가 있는 경우
    $.each(members, function (i, member) {
      var $tr = $("<tr>");
      $tr
        .append("<td>" + (i + 1) + "</td>")
        .append("<td>" + member.userId + "</td>")
        .append("<td>" + member.userPwd + "</td>")
        .appendTo($table);
    });
  } else {
    //저장된 entry가 없는 경우
    $table.append("<tr><td colspan='3'>조회된 회원이 없습니다.</td></tr>");
  }
};

// Intro부분 클릭에 따라 실행됨
//1 버튼 클릭시 첫번째 div만 보여줌(애니메이션 없음)
var click_1 = function () {
  introDiv_descript1.style.display = "block";
  introDiv_descript2.style.display = "none";
  introDiv_descript1.style["animation-name"] = "none";
  introDiv_descript2.style["animation-name"] = "move";
};
//2 버튼 클릭시 두번째 div만 보여줌(애니메이션 없음)
var click_2 = function () {
  introDiv_descript1.style.display = "none";
  introDiv_descript2.style.display = "block";
  introDiv_descript1.style["animation-name"] = "move";
  introDiv_descript2.style["animation-name"] = "none";
};
// re버튼 클릭시 창을 다시 띄워줘서 모든 효과가 다시 나오게함
var click_re = function () {
  introDiv_descript1.style.display = "block";
  introDiv_descript2.style.display = "block";
  introDiv_descript1.style["animation-name"] = "descript1";
  introDiv_descript2.style["animation-name"] = "descript2";
  var str = content2.innerHTML;
  content2.innerHTML = str;
};

//로그인, 회원가입 창 전환
function changeForm1() {
  form1.style.transform = "translateX(-84vw)";
  form2.style.transform = "translateX(-16vw)";
}
function changeForm2() {
  form1.style.transform = "translateX(16vw)";
  form2.style.transform = "translateX(116vw)";
}

//로그인 기능구현
function login() {
  // ID : #userId
  // pwd : #pwd
  // btn : #btn_login

  var members = JSON.parse(localStorage.getItem("members")) || [];
  var pwd;
  for (var i in members) {
    if (members[i].userId == $("#userId").val()) {
      pwd = members[i].userPwd;
      break;
    }
  }

  if (pwd != null) {
    alert("로그인성공");
    id = $("#userId").val();
  } else {
    alert("아이디와 비밀번호를 다시 확인해주세요");
    return;
  }

  if (remember.checked == false) {
    localStorage.removeItem("auto");
  } else {
    //Member 배열
    var auto = [];
    auto.push(new Member($("#userId").val(), $("#pwd").val()));

    //JSON문자열로 변환
    var jsonAuto = JSON.stringify(auto);

    //localStorage에 저장
    localStorage.setItem("auto", jsonAuto);
  }

  content6.style.display = "none";
  li7.style.display = "inline-block";
  li6.innerText = "Sign Out";
}

//회원가입 기능구현
function signup() {
  // id : #upID  영문/숫자 혼합4~8글자
  // pwd : #upPwd 최소4~12글자
  // check : #chk_pwd
  // btn : #btn_signup

  if (localStorage.getItem($("#upID").val()) != null) {
    alert("이미 사용중인 아이디 입니다.");
    return;
  }

  if (/^[a-zA-Z0-9]{6,}$/.test($("#upID").val()) == false) {
    alert("아이디는 영문자/숫자 6글자이상 이여야합니다.");
    return;
  }

  if (/^.{4,12}$/.test($("#upPwd").val()) == false) {
    alert("비밀번호는 최소 4~ 최대12글자 입니다.");
    return;
  }
  if ($("#upPwd").val() != $("#chk_pwd").val()) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  //Member 배열
  var members = JSON.parse(localStorage.getItem("members")) || [];
  members.push(new Member($("#upID").val(), $("#upPwd").val()));

  //JSON문자열로 변환
  var jsonMembers = JSON.stringify(members);

  //localStorage에 저장
  localStorage.setItem("members", jsonMembers);
  $(".inputArea").val("");
  alert("회원가입이 완료 되었습니다.");
  changeForm2();
}

// Roadmap
//range1~4에 따른 화면전환
var ran = function () {
  switch ($("#year").val()) {
    case "1":
      label_year.innerHTML = "This Year<br>Developer Start";
      $(".content4_bottom").css("display", "none");
      $(".content4_bottom:eq(0)").css("display", "block");
      break;
    case "2":
      label_year.innerHTML = "5years later<br>Junior Developer";
      $(".content4_bottom").css("display", "none");
      $(".content4_bottom:eq(1)").css("display", "block");
      break;
    case "3":
      label_year.innerHTML = "10years later<br>Senior Developer";
      $(".content4_bottom").css("display", "none");
      $(".content4_bottom:eq(2)").css("display", "block");
      break;
    case "4":
      label_year.innerHTML = "15years later<br>Project Manager";
      $(".content4_bottom").css("display", "none");
      $(".content4_bottom:eq(3)").css("display", "block");
      break;
    case "5":
      label_year.innerHTML = "20years later<br>Financial Independence";
      $(".content4_bottom").css("display", "none");
      $(".content4_bottom:eq(4)").css("display", "block");
      break;
  }
};

//1. A태그 호버시 작동함
//2. 호버시 img태그 src수정
//3. 탈출시 img태그 원래대로 수정
function inter() {
  $(".hover").hover(
    function () {
      var str = $(this).prev().prev().html();
      if (str == "Shoes") {
        chgImg(
          "../images/shoes1.png",
          "../images/shoes2.png",
          "../images/shoes3.png",
          "../images/shoes4.png"
        );
      } else if (str == "Music") {
        chgImg(
          "../images/music2.png",
          "../images/music1.jpg",
          "../images/music3.png",
          "../images/music4.png"
        );
      } else if (str == "Game") {
        chgImg(
          "../images/game1.png",
          "../images/game2.png",
          "../images/game3.png",
          "../images/game4.png"
        );
      } else if (str == "Food") {
        chgImg(
          "../images/food1.png",
          "../images/food2.png",
          "../images/food3.png",
          "../images/food4.png"
        );
      }
    },
    function () {
      // img1.jpg, img2.jpg, img3.jpg, img4.jpg
      chgImg(
        "../images/shoes1.png",
        "../images/music1.jpg",
        "../images/game3.png",
        "../images/food4.png"
      );
    }
  );
}
//이미지 변경해주는 함수(반복구조 최소화)
function chgImg(a, b, c, d) {
  $("#content3")
    .find("img")
    .each(function (index) {
      if (index == 0) $(this).attr("src", a);
      else if (index == 1) $(this).attr("src", b);
      else if (index == 2) $(this).attr("src", c);
      else if (index == 3) $(this).attr("src", d);
    });
}
