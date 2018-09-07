var mapArray, ctx, currentImgMainX, currentImgY;
var imgMountain, imgMain,imgEnemy;
/*
mapArray:決定地圖中每個格子的元素
ctx:context 畫布(canvas)上環境的意思
currentImgMainX currentImgMainY 設為主角圖片的起始座標
imgMountain:障礙物的圖片 imgMain:主角的圖片 imgEnemy:敵人的圖片
*/

$(document).ready(function(){ //當網頁元件準備好後執行以下內容
    mapArray = [0,1,1,0,0,0,3,1,2]; 
    //給每一格一個數值方便後續定義該格的用途與圖片 0:可走 1:障礙 2:終點 3:敵人 ()
    ctx = $("#myCanvas")[0].getContext("2d");
    //透過函數(.getContext)來取得2D環境的畫布上各個值(輸入參數為2d:2D繪圖)
     
    imgMain = new Image(); //主角圖片物件
    imgMain.src = "webgame/images/spritesheet.png";
    currentImgMainX=0;
    currentImgMainY=0;
    // (currentImgMainX,currentImgMainY) 主角起始座標
    
    imgMain.onload=function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
        /*在ctx(畫布)上畫出圖片imgMain
        裁出圖片[imgMain主角圖片座標起始點(0,0)往右往下延伸(寬80*高130)]
        貼到畫布上點座標[(0,0)上述已定義主角初始座標]往右往下延伸(寬200*高200)
        */
        imgMountain = new Image(); //障礙物圖片
        imgMountain.src = "webgame/images/material.png";
        imgEnemy = new Image(); //敵人圖片
        imgEnemy.src = "webgame/images/enemy.png";
        imgMountain.onload = function(){ //障礙物的圖片載入完畢後開始執行
            imgEnemy.onload  = function(){ //敵人的圖片載入完畢後開始執行
                for(var x in mapArray){ //叫X進去mapArray裡尋訪每一個數性或值
                    if(mapArray[x]==1){ // ==:等同於 如果[x進去第5間=(mapArray[5])]碰到的值等同於1時就執行
                        ctx.drawImage(imgMountain,193,192,30,32,x%3*200,Math.floor(x/3)*200,190,200);
                    /*
                    在ctx(畫布)上畫出圖片imgMountain
                    裁出圖片[imgMountain障礙物圖片座標起始點(192,192)往右往下延伸(寬30*高32)]
                    貼到畫布上這個點座標[x%3*200,Math.floor(x/3)*200]往右往下延伸(寬190*高200)
                    EX:(5%3*200=2*200=0,Math.floor(5/3)*200=1*200=200) 
                    Math.floor(只能放數字型態):一個無條件捨去後的最大整數
                    floor()是Math的靜態函式,所以不需實體化Math物件,只要直接呼叫Math.floor()就能使用
                    */
                    }
                    else if(mapArray[x]==3){ //如果x進去第N間所碰到的值等同於3時就執行
                        ctx.drawImage(imgEnemy,557,58,68,118,x%3*200,Math.floor(x/3)*200,200,200);
                    }
                }         
            }
        };
    };
});


$(document).keydown(function(event){ //在網頁按下按鍵後執行以下內容
    var targetImgMainX,targetImgMainY,targetBlock,cutImagePositionX;
    /*
    targetImgMainX,targetImgMainY:將要移動過去的位置
    targetBlock:主角將要移動過去的那一格編號
    cutImagePositionX:依主角朝向什麼方向而決定的圖片
    */
    event.preventDefault(); //避免使用者在(keydown(function(event))情況下按了非設定的按鍵時出錯
    //event.preventDefault() : 終止預設行為 EX:F5重新整理 這時網頁就沒有任何反應
    switch(event.which){
    /*switch(變數名稱或運算式){   (一個條件判斷陳述式，switch只能比較數值或字元)
    當使用者按下按鍵後開始透過switch進入判斷，看是否有吻合下述條件，如有即執行，沒有則進入default
    */
        case 37://左箭頭 case的判斷值需為數字或字元
            targetImgMainX = currentImgMainX-200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175; //圖檔X座標
            break;
        case 38://上箭頭
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-200;
            cutImagePositionX = 355;
            break;
        case 39://右箭頭
            targetImgMainX = currentImgMainX+200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case 40://下鍵頭
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+200;
            cutImagePositionX = 0;
            break;
        //設定使用者點擊特定按鍵後,來計算出下一個移動座標以及主角圖片的X座標      
        default:
            return;
            // return : 將函數處理/運行的結果返回為判斷結果,並且在此之後的代碼是不運行的。
            // PS : return 77; > 77    帶入的值為何其結果就會為何
 
    }
    if(targetImgMainX<=400 && targetImgMainX>=0 && targetImgMainY<=400 && targetImgMainY>=0){
    //如果下一個移動座標均符合條件(邊界的設定)時,即開始執行  ps:&&所連接的條件都必須成立
        targetBlock = targetImgMainX/200+targetImgMainY/200*3; 
        //將下一移動座標轉換並定義出targetBlock為第幾格 EX:(200,400) > 200/200+400/200*3=7(即第7格)
    }
    else{
        targetBlock=-1; //如果不合合條件，給targetBlock一個為-1的值，後續作為代表異常不移動的判斷值
    }
    
    ctx.clearRect(currentImgMainX,currentImgMainY,200,200);
    //清空主角的移動前的該格所有內容(主角目前座標X,主角目前座標Y,向右延伸XX,向下延伸XX)
    if(targetBlock==-1 || mapArray[targetBlock]==1 ||mapArray[targetBlock]==3){
    /*
    如果目標格為-1或目標格的地圖元素為1或3 不做任何動作並留在原地 PS: ||(代表或)
    EX:由前一判斷得知targetBlock的值並帶入mapArray[targetBlock] > mapArray[7] > mapArray第7格的值為3
    */
    }
    
    else{ //下一個移動座標的目標格不是上述狀況的話即開始執行
        $("#talkBox").text("");//把文字方塊清空
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }   //將主角圖片的目前座標的值變為下一個移動座標的值
    
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200); 
    /*
    在ctx(畫布)上畫出圖片imgMain
    裁出圖片[imgMain主角圖片座標(帶入上述所獲得的cutImagePositionX值,0)往右往下延伸(寬80*高130)]
    貼到畫布上'下一個移動座標'帶入上述所獲得的currentImgMainX&Y新值
    (currentImgMainX=targetImgMainX,currentImgMainY=targetImgMainY)往右往下延伸(寬200*高200)
    */
    switch(mapArray[targetBlock]){//判斷目標格的地圖元素為何，如符合下述狀況即顯示其文字結果
        case undefined:
        //undefined是尚未給定已宣告變項的值，但是not defined則是該變項尚未宣告過，執行後會出現錯誤訊息！
            $("#talkBox").text("邊界");
            break;
        case 1:
            $("#talkBox").text("有山");
            break;
        case 2:
            $("#talkBox").text("抵達終點");
            break;
        case 3:
            $("#talkBox").text("投屎問路");
            break;
    }
});