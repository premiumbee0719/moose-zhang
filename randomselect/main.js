$(document).ready(function() {
    $("input").click(function()
    {
        /*
        alert("HI");
        $("H1").text("等等 我還在想");
        $("H1").text($("li:first").text());
        $("H1").text($("li:last").text());
        $("H1").text($("li").eq(1).text()); 
        $("H1").text($("li").eq(2).text()+"&"+$("li").eq(4).text());
        */
        
        var numberOflistItem = $("#choices li").length; //("#id li") li是tag
      
        
        var randomchildnumber = Math.floor(Math.random()*numberOflistItem);
        //var randomchildnumber2= Math.floor(Math.random()*numberOflistItem);
       
        $("h1").text($("#choices li").eq(randomchildnumber).text()); //("#id li") li是tag
        
        /*
        $("H1").text($("li").eq(randomchildnumber2).text()+" + "+$("li").eq(randomchildnumber).text());
        /* 
        var randomchildnumber1= Math.floor(Math.random()*numberoflistitem);
        var randomchildnumber2= Math.floor(Math.random()*numberoflistitem);
        */   
    });
    
});