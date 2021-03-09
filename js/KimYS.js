
var test1 = function(li) {
  var sections = document.getElementsByTagName("section");

  //모든 세션 display:none
  for(var i=0; i<sections.length; i++){
    sections[i].style.display = "none";
  }

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
    content5.style.display = "block";
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
