//POST function

let data;
$('#submit').click(function(e)
{
    console.log('Button Clicked');
    $.ajax({
        url: '/main/Login_check/check',
        type:'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        }).done(function(data) {
            console.log(data);
            regionIDSet(data[0].region, data[0].ID);
            creatList(jsonToList(data));
        });    
    return false;
})

// let request;
// $('button#cancel').click(function(e)
// {
//     console.log('Button Deleted');
//     $.ajax({
//         url: '/main/Login_check/cancel',
//         type:'POST',
//         request: JSON.stringify(data),
//         dataType: 'json',
//         }).done(function(request) {
//             console.log(request);
//         });    
// })

function cancelDatabase()
{
    console.log('Button Deleted');
    $.ajax({
        url: '/main/Login_check/cancel',
        type:'POST',
        request: JSON.stringify(data),
        dataType: 'json',
        }).done(function(request) {
            console.log(request);
        });    
}

function testAlive()
{
    console.log('Alive');
}

//data control
function creatList(contentList){
    const loginBox=document.querySelector('#loginWindow');
    loginBox.classList.add('hidden');

    const Box=document.querySelector('#shoppingBox');
    Box.classList.remove('hidden');

    const title=['訂票序號: ','搭乘日期: ','交通工具: ','車次代碼: ','車輛種類: ','起始車站: ','終點車站: ','座位號碼: ','合計金額: ','付款方式: ','付款狀況: '];

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

    if(contentList[contentList.length-1]==='未付款'){
        const clearDIV=document.createElement('div');
        clearDIV.classList.add('clear');
        const clear=document.createElement('button');
        clear.id = 'cancel';
        clear.innerText='清除訂單';
        clear.addEventListener('click', cancelDatabase);
        clearDIV.appendChild(clear);
        myList.appendChild(clearDIV);
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
    cID.textContent='身分碼: '+idNum;

    cInf.appendChild(region);
    cInf.appendChild(cID);
    Box.appendChild(cInf);
}

////////////////////////////////////////////////////////////////
// regionIDSet('花蓮國','A875874566');
let mybutton=document.querySelector('#submit');
const list123=['abc123','2020/1/10','火車','416','普悠瑪','往北','小港國','天龍國','4車87號','875','信用卡','未付款'];
// mybutton.addEventListener('click',function() {creatList(list123)});
function jsonToList(json)
{
    let json_zero = json[0];
    let customerList = [json_zero.Serial_code, json_zero.Date, json_zero.vehicle_type, json_zero.VID, json_zero.type, json_zero.start, json_zero.destination, json_zero.seat_no, json_zero.price, json_zero.method, json_zero.Status];
    return customerList;
}