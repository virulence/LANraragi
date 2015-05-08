/*
Simple Image Trail script- By JavaScriptKit.com
Visit http://www.javascriptkit.com for this script and more
This notice must stay intact
*/ 

var w=1
var h=1
var thumbnail

if (document.getElementById || document.all)
document.write('<div id="trailimageid" style="position:absolute;visibility:hidden;left:0px;top:-1000px;width:1px;height:1px;border:1px solid #888888;background:#DDDDDD;z-index: 99999;"><img id="ttimg" src="img/empty.png" /></div>')

function gettrailobj()
{
	if (document.getElementById) return document.getElementById("trailimageid").style
	else if (document.all) return document.all.trailimagid.style
}

function truebody()
{
	return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function hidetrail()
{
	document.onmousemove=""
	document.getElementById('ttimg').src='img/empty.png'
	gettrailobj().visibility="hidden"
	gettrailobj().left=-1000
	gettrailobj().top=0
	//No need to look for the thumbnail anymore, we clear the loop.
	clearInterval(thumbnail)
}

function findHHandWW() {
    h = this.height;
	w = this.width;
	return true;
  }
  
function showImage(imgPath) {
    var myImage = new Image();
    myImage.name = imgPath;
    myImage.onload = findHHandWW;
    myImage.src = imgPath;
  }
  
  function checkImage (src, good, bad) {
    var img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img.src = src;
}

function showImageorSpinner(file)
{
	checkImage(file, function(){document.getElementById('ttimg').src=file},function(){document.getElementById('ttimg').src='img/wait_warmly.gif'});
}

function showtrail(file)
{

	if(navigator.userAgent.toLowerCase().indexOf('opera') == -1)
	{
		if(file.indexOf(".jpg") !=-1) //Have we been given a proper thumbnail?
		{
		showImage(file)
		showImageorSpinner(file)
		
		//The thumbnail is created through ajax if it doesn't exist yet, so we try to get the image again every second.
		clearInterval(thumbnail)
		thumbnail = setInterval(function(){showImageorSpinner(file);},1000)
		}
		else
		{
		showImage('img/noThumb.png')
		document.getElementById('ttimg').src='img/noThumb.png'
		}
		
		document.onmouseover=followmouse
		gettrailobj().visibility="visible"
		gettrailobj().width=w+"px"
		gettrailobj().height=h+"px"
		

	}
}

function followmouse(e)
{

	if(navigator.userAgent.toLowerCase().indexOf('opera') == -1)
	{

		var xcoord=20
		var ycoord=20

		if (typeof e != "undefined")
		{
			xcoord+=e.pageX
			ycoord+=e.pageY
		}
		else if (typeof window.event !="undefined")
		{
			xcoord+=truebody().scrollLeft+event.clientX
			ycoord+=truebody().scrollTop+event.clientY
		}

		var docwidth=document.all? truebody().scrollLeft+truebody().clientWidth : pageXOffset+window.innerWidth-15
		var docheight=document.all? Math.max(truebody().scrollHeight, truebody().clientHeight) : Math.max(document.body.offsetHeight, window.innerHeight)

		if (xcoord+w+3>docwidth)
		xcoord=xcoord-w-(20*2)

		if (ycoord-truebody().scrollTop+h>truebody().clientHeight)
		ycoord=ycoord-h-20;

		gettrailobj().left=xcoord+"px"
		gettrailobj().top=ycoord+"px"

	}

}
