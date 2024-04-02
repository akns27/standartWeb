let id = document.querySelector("#id");
let pwd = document.querySelector("#pwd");
let checkPwd = document.querySelector("#checkPwd");
let checkPwdBtn = document.querySelector("#checkPwdBtn");
let genderArray = document.getElementsByName("gender");

let reset = document.querySelector("#reset");

function pwdCheck(){
  if (pwd.value===checkPwd.value){
    alert("비밀번호가 일치합니다.");
  }else{
    alert("비밀번호가 일치하지 않습니다. 다시 입력하세요.")
  }
}

checkPwdBtn.onclick=pwdCheck;

function mouseOver(){
  checkPwdBtn.style.color = "red";
}
function mouseOut(){
  checkPwdBtn.style.color = "black";
}

checkPwdBtn.onmouseover=mouseOver;
checkPwdBtn.onmouseout=mouseOut;


function noNumbers(e){
  if (e.keyCode >= 48 && e.keyCode <= 57){
    alert("아이디에는 숫자를 입력할 수 없습니다!");
  }
}
id.addEventListener("keydown",noNumbers);

function check(){
  if(!id.value){
    alert("아이디를 입력하세요!");
    id.focus();
    return;
  }
  if(!pwd.value){
    alert("비밀번호를 입력하세요!");
    pwd.focus();
    return;
  }
  if(!checkPwd.value){
    alert("비밀번호 재확인을 입력하세요!");
    pwdCheck.focus();
    return;
  }
  if(genderArray[0].checked == false && genderArray[1].checked == false){
    alert("성별을 선택해주세요!");
    // 라디오 버튼에는 focus개념이 없음
    return;
  }
  alert("모두 작성하였으므로 제출합니다.");
  document.querySelector("#loginFrm").submit();
}
reset.addEventListener("onClick", reset());




