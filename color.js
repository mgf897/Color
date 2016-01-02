var imageURL;
var n = 0;
var canvas;
var currentImg;
var brushColor = "#1abc9c";
var brushSize = 10;
var c01;

var images;

window.onload = function(){

	scaleCanvas();

	$.ajax({url:'images.json',success:function(data){ 
		images = data.images;
		console.log(images);
		$.each(data.images, function(i,image){ 
			 $('#image-select').append( new Option(image.title,i) );
			});
		loadImage(0);

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
			oImg.scale(Math.min(yScale,xScale));
			currentImg = oImg;
			drawOverlay();
		});
	
	canvas.on('mouse:up', function(options) {
		n++;
		drawOverlay();
	});
};

function drawOverlay(){
	canvas.remove(currentImg);
	canvas.add(currentImg);
	canvas.renderAll();
};
	
function OnChange(imageIndex){
	loadImage(imageIndex);

};

function loadImage(imageIndex){
	canvas.clear().renderAll();
	imageURL = images[imageIndex].url;
	$('#artName').html(images[imageIndex].artworkName);
	$('#artist').html(images[imageIndex].artist);
	$('#artUrl').attr('href',images[imageIndex].artworkUrl);
	$('#artLicence').html(images[imageIndex].license);

	fabric.Image.fromURL(imageURL, function(oImg){
			canvas.calcOffset();
			var yScale = canvas.height/oImg.height;
			var xScale = canvas.width/oImg.width;
			oImg.scale(Math.min(yScale,xScale));
			currentImg = oImg;
			drawOverlay();
		});
}

function scaleCanvas(){
	var canvas = document.getElementById("myCanvas");
	canvas.width = document.getElementById("canvas_cont").offsetWidth;
	canvas.height = canvas.width * 0.8;
};

function updateBrushColor(){
	canvas.freeDrawingBrush.color = brushColor;
};

function setBrushSize(size){

	if (size=="large"){
		brushSize = 20;
	} else if (size=="medium"){
		brushSize = 10;
	}else {
		brushSize = 5;
	}
	canvas.freeDrawingBrush.width = brushSize;
};
