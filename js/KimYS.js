var id = null;
var autoId = null;
var autoPwd = null;

var li1 = function(li) {
  //모든 세션 display:none
// Jquery배운뒤로 JQuery로 처리

  // var sections = document.getElementsByTagName("section");

  // for(var i=0; i<sections.length; i++){
  //   sections[i].style.display = "none";
  // }
  $('section').css('display','none');

  //Header부분 클릭한 값에 따라 세션 창 보여줌
  if(li.innerHTML == "Main"){
    content1.style.display = "block";
  }
  else if(li.innerHTML == "Introduction"){
    content2.style.display = "block";
  }
  else if(li.innerHTML == "Interests"){
    content3.style.display = "block";
  }else if(li.innerHTML == "Roadmap"){
    content4.style.display = "block";
  }else{
    content5.style.display = 'block';
  }
};

//Sign out, Sign in, close클릭했을때
var li2 = function(){ 
  //Sign in 클릭시
  //1. Sign in 창 보여준다
  //2. remember체크 했었다면 자동으로 아이디 비밀번호 입력되어있음.
  if(li6.innerText == 'Sign in'){
    $('.inputArea').val('');
    content6.style.display = 'block';
    li6.innerText = 'Close';
    if(autoId!=null && autoPwd!=null){
      $('#userId').val(autoId);
      $('#pwd').val(autoPwd);
    }

  //close클릭시 창닫힘
  }else if(li6.innerText == 'Close'){
    $('.inputArea').val('');
    content6.style.display = 'none'
    li6.innerText = 'Sign in';
  //Sign out클릭시 로그아웃 이루어짐
  }else if(li6.innerText == 'Sign Out'){
    if(confirm(id+'님 정말 로그아웃 하시겠습니까?')==true){
      id=null;
      li6.innerText = 'Sign in';
    }
  }
}

// Intro부분 클릭에 따라 실행됨
//1 버튼 클릭시 첫번째 div만 보여줌(애니메이션 없음)
var click_1 = function(){
  introDiv_descript1.style.display='block'
  introDiv_descript2.style.display='none'
  introDiv_descript1.style['animation-name'] = 'none';
  introDiv_descript2.style['animation-name'] = 'move';
}
//2 버튼 클릭시 두번째 div만 보여줌(애니메이션 없음)
var click_2 = function(){
  introDiv_descript1.style.display='none'
  introDiv_descript2.style.display='block'
  introDiv_descript1.style['animation-name'] = 'move';
  introDiv_descript2.style['animation-name'] = 'none';
}
// re버튼 클릭시 창을 다시 띄워줘서 모든 효과가 다시 나오게함
var click_re = function(){
  introDiv_descript1.style.display='block'
  introDiv_descript2.style.display='block'
  introDiv_descript1.style['animation-name'] = 'descript1';
  introDiv_descript2.style['animation-name'] = 'descript2';
  var str = content2.innerHTML;
  content2.innerHTML = str;
}

//로그인, 회원가입 창 전환
function changeForm1(){
  form1.style.transform = 'translateX(-84vw)';
  form2.style.transform = 'translateX(-16vw)';
}
function changeForm2(){
  form1.style.transform = 'translateX(16vw)';
  form2.style.transform = 'translateX(116vw)';
}

//로그인 기능구현
function login(){
  // ID : #userId
  // pwd : #pwd
  // btn : #btn_login
  console.log($('#userId').val());
  console.log($('#pwd').val());
  if(localStorage.getItem($('#userId').val())==$('#pwd').val()){
    alert('로그인성공');
    id = $('#userId').val();
  }else{
    alert('아이디와 비밀번호를 다시 확인해주세요')
    return;
  }

  if(remember.checked == false){
    autoId = null;
    autoPwd=null;
  }else{
    autoId=$('#userId').val();
    autoPwd=$('#pwd').val();
  }


  content6.style.display = 'none';
  li6.innerText='Sign Out';

}

//회원가입 기능구현
function signup(){
  // id : #upID  영문/숫자 혼합4~8글자
  // pwd : #upPwd 최소4~12글자
  // check : #chk_pwd
  // btn : #btn_signup

  if(localStorage.getItem($('#upID').val())!=null){
    alert('이미 사용중인 아이디 입니다.');
    return;
  }

  if(/^[a-zA-Z0-9]{6,}$/.test($('#upID').val())==false){
    alert('아이디는 영문자/숫자 6글자이상 이여야합니다.');
    return;
  }

  if(/^.{4,12}$/.test($('#upPwd').val())==false){
    alert('비밀번호는 최소 4~ 최대12글자 입니다.');
    return;
  }
  if($('#upPwd').val() != $('#chk_pwd').val()){
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  localStorage.setItem($('#upID').val(), $('#upPwd').val());
  $('.inputArea').val('');
  alert('회원가입이 완료 되었습니다.')
  changeForm2();
}