//POST function

let data;
$('#submit').click(function()
{
    console.log('Button Clicked');
    $.ajax({
        url: '/main/ShoppingCart/getInformation',
        type:'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        }).done(function(data) {
            console.log(data);
            creatList(jsonToList(data));
        });      
})


//data control

function creatList(contentList){
    const Box=document.querySelector('#shoppingBox');

    const title=['訂票序號: ','搭乘日期: ','交通工具: ','車次代碼: ','車輛種類: ','行進方向: ','起始車站: ','終點車站: ','座位號碼: ','合計金額: ','付款方式: ','付款狀況: '];

    const myList=document.createElement('div');
    myList.classList.add('shoppingList');
    
    
    let myEntity;
    let myListTitle;
    let myListContent;

    for(let i=0;i<title.length;i++){
        myEntity=document.createElement('div');
        myListTitle=document.createElement('div');
        myListContent=document.createElement('div');
        myListTitle.classList.add('listTitle');
        myListContent.classList.add('listContent');
        myListTitle.textContent=title[i];
        myListContent.textContent=contentList[i];
        myEntity.appendChild(myListTitle);
        myEntity.appendChild(myListContent);
        myList.appendChild(myEntity);
    }
    Box.appendChild(myList);
}

////////////////////////////////////////////////////////////////

function regionIDSet(country,idNum){
    const Box=document.querySelector('#shoppingBox');

    const cInf=document.createElement('div');
    cInf.classList.add('cInf');

    const region=document.createElement('div');
    region.classList.add('region');
    region.textContent='國籍: '+country;

    const cID=document.createElement('div');
    cID.classList.add('cID');
    cID.textContent='身分證/護照號碼: '+idNum;

    cInf.appendChild(region);
    cInf.appendChild(cID);
    Box.appendChild(cInf);
}

////////////////////////////////////////////////////////////////
regionIDSet('花蓮國','A875874566');
let mybutton=document.querySelector('button');
const list123=['abc123','2020/1/10','火車','416','普悠瑪','往北','小港國','天龍國','4車87號','875','信用卡','未付款'];
function jsonToList(json)
{
    let json_zero = json[0];
    let customerList = [json_zero.Serial_code, json_zero.Date, json_zero.vehicle_type, json_zero.VID, json_zero.type, json_zero.direction, json_zero.start, json_zero.destination, json_zero.seat_no, json_zero.price, json_zero.method, json_zero.Status];
    return customerList;
}
// mybutton.addEventListener('click',function() {creatList(list123)});