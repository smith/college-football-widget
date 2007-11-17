COOKIE_NAME = "DETECT";          // Cookie name
COOKIE_DOMAIN = ".go.com";       // Cookie domain
COOKIE_LIFETIME = 30 * 24 * 3600000; // Cookie lifetime (30 days) in ms
COOKIE_VERSION = "1.0.0";        // Cookie version
COOKIE_LENGTH  = 4;              // Number of long integers in the cookie
VERSION = "Version";             // DETECT cookie version property
function Cookie(document)
{
   this.$document = document;
   this.$numberOfData = COOKIE_LENGTH;
} // constructor
function _Cookie_is_valid()
{
   var value = 1;
   if (this["RawData1"] != null)
      value = this["RawData1"];
   var bits = (value >> 1) & ~(~0 << 8);
   if (this._calcValidity() == bits)
      return true;
   else
      return false;
} // _Cookie_is_valid()
function _Cookie_store()
{
   this._setValidity();
   var cookieVal = "";
   if (this[VERSION] == null) { cookieVal += COOKIE_VERSION; }
   else { cookieVal += this[VERSION]; }
   for (var i = 1; i <= this.$numberOfData; i++)
   {
      if (this["RawData"+i] == null) { cookieVal += '&' + 1; }
      else { cookieVal += '&' + this["RawData"+i]; }
   }
   var lifetime = new Date((new Date()).getTime() + COOKIE_LIFETIME);
   this.$document.cookie = COOKIE_NAME + '=' + cookieVal +
                           '; domain=' + COOKIE_DOMAIN +
                           '; expires=' + lifetime.toGMTString() +
                           '; path=/';
} // _Cookie_store()
function _Cookie_load()
{
   var allCookies = this.$document.cookie;
   if (allCookies == "")
      return false;
   var start = allCookies.indexOf(COOKIE_NAME + '=');
   if (start == -1)
      return false;
   start += COOKIE_NAME.length + 1;
   var end = allCookies.indexOf(';', start);
   if (end == -1)
      end = allCookies.length;
   var cookieVal = allCookies.substring(start, end);
   var detectArray = cookieVal.split('&');
   var length = detectArray.length;
   if (length <= 1)
      return false;
   var a = detectArray[0].split('.');
   if (a == null)
      return false;
   this[VERSION] = detectArray[0];
   for (var i = 1; i < length; i++)
      this["RawData"+i]  = detectArray[i];
   this.$numberOfData = length - 1;
   return true;
} // _Cookie_load()
function _Cookie_reset()
{
   var cookieVal = "";
   if (this[VERSION] == null)
   {
      this[VERSION] = COOKIE_VERSION;
      cookieVal += COOKIE_VERSION;
   }
   else { cookieVal += this[VERSION]; }
   for (var i = 1; i <= this.$numberOfData; i++)
   {
     this["RawData"+i] = 1;
     cookieVal += '&' + 1;
   }
   var lifetime = new Date((new Date()).getTime() + COOKIE_LIFETIME);
   this.$document.cookie = COOKIE_NAME + '=' + cookieVal +
                           '; domain=' + COOKIE_DOMAIN +
                           '; expires=' + lifetime.toGMTString() +
                           '; path=/';
} // _Cookie_reset()
function _Cookie_remove()
{
   this.$document.cookie = COOKIE_NAME + '=' +
                           '; domain=' + COOKIE_DOMAIN +
                           '; expires=Fri, 02-Jan-1970 00:00:00 GMT' +
                           '; path=/';
} // _Cookie_remove()
function _cookie_set_validity()
{
   var bits = this._calcValidity();
   var n = 8;
   var pos = 8;
   var value = 1;
   if (this["RawData1"] != null)
      value = this["RawData1"];
   this["RawData1"] = (value & ((~0 << (pos+1)) | (Math.pow(2,(pos+1-n))-1))) |
                      (bits << (pos+1-n));
} // _cookie_set_validity()
function _cookie_calc_validity()
{
   var numGroups = ((30 * this.$numberOfData) / 8) - 1;
   var pos, n;
   n = 8;
   pos = 16;
   var index = 1;
   var value = 1;
   if (this["RawData"+index] != null)
      value = this["RawData"+index];
   var result = (value >> (pos + 1 - n)) & ~(~0 << n);
   var start = 17;  // Starts with the second group (bits 17 - 24)
   for (var i = 1; i < numGroups; i++)
   {
      pos = start + 7;
      var bits = 0;
      if (pos < 31)
      {
         n = 8;
         bits = (value >> (pos + 1 - n)) & ~(~0 << n);
      }
      else // need to get bits from the next long
      {
         n = 31 - start;
         pos = 30;
         bits = (value >> (pos + 1 - n)) & ~(~0 << n);
         bits = bits << n;
         index++;
         if (index <= this.$numberOfData)
         {
            if (this["RawData"+index] != null)
               value = this["RawData"+index];
            else
               value = 1;
         }
         else
         {
            value = 0;
         }
         n = 8 - n;
         pos = n;
         var nextBits = (value >> (pos + 1 - n)) & ~(~0 << n);
         bits = (bits & ((~0 << pos) | (Math.pow(2, (pos-n)) - 1))) |
                (nextBits << (pos-n));
      }
      result = result ^ bits;
      start = pos + 1;
   }
   return result;
} // _cookie_calc_validity()
new Cookie();
Cookie.prototype.isValid       = _Cookie_is_valid;
Cookie.prototype.store         = _Cookie_store;
Cookie.prototype.load          = _Cookie_load;
Cookie.prototype.reset         = _Cookie_reset;
Cookie.prototype.remove        = _Cookie_remove;
Cookie.prototype._setValidity  = _cookie_set_validity;
Cookie.prototype._calcValidity = _cookie_calc_validity;
function _getBits(cookie, pos, n)
{
   return (cookie >> (pos + 1 - n)) & ~(~0 << n);
}
function _setBits(cookie, pos, n, value)
{
   return ( (cookie & ((~0 << (pos + 1)) | (Math.pow(2, (pos + 1 - n)) - 1))) |
            (value << (pos + 1 - n)) );
}
_5K_URL    = "http://sportsmed.starwave.com/ad/sponsors/utilities/detect/5k.htm";
_50K_URL   = "http://sportsmed.starwave.com/ad/sponsors/utilities/detect/50k.htm";
_500K_URL  = "http://sportsmed.starwave.com/ad/sponsors/utilities/detect/500k.htm";
_1000K_URL = "http://sportsmed.starwave.com/ad/sponsors/utilities/detect/1000k.htm";
UNDEFINED          = 0;  // X UNAVAILABLE
INVALID_SPEED_ERR  = -1; // Invalid speed (stored as INVALID_SPEED_CONSTANT in cookie)
LESS_THAN_14       = 4; // X<14.4k
BTWN_14_AND_56     = 5; // 14.4k<=X<56k
BTWN_56_AND_128    = 6; // 56K<=X<128k
BTWN_128_AND_384   = 7; // 128k<=X<384k
MORE_THAN_384      = 8; // 384k<=X
LESS_THAN_128      = 9; // X<=128k (used for conflicting situation)
function getBandwidth(force)
{
   INVALID_SPEED_CONSTANT = 1;  // Invalid speed error
   var cookie = new Cookie(document);
   if (cookie == null) { return UNDEFINED; }
   if (!cookie.load() || !cookie.isValid()) { cookie.reset(); }
   var cookieVal = cookie.RawData1;
   var bandwidth = UNDEFINED;
   if (force == false)
   {
      bandwidth = _getBits(cookieVal, 12, 4);
   }
   if (bandwidth == UNDEFINED)
   {
      bandwidth = _detectBandwidth();
      if (bandwidth == INVALID_SPEED_ERR) { bandwidth = INVALID_SPEED_CONSTANT; }
      cookieVal = _setBits(cookieVal, 12, 4, bandwidth);
      cookie.RawData1 = cookieVal;
      cookie.store();
   }
   if (bandwidth == INVALID_SPEED_CONSTANT) { return INVALID_SPEED_ERR; }
   return bandwidth;
}
function _detectBandwidth()
{
   SMALL_14_TIME  = 2.8;   // (5 * 8) kbits / 14.4 kbps
   SMALL_56_TIME  = 0.7;   // (5 * 8) kbits / 56 kbps
   BIG_56_TIME    = 7;     // (50 * 8) kbits / 56 kbps
   BIG_128_TIME   = 3.125; // (50 * 8) kbits / 128 kbps
   BIG_384_TIME   = 1.05;  // (50 * 8) kbits / 384 kbps
   var thisDate;
   var startTime, endTime;
   var childWindow;
   var maxX = screen.width + 1;
   var maxY = screen.height + 1;
   thisDate = new Date();
   startTime = thisDate.getTime();
   childWindow = window.open(_5K_URL,"5k_window","width=3,height=3,top="+maxY+",left="+maxX+",screenX="+maxX+",screenY="+maxY+",alwaysLowered");
   childWindow.blur();
   childWindow.onload = _dummy;
   childWindow.onload();
   childWindow.close();
   thisDate = new Date();	
   endTime = thisDate.getTime();
   totalTime = endTime - startTime;   
   downloadTime = totalTime/1000;
   if (downloadTime == 0)
   { return INVALID_SPEED_ERR; }
   if (downloadTime > SMALL_14_TIME)
   { return LESS_THAN_14; }
   else if (downloadTime <= SMALL_14_TIME && downloadTime > SMALL_56_TIME)
   { return BTWN_14_AND_56; }
   else
   {
      thisDate = new Date();
      startTime = thisDate.getTime();
      childWindow = window.open(_50K_URL,"50k_window","width=3,height=3,top="+maxY+",left="+maxX+",screenX="+maxX+",screenY="+maxY+",alwaysLowered");
      childWindow.blur();
      childWindow.onload = _dummy;
      childWindow.onload();
      childWindow.close();
      thisDate = new Date();
      endTime = thisDate.getTime();
      totalTime = endTime - startTime;
      downloadTime = totalTime/1000;
      if (downloadTime == 0)
         return INVALID_SPEED_ERR;
      if (downloadTime >= BIG_56_TIME)
      { return LESS_THAN_128; }
      if (downloadTime <= BIG_56_TIME && downloadTime > BIG_128_TIME)
      { return BTWN_56_AND_128; }
      else if (downloadTime <= BIG_128_TIME && downloadTime > BIG_384_TIME)
      { return BTWN_128_AND_384; }
      else
      { return MORE_THAN_384; }
   }
}
function _dummy()
{ return true; }
UNDEFINED = 15; // UNAVAILABLE (stored as UNDEFINED_CONSTANT in cookie)
function getTimeZone(force)
{
   UNDEFINED_CONSTANT = 0;  // Unavailable
   ZERO_HOUR_CONSTANT = 15; // Zero hour difference
   var cookie = new Cookie(document);
   if (cookie == null) { return UNDEFINED; }
   if (!cookie.load() || !cookie.isValid()) { cookie.reset(); }
   var cookieVal = cookie.RawData1;
   var timeZone = UNDEFINED_CONSTANT;
   if (force == false)
   {
      timeZone = _getBits(cookieVal, 17, 4);
   }
   if (timeZone != UNDEFINED_CONSTANT)
   {
      if (timeZone == ZERO_HOUR_CONSTANT) { timeZone = 0; }
      var bucket = _getBits(cookieVal, 19, 2);
      var decimal = 0;
      if (bucket == 1) { decimal = 25; }
      else if (bucket == 2) { decimal = 50; }
      else if (bucket == 3) { decimal = 75; }
      timeZone = ((timeZone * 100) + decimal) / 100;
      var sign = _getBits(cookieVal, 13, 1);
      if (sign == 1)
         timeZone *= -1;
      return timeZone;
   }
   else
   {
      timeZone = _detectTimeZone();
      if (timeZone < 0)
         cookieVal = _setBits(cookieVal, 13, 1, 1);
      else
         cookieVal = _setBits(cookieVal, 13, 1, 0);
      var hours = Math.abs(parseInt(timeZone));
      var decimal = (Math.abs(timeZone) * 100) - (hours * 100);
      var bucket = 0;
      if (decimal > 0 && decimal <=25) { bucket = 1; }
      else if (decimal > 25 && decimal <= 50) { bucket = 2; }
      else if (decimal > 50 && decimal <= 75) { bucket = 3; }
      else if (decimal > 75) { hours++; }
      cookieVal = _setBits(cookieVal, 19, 2, bucket);
      if (hours == 0) { hours = ZERO_HOUR_CONSTANT; }
      cookieVal = _setBits(cookieVal, 17, 4, hours);
      cookie.RawData1 = cookieVal;
      cookie.store();
      return timeZone;
   }
}
function _detectTimeZone()
{
   thisDate = new Date();	
   thisOffset = thisDate.getTimezoneOffset() / 60; // convert into hours
   return (-1 * thisOffset);
}
UNDEFINED = 0; // UNAVAILABLE
IE       = 4; // Internet Explorer
NETSCAPE = 5; // Netscape
OTHER    = 6; // Other
function getBrowserType(force)
{
   return _readBrowser(4, force);
}
function getBrowserVersion(force)
{
   return _readBrowser(8, force);
}
function _readBrowser(pos, force)
{
   var cookie = new Cookie(document);
   if (cookie == null) { return UNDEFINED; }
   if (!cookie.load() || !cookie.isValid()) { cookie.reset(); }
   var cookieVal = cookie.RawData2;
   var value = UNDEFINED;
   if (force == false)
   {
      if (pos == 4)
      {
         value = _getBits(cookieVal, pos, 4);
      }
      else
      {
         major = _getBits(cookieVal, pos, 4);
         minor = _getBits(cookieVal, pos+4, 4);
         value = parseFloat(major + "." + minor);
      }
   }
   if (value == UNDEFINED)
   {
      if (pos == 4)
      {
         value = _detectBrowserType();
         cookieVal = _setBits(cookieVal, pos, 4, value);
      }
      else
      {
         value = _detectBrowserVersion();
         version = value.toString();
         idx = version.indexOf(".");
         if (idx == -1)
         {
            major = parseInt(value);
            minor = 0;
         }
         else
         {
            major = parseInt(version);
            minor = parseInt(version.substring(idx+1, idx+2));
         }
         cookieVal = _setBits(cookieVal, pos, 4, major);
         cookieVal = _setBits(cookieVal, pos+4, 4, minor);
         value = parseFloat(major + "." + minor);
      }
      cookieVal = _setBits(cookieVal, pos, 4, value);
      cookie.RawData2 = cookieVal;
      cookie.store();
   }
   return value;
} // _readBrowser()
function _detectBrowserType()
{
   if (navigator.appName.indexOf("Netscape") != -1) { return NETSCAPE; }
   else if (navigator.appName.indexOf("Microsoft") != -1) { return IE; }
   else { return OTHER; }
}
function _detectBrowserVersion()
{
   if (navigator.appVersion.indexOf("MSIE") != -1)
   {
      appVersion = navigator.appVersion;
      subVersion = appVersion.substring(appVersion.indexOf("MSIE"));
      begin = subVersion.indexOf(" ") + 1;
      end = subVersion.indexOf(";");
      return parseFloat(subVersion.substring(begin, end));
   }
   else
   {
      return parseFloat(navigator.appVersion);
   }
}
UNDEFINED = 0;   // UNAVAILABLE
DATA_ERR  = -1;  // Data not available (stored as DATA_ERR_CONSTANT in cookie)
LESS_THAN_640      = 4;  // X < 640
BTWN_640_AND_800   = 5;  // 640 <= X < 800
BTWN_800_AND_1024  = 6;  // 800 <= X < 1024
BTWN_1024_AND_1280 = 7;  // 1024 <= X < 1280
BTWN_1280_AND_1600 = 8;  // 1280 <= X < 1600
GREATER_THAN_1600  = 9;  // X >= 1600
LESS_THAN_480     = 4;  // X < 480
BTWN_480_AND_600  = 5;  // 480 <= X < 600
BTWN_600_AND_768  = 6;  // 600 <= X < 768
BTWN_768_AND_864  = 7;  // 768 <= X < 864
BTWN_864_AND_1024 = 8;  // 864 <= X < 1024
GREATER_THAN_1024 = 9;  // X >= 1024
LESS_THAN_8     = 4;   // X < 8
BTWN_8_AND_11   = 5;   // 8 <= X < 12
BTWN_12_AND_15  = 6;   // 12 <= X < 16
BTWN_16_AND_19  = 7;   // 16 <= X < 20
BTWN_20_AND_23  = 8;   // 20 <= X < 24
BTWN_24_AND_31  = 9;   // 24 <= X < 32
GREATER_THAN_32 = 10;  // X >= 32
function getVerticalSize(force)
{
   return _readScreenDisp(force, 20);
}
function getHorizontalSize(force)
{
   return _readScreenDisp(force, 16);
}
function getColorDepth(force)
{
   return _readScreenDisp(force, 24);
}
function _readScreenDisp(force, pos)
{
   DATA_ERR_CONSTANT = 1;  // Data error error
   var cookie = new Cookie(document);
   if (cookie == null) { return UNDEFINED; }
   if (!cookie.load() || !cookie.isValid()) { cookie.reset(); }
   var cookieVal = cookie.RawData2;
   var value = UNDEFINED;
   if (force == false)
   {
      value = _getBits(cookieVal, pos, 4);
   }
   if (value == UNDEFINED)
   {
      if (pos == 16)
      {
         var width = screen.width;
         if (width == null) { value = DATA_ERR_CONSTANT; }
         else if (width < 640) { value = LESS_THAN_640; }
         else if (width >= 640 && width < 800) { value = BTWN_640_AND_800; }
         else if (width >= 800 && width < 1024) { value = BTWN_800_AND_1024; }
         else if (width >= 1024 && width < 1280) { value = BTWN_1024_AND_1280; }
         else if (width >= 1280 && width < 1600) { value = BTWN_1280_AND_1600; }
         else if (width >= 1600) { value = GREATER_THAN_1600; }
      }
      else if (pos == 20)
      {
         var height = screen.height;
         if (height == null) { value = DATA_ERR_CONSTANT; }
         else if (height < 480) { value = LESS_THAN_480; }
         else if (height >= 480 && height < 600) { value = BTWN_480_AND_600; }
         else if (height >= 600 && height < 768) { value = BTWN_600_AND_768; }
         else if (height >= 768 && height < 864) { value = BTWN_768_AND_864; }
         else if (height >= 864 && height < 1024) { value = BTWN_864_AND_1024; }
         else if (height >= 1024) { value = GREATER_THAN_1024; }
      }
      else if (pos == 24)
      {
         var depth = (navigator.appVersion.indexOf("MSIE") != -1) ? screen.colorDepth : screen.pixelDepth;
         if (depth == null) { value = DATA_ERR_CONSTANT; }
         else if (depth < 8) { value = LESS_THAN_8; }
         else if (depth >= 8 && depth < 12) { value = BTWN_8_AND_11; }
         else if (depth >= 12 && depth < 16) { value = BTWN_12_AND_15; }
         else if (depth >= 16 && depth < 20) { value = BTWN_16_AND_19; }
         else if (depth >= 20 && depth < 24) { value = BTWN_20_AND_23; }
         else if (depth >= 24 && depth < 32) { value = BTWN_24_AND_31; }
         else if (depth >= 32) { value = GREATER_THAN_32; }
      }
      cookieVal = _setBits(cookieVal, pos, 4, value);
      cookie.RawData2 = cookieVal;
      cookie.store();
   }
   if (value == DATA_ERR_CONSTANT) { return DATA_ERR; }
   return value;
} // _readScreenDisp()
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;	// true if we're on IE
var isWin = (navigator.appVersion.indexOf("Win") != -1) ? true : false; // true if we're on Windows
if (isIE && isWin)
{
   document.writeln('<scr' + 'ipt language="VBscript">');
   document.writeln('\'do a one-time test for a version of VBScript that can handle this code');
   document.writeln('detectableWithVB = False');
   document.writeln('If ScriptEngineMajorVersion >= 2 then');
   document.writeln('  detectableWithVB = True');
   document.writeln('End If');
   document.writeln('\'this next function will detect most plugins');
   document.writeln('Function detectActiveXControl(activeXControlName)');
   document.writeln('  on error resume next');
   document.writeln('  detectActiveXControl = False');
   document.writeln('  If detectableWithVB Then');
   document.writeln('     detectActiveXControl = IsObject(CreateObject(activeXControlName))');
   document.writeln('  End If');
   document.writeln('End Function');
   document.writeln('\'and the following function handles QuickTime');
   document.writeln('Function detectQuickTimeActiveXControl()');
   document.writeln('  on error resume next');
   document.writeln('  detectQuickTimeActiveXControl = False');
   document.writeln('  If detectableWithVB Then');
   document.writeln('    detectQuickTimeActiveXControl = False');
   document.writeln('    hasQuickTimeChecker = false');
   document.writeln('    Set hasQuickTimeChecker = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1")');
   document.writeln('    If IsObject(hasQuickTimeChecker) Then');
   document.writeln('      If hasQuickTimeChecker.IsQuickTimeAvailable(0) Then ');
   document.writeln('        detectQuickTimeActiveXControl = True');
   document.writeln('      End If');
   document.writeln('    End If');
   document.writeln('  End If');
   document.writeln('End Function');
   document.writeln('</scr' + 'ipt>');
}
FLASH_NOT_INSTALLED_WARN  = 31;
FLASH_IE_NOT_WINDOWS_WARN = 30;
FLASH_DETECTION_ERROR = 28;
function _detectFlash()
{
   var flashVersion = FLASH_NOT_INSTALLED_WARN;
   if (navigator.userAgent.indexOf("WebTV") != -1) { flashVersion = 3; }
   else
   {
      if (isIE)
      {
         if (isWin && detectableWithVB)
         {
            swf_obj  = detectActiveXControl("ShockwaveFlash.ShockwaveFlash.1");
            swf_obj3 = detectActiveXControl("ShockwaveFlash.ShockwaveFlash.3");
            swf_obj4 = detectActiveXControl("ShockwaveFlash.ShockwaveFlash.4");
            swf_obj5 = detectActiveXControl("ShockwaveFlash.ShockwaveFlash.5");
            if ((swf_obj == true) && (swf_obj3 != true)) { flashVersion = 2; }
            else if ((swf_obj3 == true) && (swf_obj4 != true)) { flashVersion = 3; }
            else if ((swf_obj4 == true) && (swf_obj5 != true)) { flashVersion = 4; }
            else if (swf_obj5 == true) { flashVersion = 5; }
         }
         else { flashVersion = FLASH_IE_NOT_WINDOWS_WARN; }
      }
      else
      {
         if (navigator.plugins)
         {
            if (navigator.plugins["Shockwave Flash 2.0"] || // is Flash 2 
                navigator.plugins["Shockwave Flash"]) // or Flash 3+ installed?
            {
               var isVersion2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
               var flashDescription = navigator.plugins["Shockwave Flash" + isVersion2].description;
               flashVersion = parseInt(flashDescription.charAt(flashDescription.indexOf(".") - 1));
            }
         }
         else { flashVersion = FLASH_DETECTION_ERROR; }
      }
   }
   return flashVersion;
}
UNDEFINED = 0; // Unavailable
function getFlash(force)
{
   var cookie = new Cookie(document);
   if (cookie == null) { return UNDEFINED; }
   if (!cookie.load() || !cookie.isValid()) { cookie.reset(); }
   var cookieVal = cookie.RawData3;
   var value = UNDEFINED;
   if (force == false)
   {
      value = _getBits(cookieVal, 5, 5);
   }
   if (value == UNDEFINED)
   {
      value = _detectFlash();
      cookieVal = _setBits(cookieVal, 5, 5, value);
      cookie.RawData3 = cookieVal;
      cookie.store();
   }
   return value;
} // _readFlash()
DCR_NOT_INSTALLED_WARN  = 31;
DCR_IE_NOT_WINDOWS_WARN = 30;
DCR_DETECTION_ERROR = 28;
function _detectDirector()
{
   var dcrVersion = DCR_NOT_INSTALLED_WARN;
   if (isIE)
   {
      if (isWin && detectableWithVB)
      {
         obj6 = detectActiveXControl("SWCtl.SWCtl.1");
         obj7 = detectActiveXControl("SWCtl.SWCtl.7");
         obj8 = detectActiveXControl("SWCtl.SWCtl.8");
         if ((obj6 == true) && (obj7 != true)) { dcrVersion = 6; }
         else if ((obj7 == true) && (obj8 != true)) { dcrVersion = 7; }
         else if (obj8 == true) { dcrVersion = 8; }
      }
      else { dcrVersion = DCR_IE_NOT_WINDOWS_WARN; }
   }
   else
   {
      if (navigator.plugins)
      {
         if (navigator.plugins["Shockwave for Director"])
         {
            var swDescription = navigator.plugins["Shockwave for Director"].description;
            dcrVersion = parseInt(swDescription.charAt(swDescription.indexOf(".") - 1));
         }
      }
      else { dcrVersion = DCR_DETECTION_ERROR; }
   }
   return dcrVersion;
}
UNDEFINED = 0; // Unavailable
function getDirector(force)
{
   var cookie = new Cookie(document);
   if (cookie == null) { return UNDEFINED; }
   if (!cookie.load() || !cookie.isValid()) { cookie.reset(); }
   var cookieVal = cookie.RawData3;
   var value = UNDEFINED;
   if (force == false)
   {
      value = _getBits(cookieVal, 10, 5);
   }
   if (value == UNDEFINED)
   {
      value = _detectDirector();
      cookieVal = _setBits(cookieVal, 10, 5, value);
      cookie.RawData3 = cookieVal;
      cookie.store();
   }
   return value;
} // _readDirector()
QUICKTIME_INSTALLED = 1;
QT_NOT_INSTALLED_WARN  = 31;
QT_IE_NOT_WINDOWS_WARN = 30;
QT_DETECTION_ERROR = 28;
function _detectQuickTime()
{
   var qtVersion = QT_NOT_INSTALLED_WARN;
   if (isIE)
   {
      if (isWin && detectableWithVB)
      {
         obj = detectQuickTimeActiveXControl();
         if (obj == true) { qtVersion = QUICKTIME_INSTALLED; }
      }
      else { qtVersion = QT_IE_NOT_WINDOWS_WARN; }
   }
   else
   {
      if (navigator.plugins)
      {
         for (var i = 0; i < navigator.plugins.length; i++)
         {
            if (navigator.plugins[i].name.indexOf("QuickTime") != -1)
            {
               var qtName = navigator.plugins[i].name;
               qtVersion = parseInt(qtName.charAt(qtName.indexOf(".") - 1));
               break;
            }
         }
      }
      else { qtVersion = QT_DETECTION_ERROR; }
   }
   return qtVersion;
}
UNDEFINED = 0; // unavailable
function getQuickTime(force)
{
   var cookie = new Cookie(document);
   if (cookie == null) { return UNDEFINED; }
   if (!cookie.load() || !cookie.isValid()) { cookie.reset(); }
   var cookieVal = cookie.RawData3;
   var value = UNDEFINED;
   if (force == false)
   {
      value = _getBits(cookieVal, 15, 5);
   }
   if (value == UNDEFINED)
   {
      value = _detectQuickTime();
      cookieVal = _setBits(cookieVal, 15, 5, value);
      cookie.RawData3 = cookieVal;
      cookie.store();
   }
   return value;
} // _readQuickTime()
REAL_NOT_INSTALLED_WARN  = 31;
REAL_IE_NOT_WINDOWS_WARN = 30;
REAL_DETECTION_ERROR = 28;
REAL_PLAYER    = 1;
REAL_PLAYER_G2 = 2;
function _detectReal()
{
   var realVersion = REAL_NOT_INSTALLED_WARN;
   if (isIE)
   {
      if (isWin && detectableWithVB)
      {
         objRealVideo  = detectActiveXControl("RealVideo.RealVideo(tm) ActiveX Control (32-bit)");
         objRealPlayer = detectActiveXControl("RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)");
         objG2         = detectActiveXControl("rmocx.RealPlayer G2 Control.1");
         if ((objRealVideo == true || objRealPlayer == true) && (objG2 != true)) { realVersion = REAL_PLAYER; }
         else if (objG2 == true) { realVersion = REAL_PLAYER_G2; }
      }
      else { realVersion = REAL_IE_NOT_WINDOWS_WARN; }
   }
   else
   {
      if (navigator.plugins)
      {
         for (var i = 0; i < navigator.plugins.length; i++)
         {
            if ((navigator.plugins[i].name.indexOf("RealPlayer")) != -1)
            {
               if (navigator.userAgent.indexOf("PPC") != -1)
               {
                  if ((navigator.plugins[i].filename.indexOf("G2")) != -1)
                  {
                     realVersion = REAL_PLAYER_G2;
                  }
                  else
                  {
                     realVersion = REAL_PLAYER;
                  }
               }
               else
               {
                  if ((navigator.plugins[i].name.indexOf("G2")) != -1)
                  {
                     realVersion = REAL_PLAYER_G2;
                  }
                  else
                  {
                     realVersion = REAL_PLAYER;
                  }
               }
               break;
            }
	 }
      }
      else { realVersion = REAL_DETECTION_ERROR; }
   }
   return realVersion;
}
UNDEFINED = 0; // Unavailable
function getReal(force)
{
   var cookie = new Cookie(document);
   if (cookie == null) { return UNDEFINED; }
   if (!cookie.load() || !cookie.isValid()) { cookie.reset(); }
   var cookieVal = cookie.RawData3;
   var value = UNDEFINED;
   if (force == false)
   {
      value = _getBits(cookieVal, 20, 5);
   }
   if (value == UNDEFINED)
   {
      value = _detectReal();
      cookieVal = _setBits(cookieVal, 20, 5, value);
      cookie.RawData3 = cookieVal;
      cookie.store();
   }
   return value;
} // _readReal()
ACROBAT_READER_INSTALLED = 1;
AR_NOT_INSTALLED_WARN  = 31;
AR_IE_NOT_WINDOWS_WARN = 30;
AR_DETECTION_ERROR = 28;
function _detectReader()
{
   var arValue = AR_NOT_INSTALLED_WARN;
   if (isIE)
   {
      if (isWin && detectableWithVB)
      {
         obj = detectActiveXControl("PDF.PdfCtrl.1");
         if (obj == true) { arValue = ACROBAT_READER_INSTALLED; }
      }
      else { arValue = AR_IE_NOT_WINDOWS_WARN; }
   }
   else
   {
      if (navigator.plugins)
      {
         for (var i = 0; i < navigator.plugins.length; i++)
         {
            if (navigator.plugins[i].name.indexOf("Acrobat") != -1)
            {
               arValue = ACROBAT_READER_INSTALLED;
               break;
            }
         }
      }
      else { arValue = AR_DETECTION_ERROR; }
   }
   return arValue;
}
UNDEFINED = 0; // unavailable
function getAcrobatReader(force)
{
   var cookie = new Cookie(document);
   if (cookie == null) { return UNDEFINED; }
   if (!cookie.load() || !cookie.isValid()) { cookie.reset(); }
   var cookieVal = cookie.RawData3;
   var value = UNDEFINED;
   if (force == false)
   {
      value = _getBits(cookieVal, 25, 5);
   }
   if (value == UNDEFINED)
   {
      value = _detectReader();
      cookieVal = _setBits(cookieVal, 25, 5, value);
      cookie.RawData3 = cookieVal;
      cookie.store();
   }
   return value;
} // _readReader()
function getAll(force)
{
   //bw = getBandwidth(force);
   tz = getTimeZone(force);
   bt = getBrowserType(force);
   bv = getBrowserVersion(force);
   vs = getVerticalSize(force);
   hs = getHorizontalSize(force);
   cd = getColorDepth(force);
   //sf = getFlash(force);
   //sd = getDirector(force);
   //qt = getQuickTime(force);
} // getAll()
