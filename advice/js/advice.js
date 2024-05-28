async function logJSONData() {
  const response = await fetch("https://api.adviceslip.com/advice");
  const jsonData = await response.json();
  const advice = document.querySelector("#advice");
  console.log(jsonData.slip.advice);
  advice.insertAdjacentHTML("beforeend", `<h1>${jsonData.slip.advice}</h1>`);
}
logJSONData();
