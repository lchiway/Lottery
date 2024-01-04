var num = 2;
var prize_array = [];
var prize_name_array = ["input1", "input2", "input3", "input4", "input5", "input6", "input7", "input8", "input9", "input10"];
var prize1 = document.getElementById("prize1");
var prize2 = document.getElementById("prize2");
var prize3 = document.getElementById("prize3");
var prize4 = document.getElementById("prize4");
var prize5 = document.getElementById("prize5");
var prize6 = document.getElementById("prize6");
var prize7 = document.getElementById("prize7");
var prize8 = document.getElementById("prize8");
var prize9 = document.getElementById("prize9");
var prize10 = document.getElementById("prize10");

window.onload = function(){
    init_ui();
    update_ui();
}

function set_num(){
    var num_select = document.getElementById("num");
    var idx = num_select.selectedIndex;
    num = num_select.options[idx].value;
    init_ui();
    update_ui();
    console.log("set num:");
    console.log(num);
}

function confirm(){
    window.sessionStorage.setItem("num", num);
    set_prize();
    window.sessionStorage.setItem("prize", prize_array)
    location.assign('../index.html');
}

function init_ui(){
    prize3.style.display="none"
    prize4.style.display="none"
    prize5.style.display="none"
    prize6.style.display="none"
    prize7.style.display="none"
    prize8.style.display="none"
    prize9.style.display="none"
    prize10.style.display="none"
}

function update_ui(){
    if(num==3){
        set_prize_3();
    } else if(num==4){
        set_prize_4();
    } else if(num==5){
        set_prize_5();
    } else if(num==6){
        set_prize_6();
    } else if(num==7){
        set_prize_7();
    } else if(num==8){
        set_prize_8();
    } else if(num==9){
        set_prize_9();
    } else if(num==10){
        set_prize_10();
    }
}

function set_prize(){
    prize_array = [];
    for(var i=0; i<num; i++){
        prize_array.push(document.getElementById(prize_name_array[i]).value);
    }
    console.log("input:");
    console.log(prize_array);
}

function set_prize_3(){
    prize3.style.display=""
}

function set_prize_4(){
    set_prize_3();
    prize4.style.display=""
}

function set_prize_5(){
    set_prize_4();
    prize5.style.display=""
}

function set_prize_6(){
    set_prize_5();
    prize6.style.display=""
}

function set_prize_7(){
    set_prize_6();
    prize7.style.display=""
}

function set_prize_8(){
    set_prize_7();
    prize8.style.display=""
}

function set_prize_9(){
    set_prize_8();
    prize9.style.display=""
}

function set_prize_10(){
    set_prize_9();
    prize10.style.display=""
}