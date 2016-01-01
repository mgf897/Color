var imageURL = 'image/img1.png';
var n = 0;
var canvas;
var currentImg;
var brushColor = "#1abc9c";
var brushSize = 10;
var c01;

window.onload = function(){

	//select medium brush size
	
	//select first color

	scaleCanvas();

	$.ajax({url:'images.json',success:function(data){ 
		$.each(data.images, function(i,image){ 
			console.log(image.url); 
			console.log(image.title); 
			 $('#image-select').append( new Option(image.title,image.url) );
			});	
		}, 
	});

	canvas = new fabric.Canvas('myCanvas');
	c01 = document.getElementById('c01');
	var paletteWidth = window.getComputedStyle(c01,null).getPropertyValue("width");
	var colorbox = document.getElementsByClassName('colorbox');

	var getBgColor = function() {
		brushColor = window.getComputedStyle(this,null).getPropertyValue("background-color");
		for (var i = 0; i < colorbox.length; i++) {
			$(colorbox[i]).removeClass('selectedColor').addClass('unselectedColor');
		}
		$(this).removeClass('unselectedColor').addClass('selectedColor');
		//console.log(brushColor);
		updateBrushColor();	
	};
	for (var i = 0; i < colorbox.length; i++) {
		colorbox[i].addEventListener('click', getBgColor, false);
	}
    	
	
	$('#brushSize input:radio').addClass('input_hidden');
	$('#brushSize label').click(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
	});
	
	canvas.isDrawingMode = true;
	canvas.freeDrawingBrush.color = brushColor;
	canvas.freeDrawingBrush.width = brushSize;
		
	fabric.Image.fromURL(imageURL, function(oImg){
			canvas.calcOffset();
			var yScale = canvas.height/oImg.height;
			var xScale = canvas.width/oImg.width;
			oImg.scale(Math.max(yScale,xScale));
			currentImg = oImg;
			drawOverlay();
		});
	
	canvas.on('mouse:up', function(options) {
		n++;
		//console.log(n);
		drawOverlay();
	});
};

function drawOverlay(){
	canvas.remove(currentImg);
	canvas.add(currentImg);
	canvas.renderAll();
};
	
function OnChange(imageSelection){
	canvas.clear().renderAll();
	console.log(imageSelection);
	imageURL = imageSelection;
	fabric.Image.fromURL(imageURL, function(oImg){
			canvas.calcOffset();
			var yScale = canvas.height/oImg.height;
			var xScale = canvas.width/oImg.width;
			oImg.scale(Math.max(yScale,xScale));
			currentImg = oImg;
			drawOverlay();
		});
};

function scaleCanvas(){
	var canvas = document.getElementById("myCanvas");
	canvas.width = document.getElementById("canvas_cont").offsetWidth;
	canvas.height = canvas.width * 0.8;
};

function updateBrushColor(){
	canvas.freeDrawingBrush.color = brushColor;
	//console.log(brushColor);
};

function setBrushSize(size){
	//console.log(size);
	if (size=="large"){
		brushSize = 20;
	} else if (size=="medium"){
		brushSize = 10;
	}else {
		brushSize = 5;
	}
	canvas.freeDrawingBrush.width = brushSize;
};
