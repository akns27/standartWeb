
document.addEventListener("DOMContentLoaded", (e) => {
  const div1 = document.getElementById("div1");
  const input1 = div1.querySelector("input");
  const Btn1 = div1.querySelector("button");

  function inputFunction(e){
    console.log(e.target);//지금 타겟만 보려고
    console.log(input1.value);//텍스트에 있는게 뭔지 보여주려고
  }
  Btn1.addEventListener("click", inputFunction);
  input1.addEventListener("keydown", (e)=>(console.log(e.keyCode)));

});