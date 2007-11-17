// Author: Danny Mavromatis
// Version: 3.00.2
// Created: 10/29/2001
// Updated: 10/16/2006
// FLASH detection system
	var cId = 0;
	var aV = 0;
	var swVersion;
	var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false;
	if(isIE && isWin){
		document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
		document.write('Function VBGetSwfVer(i) \n');
		document.write('on error resume next \n');
		document.write('Dim swControl, swVersion \n');
		document.write('swVersion = 0 \n');
		document.write('set swControl = CreateObject("ShockwaveFlash.ShockwaveFlash." + CStr(i)) \n');
		document.write('if (IsObject(swControl)) then \n');
		document.write('swVersion = 0 \n');
		document.write('swVersion = swControl.GetVariable("$version") \n');
		document.write('end if \n');
		document.write('VBGetSwfVer = swVersion \n');
		document.write('End Function \n');
		document.write('</SCR' + 'IPT\> \n');
	} else {
		var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
		function JSGetSwfVer(i){
		      if (navigator.plugins != null && navigator.plugins.length > 0) {
		            if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
		                  var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
		                        var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
		                        descArray = flashDescription.split(" ");
		                        tempArrayMajor = descArray[2].split(".");
		                        versionMajor = tempArrayMajor[0];
		                  if ( descArray[3] != "" ) {
		                        tempArrayMinor = descArray[3].split("r");
		                  } else {
		                        tempArrayMinor = descArray[4].split("r");
		                  }
		                        versionMinor = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
		                        flashVer = parseFloat(versionMajor + "." + versionMinor);
		            } else {
		                  flashVer = -1;
		            }
		      }
		      else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
		      else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
		      else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
		      else {
		            flashVer = -1;
		      }
		      return flashVer;
		}
	}
function checkFlash(rV){

	
	
	var ua=navigator.userAgent.toLowerCase();
	this.webtv = (ua.indexOf("webtv")>-1);
	this.ie = (parseFloat(ua.slice(ua.indexOf("msie")+5)));
	this.nn = (parseFloat(ua.slice(ua.indexOf("mozilla/")+8)));
	var browser = navigator.appName.toLowerCase();
	if (browser=="netscape"){
	this.netscape = true;
	}else{
	this.netscape = false;
	}
	this.mac = (ua.indexOf("mac")>-1);
	this.flash = false;

	if (isIE && isWin){
		
		aV = VBGetSwfVer(rV);
		
		if (aV != 0){
			var cVArray = VBGetSwfVer(rV).split(" ");
			cVArray = cVArray[1].split(",");
			aV = cVArray[0];
		}
		
	} else {
		aV = JSGetSwfVer(rV);
	}
	
	if (aV >= rV) {
		if (this.netscape && this.IEonly == 'TRUE' || this.mac && this.IEonly == 'TRUE'){
			this.flash = false;
		} else {
			this.flash = true;
		}
	}
	
	
}
function flashObj() {
	cId += 1;
	this.flashFile = "/flash/blank.swf";
	this.LiveConnect = "FALSE";
	this.IEonly = null;
      	this.wmode = "opaque";
      	this.redirect = null;
	this.DenyIEdl = "FALSE";
	this.altImg = "/blank.gif";
	this.bgcolor = null;
	this.altTxt = null;
	this.height = "400";
	this.width = "520";
	this.salign="lt";
	this.align="left";
	this.flashVars = null;
	this.ID = "flash"+ cId;
	this.name = "flash"+ cId;
	this.webTV = "true";
	this.quality = "best";
	this.scale = "exactfit";
	this.menu = "false";
	this.deviceFont = "false";
	this.FlashVer = 5;
	this.cabVersion = "5,0,0,0";
	this.allowScriptAccess = "Always";
	this.allowNetworking = "All";
	this.render = writeFlashComponent;
}
function writeFlashComponent(val) {
	var Ticket=new checkFlash(this.FlashVer);
	var sCR = "";
	
	if (Ticket.flash) {
		if (Ticket.mac || Ticket.netscape) {
			sCR='<EMBED SRC="'+this.flashFile+'" swLiveConnect="'+this.LiveConnect+'" WIDTH="'+this.width+'" HEIGHT="'+this.height+'" QUALITY="'+this.quality+'" SCALE="'+this.scale+'" FlashVars="'+ this.flashVars +'" wmode="'+this.wmode+'" ID="'+this.ID+'" NAME="'+this.name+'" MENU="'+this.menu+'" DEVICEFONT="'+this.deviceFont + '"';
			if (this.bgcolor) {
				sCR += ' BGCOLOR="'+this.bgcolor + '"';
			}
			if (this.salign) {
				sCR += ' SALIGN="'+this.salign + '"';
			}
			if (this.allowScriptAccess) {
				sCR+= ' ALLOWSCRIPTACCESS="'+this.allowScriptAccess+'"';
			}
			if (this.allowNetworking) {
				sCR+= ' ALLOWNETWORKING="'+this.allowNetworking+'"';
			}
			sCR += ' TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></EMBED>';
		} else if (this.DenyIEdl=='TRUE') {
			sCR="<OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://active.macromedia.com/flash2/cabs/swflash.cab#version="+this.FlashVer+",0,0,0\" ID=\""+this.ID+"\" WIDTH=\""+this.width+"\" HEIGHT=\""+this.height+"\">\n";
			sCR+="<PARAM NAME=movie VALUE=\""+this.flashFile+"\">\n";						
			sCR+="<PARAM NAME=quality VALUE=\""+this.quality+"\">\n";
			sCR+="<PARAM NAME=scale VALUE=\""+this.scale+"\">\n";
			sCR+="<PARAM NAME=menu VALUE=\""+this.menu+"\">\n";
			sCR+="<PARAM NAME=wmode VALUE=\""+this.wmode+"\">\n";
			if (this.bgcolor){
				sCR+="<PARAM NAME=bgcolor VALUE=\""+this.bgcolor+"\">\n";
			}
			if (this.flashVars){
				sCR+="<PARAM NAME=FlashVars VALUE=\""+this.flashVars+"\">\n";
			}
			if (this.salign) {
				sCR+="<PARAM NAME=salign VALUE=\""+this.salign+"\">\n";
			}
			if (this.allowScriptAccess) {
				sCR+="<PARAM NAME=allowScriptAccess VALUE=\""+this.allowScriptAccess+"\">\n";
			}
			if (this.allowNetworking) {
				sCR+="<PARAM NAME=allowNetworking VALUE=\""+this.allowNetworking+"\">\n";
			}
			sCR+="<PARAM NAME=devicefont VALUE=\""+this.deviceFont+"\">\n";
			if (this.bgcolor){
			sCR+="<EMBED SRC="+this.flashFile+" swLiveConnect="+this.LiveConnect+" WIDTH="+this.width+" HEIGHT="+this.height+" QUALITY="+this.quality+" SCALE="+this.scale+" wmode="+this.wmode+" ID="+this.ID+" NAME="+this.name+" MENU="+this.menu+" DEVICEFONT="+this.deviceFont+" FlashVars="+ this.flashVars +" BGCOLOR="+this.bgcolor+" TYPE=application/x-shockwave-flash PLUGINSPAGE=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash></EMBED></OBJECT>";
			} else {
			sCR+="<EMBED SRC="+this.flashFile+" swLiveConnect="+this.LiveConnect+" WIDTH="+this.width+" HEIGHT="+this.height+" QUALITY="+this.quality+" SCALE="+this.scale+" wmode="+this.wmode+" ID="+this.ID+" NAME="+this.name+" MENU="+this.menu+" DEVICEFONT="+this.deviceFont+" FlashVars="+ this.flashVars +" TYPE=application/x-shockwave-flash PLUGINSPAGE=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash></EMBED></OBJECT>";
			}
		} else if (Ticket.ie>=4 && this.DenyIEdl=='FALSE') {
			sCR="<OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://active.macromedia.com/flash2/cabs/swflash.cab#version="+this.cabVersion+"\" ID=\""+this.ID+"\" WIDTH=\""+this.width+"\" HEIGHT=\""+this.height+"\">\n";
			sCR+="<PARAM NAME=movie VALUE=\""+this.flashFile+"\">\n";						
			sCR+="<PARAM NAME=quality VALUE=\""+this.quality+"\">\n";
			sCR+="<PARAM NAME=scale VALUE=\""+this.scale+"\">\n";
			sCR+="<PARAM NAME=menu VALUE=\""+this.menu+"\">\n";
			sCR+="<PARAM NAME=wmode VALUE=\""+this.wmode+"\">\n";
			if (this.flashVars){
				sCR+="<PARAM NAME=FlashVars VALUE=\""+this.flashVars+"\">\n";
			}
			if (this.bgcolor){
				sCR+="<PARAM NAME=bgcolor VALUE=\""+this.bgcolor+"\">\n";
			}
			if (this.salign) {
				sCR+="<PARAM NAME=salign VALUE=\""+this.salign+"\">\n";
			}
			if (this.allowScriptAccess) {
				sCR+="<PARAM NAME=allowScriptAccess VALUE=\""+this.allowScriptAccess+"\">\n";
			}
			if (this.allowNetworking) {
				sCR+="<PARAM NAME=allowNetworking VALUE=\""+this.allowNetworking+"\">\n";
			}
			sCR+="<PARAM NAME=devicefont VALUE=\""+this.deviceFont+"\">\n";
			sCR+="</OBJECT>\n";
		} else if (Ticket.webtv) {
			sCR="<EMBED SRC="+this.flashFile+" swLiveConnect=TRUE WIDTH="+this.width+" HEIGHT="+this.height+" QUALITY="+this.quality+" SCALE="+this.scale+" wmode="+this.wmode+" ID="+this.ID+" NAME="+this.name+" MENU="+this.menu+" DEVICEFONT="+this.deviceFont+" FlashVars="+ this.flashVars +" TYPE=application/x-shockwave-flash PLUGINSPAGE=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash></EMBED>";
		}
	} else {
	if (this.redirect){
	 top.location.href = this.redirect;
	} else {
			if (this.altTxt){
			sCR = this.altTxt;
			} else {
			sCR="<IMG SRC="+this.altImg+" WIDTH="+this.width+" HEIGHT="+this.height+" BORDER=0>";
			}
		}
		}
		
		
	if (val == true) {
		document.write(sCR);
	} else{
		return sCR;
	}
}




// pop new window 
function daughter(pstr1,pstr2,pstr3)  {
	var windowFeatures = 'toolbar=no,status=no,scrollbars=no,location=no,menubar=no,directories=no,resizable=no,width=' + pstr2 + ',height=' + pstr3;
	window.open(pstr1,'thisPopup', windowFeatures);
}

// because daughter conflicts with a function in ad-production flash js version
function daughter2(pstr1,pstr2,pstr3)  {	
	var windowFeatures = 'toolbar=no,status=no,scrollbars=no,location=no,menubar=no,directories=no,resizable=no,width=' + pstr2 + ',height=' + pstr3;
	window.open(pstr1,'thisPopup', windowFeatures);
}

