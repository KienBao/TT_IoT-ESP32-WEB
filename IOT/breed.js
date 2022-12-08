
  const firebaseConfig = {
    apiKey: "AIzaSyB2xv85HDfkkyTnRbi59Re4EEGLehnW9BY",
    authDomain: "esp32-iot-e0b8a.firebaseapp.com",
    databaseURL: "https://esp32-iot-e0b8a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "esp32-iot-e0b8a",
    storageBucket: "esp32-iot-e0b8a.appspot.com",
    messagingSenderId: "953348637021",
    appId: "1:953348637021:web:4ffd1edbf12d4b5b6268b4"
  }; 
  
  firebase.initializeApp(firebaseConfig);
  var database=firebase.database();

 
//button--------------------------------
var checkbox_toggle = document.getElementById('darkmode');
checkbox_toggle.addEventListener('change', function(){
    document.body.classList.toggle('dark');
});

var checkbox_toggle = document.getElementById('darkmode');
checkbox_toggle.addEventListener('change', function(){
    document.body.classList.toggle('bao_p_w');
});

var box1 = document.getElementById('on_off1');
box1.addEventListener('change', function(){
    var currentImg = document.getElementById("imgFanCtl1");
    if (currentImg.src.indexOf("den.png") != -1) {
        database.ref("/breed").update({
        "Den_1" : 'on'
        });
    }
    else {
        database.ref("/breed").update({
        "Den_1" : 'off'
        });
    }
});
//autoupdate imglight
database.ref("/breed/Den_1").on("value", function(snapshot){
    var ss = snapshot.val();
    if(ss == 'on'){
       document.getElementById('imgFanCtl1').src="LightOn.png";
       document.getElementById('on_off1').checked = true;
    }
    else {
        document.getElementById('imgFanCtl1').src="den.png";
        document.getElementById('on_off1').checked = false;
    }
});

var box2 = document.getElementById('on_off2');
box2.addEventListener('change', function(){
    var currentImg = document.getElementById("imgFanCtl2");
    if (currentImg.src.indexOf("loaoff.jpg") != -1) {
        database.ref("/breed").update({
        "Den_2" : 'on'
        });
    }
    else {
        database.ref("/breed").update({
        "Den_2" : 'off'
        });
    }
});
//autoupdate imglight
database.ref("/breed/Den_2").on("value", function(snapshot){
    var ss = snapshot.val();
    if(ss == 'on'){
       document.getElementById('imgFanCtl2').src="loaon.jpg";
       document.getElementById('on_off2').checked = true;
    }
    else{
       document.getElementById('imgFanCtl2').src="loaoff.jpg";
       document.getElementById('on_off2').checked = false;
    }
});

var box3 = document.getElementById('on_off3');
box3.addEventListener('change', function(){
    var currentImg = document.getElementById("imgFanCtl3");
    if (currentImg.src.indexOf("fanoff.png") != -1) {
        database.ref("/breed").update({
            "Den_3" : 'on'
        });
    }
    else {
        database.ref("/breed").update({
            "Den_3" : 'off'
        });
    }
});
//autoupdate imglight
database.ref("/breed/Den_3").on("value", function(snapshot){
    var ss = snapshot.val();
    if(ss == 'on'){
       document.getElementById('imgFanCtl3').src="https://acegif.com/wp-content/uploads/2022/fzk5d/fan-gif-67-cartoon-fan-with-stripes.gif";
       document.getElementById('on_off3').checked = true;
    }
    else{
       document.getElementById('imgFanCtl3').src="fanoff.png";
       document.getElementById('on_off3').checked = false;
    }
});

var box4 = document.getElementById('on_off4');
box4.addEventListener('change', function(){
    var currentImg = document.getElementById("imgFanCtl4");
    if (currentImg.src.indexOf("den.png") != -1) {
        document.getElementById('imgFanCtl4').src="LightOn.png";
        database.ref("/breed").update({
            "Den_4" : 'on'
        });
    }
    else {
        document.getElementById('imgFanCtl4').src="den.png";
        database.ref("/breed").update({
            "Den_4" : 'off'
        });
    }
});
//autoupdate imglight
database.ref("/breed/Den_4").on("value", function(snapshot){
    var ss = snapshot.val();
    if(ss == 'on'){
       document.getElementById('imgFanCtl4').src="LightOn.png";
       document.getElementById('on_off4').checked = true;
    }
    else{
       document.getElementById('imgFanCtl4').src="den.png";
       document.getElementById('on_off4').checked = false;
    }
});


//get temp form database
database.ref("/breed/Nhietdo1").on("value", function(snapshot){
    var temp = snapshot.val();
    document.getElementById("nhietdo1").innerHTML = temp
});

database.ref("/breed/Rain").on("value", function(snapshot){
    var temp = snapshot.val();
    if(temp==1){
     document.getElementById("Rain").innerHTML = "Không";
    }
    if(temp==0){
        document.getElementById("Rain").innerHTML = "Có";
    }
});

database.ref("/breed/doam1").on("value", function(snapshot){
    var temp = snapshot.val();
    document.getElementById("doam1").innerHTML = temp
});

database.ref("/breed/Oxi").on("value", function(snapshot){
    var temp = snapshot.val();
    document.getElementById("Oxi").innerHTML = temp
});

