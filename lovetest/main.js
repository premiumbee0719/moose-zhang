$(document).ready(function(){ //當網頁元件準備好後執行以下內容
    
    var currentQuiz=null; //建立currentQuiz 儲存目前做到第幾題 (null=空的值也可填-1)
    
    $("#startButton").click(function(){ //$:尋找;找到startButton點擊後開始執行
        
        if(currentQuiz==null){  //如果第幾題的儲存值為空時，開始執行，不是則跳到else
            currentQuiz=0; 
            $("#question").text(questions[0].question);
            $("#options").empty(); //清空該區域 如不清空 選項將會一直疊加下去
            for(var x=0;x<questions[0].answers.length;x++){ 
                //x < 第0題 題目內的選項數量時執行;0<3(會執行0.1.2共三次)
                $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");
            }   /*在HTML question的地方插入(append)後面()內的設定
                questions[0]:第0題;answers[X][0]:[X]=answers內的第幾個選項(0.1.2)、[0]=answers內第幾個選項的第0個值 
                PS:因為這邊不需要回傳值去後端，也沒有設定後端，故這裡的value沒有意義可以省略
                ps:給使用者看的東西最好用label包起來  append 有插入或更改原先全部設定的意思 */
            $("#startButton").attr("value","下一題"); 
            //在HTML startButton 的地方將值(value)改為下一題(字串) PS:attr可以用來更改屬性或是該屬性的值(value):"字串"
        }
        
        else { //開始做答
            $.each($(":radio"),function(i,val){ 
                //$.each:檢查每個選項與其值 i=radio的數量(檢查是否被選取時計次用) val=radio該選項的這一整個值(這一列)
                if(val.checked){ //如果該選項被選取的話開始執行，否則跳出迴圈換檢查下一個選項
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                    //isNaN=不是數字 如果該被選取選項的第1值["XXX"(第0值),2(第1值)]不為數字時開始執行
                        var finalResult = questions[currentQuiz].answers[i][1]; //宣告 finalResult為被選中選項的第1個值得答案(A.B.C.D) PS:answers[i][1] i即為上方判斷中,所檢查到有被選取的第幾個選項
                        $("#question").text(finalAnswers[finalResult][0]);//在HTML question的地方將字串更改為上行宣告後所得的答案值標題  [0]=該最終答案內的第0個值 ["愛情有點酸","....."]
                        $("#options").empty(); 
                        $("#options").append(finalAnswers[finalResult][1]+"<br><br>"); //在options的地方更改為最終結果的第1個值["...","在2018年..."]
                        currentQuiz=null; //將目前做到第幾題的變數清空
                        $("#startButton").attr("value","重新開始");
                    }
                    else{
                        currentQuiz=questions[currentQuiz].answers[i][1]-1;
                        /* 接下來的要顯示的 currentQuiz(題數)為被選取選項內的第1個值減1後的題數 
                        ps:原始資料題數是從1開始算故這裡要-1 */
                        $("#question").text(questions[currentQuiz].question);
                        //在HTML question的地方將字串改為上行所得的題數標題(字串)
                        $("#options").empty();
                        for(var x=0;x<questions[currentQuiz].answers.length;x++){
                        // x < 上述所得的題數 內的選項數量時執行;0<n(會執行0.1.2...n 共n次)    
                            $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[currentQuiz].answers[x][0]+"</label><br><br>");    
                            /*在HTML question的地方插入(append)後面()內的設定與值
                            questions[currentQuiz].answers[x][0]:上述所得題數內的answers第X個選項的第0個值 */
                        }    
                    }
                    return false; //跳出迴圈
                }       
            }) 
        }    
    });
});