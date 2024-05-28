const key = 'pYzqKPUTp6M7yDoS813%2BXU5ckTuMvKWKZsui9PSsmb7X49iophW18UtvCObQAo7tPt5EvdJZH6k%2FTgNSpWmWHA%3D%3D';

const cityInfo = document.querySelector('#cityinfo');
const areaBtn = document.querySelector('#areaBtn');
const typeBtn = document.querySelector('#typeBtn');
const cityCode = document.querySelector('#citycode');
const tourCode = document.querySelector('#tourcode');
const areaCode = document.querySelector('#areacode');
const category1 = document.querySelector('#category1');
const category2 = document.querySelector('#category2');
const category3 = document.querySelector('#category3');

const container = document.querySelector('.container');
let detailDiv = document.createElement('Div');

let searchData={
  city: '0',
  area: '0',
  tour: '0',
  c1:'0',
  c2:'0',
  c3:'0',
}

const tourType=[{
 code:'12', name:'관광지'}, { code:'14', name:'문화시설'}, { code:'15', name:'행사/공연/축제'},
  {code:'25', name:'여행코스'}, {code:'28', name:'레포츠'}, {code:'32', name:'숙박'},
  {code:'38', name:'쇼핑'}, {code:'39', name:'음식점'} ];

async function jsonData(url, objField) {
 const result = await fetch(url);
 const jsonData = await result.json();

 if(  jsonData['response']['body']['totalCount'] > 0){

   let data = jsonData['response']['body']['items']['item'];
   objField.options.length=1;
   data.forEach((d)=>{
     let option = document.createElement("option");
     option.value =d.code;
     option.text = d.name;
     objField.appendChild(option);
   } );
 }
}

document.addEventListener("DOMContentLoaded",  ()=>{
 let url = 'http://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey='+key+'&numOfRows=17&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json';
 jsonData(url, cityCode);

 tourType.forEach( (d) =>{
   let option = document.createElement("option");
   option.value =d.code;
   option.text = d.name;
   tourCode.appendChild(option);
 });

 //url = 'http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey='+key+'&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json';
 //jsonData(url, tourCode);
} );
 cityCode.addEventListener("change", ()=>{
 searchData.city  = cityCode.options[cityCode.selectedIndex].value;
 let url = 'http://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey='+key+'&areaCode='+searchData.city +'&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json';
 jsonData(url, areaCode);
} );

tourCode.addEventListener("change", ()=>{
 searchData.tour = tourCode.options[tourCode.selectedIndex].value;
 let url = 'http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey='+key+'&contentTypeId='+searchData.tour+'&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&&_type=json';
 jsonData(url, category1);
} );

category1.addEventListener("change", ()=>{
 searchData.c1 = category1.options[category1.selectedIndex].value;
 let url = 'http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey='+key+'&contentTypeId='+searchData.tour+'&cat1='+searchData.c1+'&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&&_type=json';
 jsonData(url, category2);
} );

category2.addEventListener("change", ()=>{
 searchData.c2 = category2.options[category2.selectedIndex].value;
 let url = 'http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey='+key+'&contentTypeId='+searchData.tour+'&cat1='+searchData.c1+'&cat2='+searchData.c2+'&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json';
 jsonData(url, category3);
} );

category3.addEventListener("change", ()=>{
 searchData.c3 = category3.options[category3.selectedIndex].value;
} );



areaCode.addEventListener("change", ()=>{
 searchData.area = areaCode.options[areaCode.selectedIndex].value;
} );

async function tourData(url) {
 const result = await fetch(url);
 const jsonData = await result.json();

 detailDiv.replaceChildren();

 if(  jsonData['response']['body']['totalCount'] > 0){
   let detailUl = document.createElement('ul');
     data = jsonData['response']['body']['items']['item'];
     
     data.forEach( (d=>{
       let detailLi = document.createElement('li');
       let src = d.firstimage ? d.firstimage2 : "./img/tour.png";
       detailLi.innerHTML = `<img src=${src}> | ${d.title} | ${d.addr1}`;       
       detailUl.appendChild(detailLi);
      
   }));
   detailDiv.appendChild(detailUl);
 }
 else{
   let p = document.createElement('p');
   p.innerHTML = '정보가 없습니다.';
   detailDiv.appendChild(p);
 }
 container.appendChild(detailDiv);
}
areaBtn.addEventListener("click",()=>{
 let url =
 'http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey='+key+'&pageNo=1&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId='+searchData.tour+'&areaCode='+searchData.city+'&sigunguCode='+searchData.area+'&_type=json';
  tourData(url);

});


typeBtn.addEventListener("click",()=>{
 let url =
 'http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey='+key+'&pageNo=1&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId='+searchData.tour+'&areaCode='+searchData.city+'&sigunguCode='+searchData.area+'&_type=json';
  tourData(url);

});


// ※소분류조회 : 관광지(type=12) 대분류가 자연(A01)이고 중분류가 자연관광지(A0101)인 소분류코드를 조회
//http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey=pYzqKPUTp6M7yDoS813%2BXU5ckTuMvKWKZsui9PSsmb7X49iophW18UtvCObQAo7tPt5EvdJZH6k%2FTgNSpWmWHA%3D%3D&contentTypeId=12&cat1=A01&cat2=A0101&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json
//http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey=pYzqKPUTp6M7yDoS813%2BXU5ckTuMvKWKZsui9PSsmb7X49iophW18UtvCObQAo7tPt5EvdJZH6k%2FTgNSpWmWHA%3D%3D&contentTypeId=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json
//http://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey=pYzqKPUTp6M7yDoS813%2BXU5ckTuMvKWKZsui9PSsmb7X49iophW18UtvCObQAo7tPt5EvdJZH6k%2FTgNSpWmWHA%3D%3D&areaCode=1&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json




