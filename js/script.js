window.onload=function myAlert() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.translate(100, 100);
    context.save();
    context.beginPath();
    context.lineWidth = 5;
    context.moveTo(170, 0);
    context.lineTo(180, 15);
    context.lineTo(180, 5);
    context.lineTo(250, 5);
    context.lineTo(250, -5);
    context.lineTo(180, -5);
    context.lineTo(180, -15);
    context.closePath();
    context.fill();
    context.restore();
}