/*
    window.onload=function()
    {
        document.write("welcome to the hell!");
    }
*/      //如開起上段程式碼將會強制呈現並將下方程式碼完全取代掉 

$(document).ready(function(){
    
    $("#courseTable").append("<tr>"); 
    $("#courseTable").append("<th>"+"場次"+"</th>");
    $("#courseTable").append("<th>"+"時間"+"</th>");
    $("#courseTable").append("<th>"+"主題"+"</th>");
    $("#courseTable").append("</tr>");
    /*上述5行等於$("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>") 
    PS:""內的值不能斷行*/
    $("#courseTable").append("<tr><td>1</td><td>2018/10/10</td><td>活動項目</td></tr>"); 
    $("#courseTable").append("<tr><td class='even'>2</td class='even'><td class='even'>2018/10/17</td><td class='even'>活動項目</td></tr>"); 
    
    
    
    $("input[type=button]").click(function(){ 
    //( "input[type=date]" ).change(function() 當 $("...")發生變化時開始執行
        var inputDate = $("input[type=date]").val(); 
        //宣告inputDate為使用者所選的值(日期EX:2018-10-10)
        if(inputDate){ //判斷inputDate是否有值，沒有值就不執行
            var splitText = inputDate.split("-");//.split:字串切割
            //宣告splitText為使用者所選的值(日期)去掉/ EX:[2018,10,10]=[第0值,第1值,第2值]
            console.log(splitText[1]);    
            setMonthAndDay(splitText[0],splitText[1],splitText[2]);
            //設定setMonthAndDay為上述所得到的年月日(使用者點的年月日)
            setTable();
            //獲得年月日後去設定table
        }
        else{
            $("#courseTable").empty();
            $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
            $("#courseTable").append("<tr><td>1</td><td>2018/10/10</td><td>活動項目</td></tr>"); 
            $("#courseTable").append("<tr><td class='even'>2</td class='even'><td class='even'>2018/10/17</td><td class='even'>活動項目</td></tr>"); 
         }
    });
});    
    
function setTable(){

    $("#courseTable").empty(); //清空courseTable內的值
    
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    
    var topicCount = topic.length;
    var secondUnit = 1000;
    var minuteUnit = secondUnit*60;
    var hourUnit = minuteUnit*60;
    var dayUnit = hourUnit*24;
    /* 上述4行行可在25行取代改為 (new Date(startDate.getTime()+x*7*1000*60*60*24)) */   
    
    for(var x=0;x<topicCount;x++){
        if(x%2==0){
            $("#courseTable").append("<tr>");
            $("#courseTable").append("<td>"+(x+1)+"</td>");
            $("#courseTable").append("<td>"+(new Date(startDate.getTime()+x*7*dayUnit)).toLocaleDateString()+"</td>");   
            /*
            在courseTable內插入新的時間(new Date)
            new Date為startDate(世界標準時間1970年1月1日)到getTime(所獲得的時間)去*X*7*dayUnit
            toLocaleDateString() : 將日期變為字串
            
            PS:.replace("2018/",""):("取代字串","更換字串")          
            */
            $("#courseTable").append("<td>"+topic[x]+"</td>");
            $("#courseTable").append("</tr>");
            /*
            $("#courseTable").append("<tr><td>"+(x+1)+"</td><td>"+(new Date(startDate.getTime()+x*7*dayUnit)).toLocaleDateString().slice(5)+"</td><td>"+topic[x]+"</td></tr>");
            */
        }
        else {
            $("#courseTable").append("<tr>");
            $("#courseTable").append("<td class='even'>"+(x+1)+"</td>");
            $("#courseTable").append("<td class='even'>"+(new Date(startDate.getTime()+x*7*dayUnit)).toLocaleDateString()+"</td>");   
            //slice(開始,結束) -值為倒數 10/10/2018 > 10/10 : slice(0,-5)         
            $("#courseTable").append("<td class='even'>"+topic[x]+"</td>");
            $("#courseTable").append("</tr>"); 
        
            /*直接將偶數列不同表格樣式的設定改在main.js的判斷else內 就不需要在style.css內增加程式碼，但較不統一規則
            $("#courseTable").append("<tr>");
            $("#courseTable").append("<td style=\"background-color: rgb(247,254,214) ; border-width: 15px 5px; border-style: hidden dashed ; padding: 5% 20px 15px 1px\">"+(x+1)+"</td>");
            $("#courseTable").append("<td style=\"background-color: rgb(247,254,214) ; border-width: 15px 5px; border-style: hidden dashed ; padding: 5% 20px 15px 1px\">"+(new Date(startDate.getTime()+x*7*dayUnit)).toLocaleDateString().slice(5)+"</td>");  
            $("#courseTable").append("<td style=\"background-color: rgb(247,254,214) ; border-width: 15px 5px; border-style: hidden dashed ; padding: 5% 20px 15px 1px\">"+topic[x]+"</td>");
            $("#courseTable").append("</tr>"); */  
        }
    }    
};
