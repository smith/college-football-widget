  var ES_submit_loc = '';
  var ES_top = '244px';
  var ES_left = '14px';
  var ES_width = '362px';
  var ES_rowID = 0;
  var ES_lastSearch='';
  var ES_rowCount;
  var ES_xmlHttpRequest;
  var ES_lastSearchKeyPress = 0;
  var ES_timerId = 0;
  var ES_hidden = true;
  var ES_isIE = false;
  var ES_appName = navigator.appName;
  var ES_userAgent = navigator.userAgent;
  var sf = ES_userAgent.indexOf('Safari');
  var sp = ES_userAgent.indexOf('Opera');  
  var showFull = true;
  if (((sf != null) && (sf > -1)) || ((sp != null) && (sp > -1)))
  {
  	showFull = false;  
  }  
  var ES_espnNavDiv = null;
  var ES_espnNavDivChild = null;
  var ES_searchStr = null;
  if(ES_appName && ES_appName.indexOf('Explorer') != -1) { ES_isIE = true; } else { ES_isIE = false; }
  var ES_hasGetElementById = 0;
  if(document.getElementById) { ES_hasGetElementById = 1;}
  var ES_hasDocumentAll = document.all;
  
  function ES_getElementById(id) {
    if(ES_hasGetElementById) return document.getElementById(id);
    if(ES_hasDocumentAll) return document.all[id];
  }
  function ES_showBox(elem) {
    if (showFull)
    {
	    if(!ES_searchStr) { ES_searchStr = ES_getElementById('searchStr'); }
	    if(!elem) {
	      if(!ES_espnNavDiv) { ES_espnNavDiv = ES_getElementById('espnNavDiv'); }
	      if(!ES_espnNavDivChild) { ES_espnNavDivChild = ES_getElementById('espnNavDivChild'); }
	      ES_espnNavDivChild.style.top = '50px';
	      elem = ES_espnNavDiv;
	    }
	    if(elem.scrollTop) { elem.scrollTop = 0; }
	    elem.style.display = 'block';
	    elem.style.visibility = 'visible';
    ES_hidden = false;
    }
  }
  function ES_hideBox(elem) {
    if(!elem) {
      if(!ES_espnNavDiv) { ES_espnNavDiv = ES_getElementById('espnNavDiv'); }
      elem = ES_espnNavDiv;
    }
    elem.style.display = 'none';
    elem.style.visibility = 'hidden';
    ES_hidden = true;
  }
  function ES_resultHiEvent(event) {
    var target = null;
    var parentTarget = null;
    var nameTarget = null;
    var typeTarget = null;

    if(!event) { target = window.event.srcElement; } else { target = event.target; }
    if(target != null) {
      var id = target.id;

      var parentId = id;
      var nameId = id + 'name';
      var typeId = id + 'type';

      var indexOfName = id.indexOf('name');
      if(indexOfName != -1) {
        nameId = id;
        parentId = id.substring(0, indexOfName);
        typeId = parentId + 'type';

        nameTarget = target;
        parentTarget = ES_getElementById(parentId);
        typeTarget = ES_getElementById(typeId);

      } else {
        var indexOfType = id.indexOf('type');
        if(indexOfType != -1) {
          typeId = id;
          parentId = id.substring(0, indexOfType);
          nameId = parentId + 'name';

          typeTarget = target;
          parentTarget = ES_getElementById(parentId);
          nameTarget = ES_getElementById(nameId);
        } else {
          parentTarget = target;
          typeTarget = ES_getElementById(typeId);
          nameTarget = ES_getElementById(nameId);
        }
      }
      if(parentTarget != null) {
        ES_resultHi(parentTarget);
        ES_resultHi(nameTarget);
      }
    }
  }
  function ES_resultLoEvent(event) {
    var target = null;
    var parentTarget = null;
    var nameTarget = null;
    var typeTarget = null;

    if(!event) { target = window.event.srcElement; } else { target = event.target; }
    if(target != null) {
      var id = target.id;

      var parentId = id;
      var nameId = id + 'name';
      var typeId = id + 'type';

      var indexOfName = id.indexOf('name');
      if(indexOfName != -1) {
        nameId = id;
        parentId = id.substring(0, indexOfName);
        typeId = parentId + 'type';

        nameTarget = target;
        parentTarget = ES_getElementById(parentId);
        typeTarget = ES_getElementById(typeId);

      } else {
        var indexOfType = id.indexOf('type');
        if(indexOfType != -1) {
          typeId = id;
          parentId = id.substring(0, indexOfType);
          nameId = parentId + 'name';

          typeTarget = target;
          parentTarget = ES_getElementById(parentId);
          nameTarget = ES_getElementById(nameId);

        } else {
          parentTarget = target;
          typeTarget = ES_getElementById(typeId);
          nameTarget = ES_getElementById(nameId);
        }
      }

      if(parentTarget != null) {
        ES_resultLo(parentTarget);
        ES_resultLo(nameTarget);
      }
    }
  }
  function ES_resultHi(elem) {
    if(elem) {
      elem.style.zIndex = '8000';
      id = elem.id;
      elem.style.cursor = 'pointer';
      elem.style.backgroundColor = '#FFFFFF';
    if(elem.className == 'ES_result') { elem.style.color = '#000'; } else {
      elem.style.color = '#F00';
      elem.style.textDecoration = 'underline';
    }
    var newRowID = id.substr(9).replace(/[^\d]/g,'');
    ES_rowID = newRowID;
    }
  }
  function ES_resultLo(elem) {
    if(elem) {
      elem.style.zIndex = '8000';
      id = elem.id;
      elem.style.cursor = 'default';
      elem.style.backgroundColor = '#F5F5F5';
      elem.style.color = '#555';
      elem.style.textDecoration = 'none';
      var newRowID = id.substr(9).replace(/[^\d]/g,'');

      ES_rowID = newRowID;
    }
  }
  function ES_suggestEvent(event) {
    if(!event) { event = window.event; }
    elem = event.target;
    if(!elem) { elem = event.srcElement; }
      var anchorIndex = elem.id.indexOf('anchor');
    if(anchorIndex != -1) {
      elem = ES_getElementById(elem.id.substring(0, anchorIndex));
    } else {
      var nameIndex = elem.id.indexOf('name');
      if(nameIndex != -1) {
        elem = ES_getElementById(elem.id.substring(0, nameIndex));
      } else {
        var typeIndex = elem.id.indexOf('type');
        if(typeIndex != -1) { elem = ES_getElementById(elem.id.substring(0, typeIndex)); }
      }
    }
    ES_suggest(elem);
  }
  function ES_suggest(elem) {
    id = elem.id;
    if(elem.childNodes[0].innerHTML) {
      term = elem.childNodes[0].childNodes[0].href;
    } else if(elem.childNodes[1]) {
      term = elem.childNodes[1].childNodes[0].href;
    }
    document.location = term;
  }
  function ES_setRowCount(r) { window.ES_rowCount = r; }
  function ES_checkKeycode(e) {
    var keycode;
    var eventObj = e;
    if(window.event) {
      eventObj = window.event;
      keycode = window.event.keyCode;
    } else if(e) {
      keycode = e.which;
    }
    if(!ES_espnNavDiv) { ES_espnNavDiv = ES_getElementById('espnNavDiv'); }
    elem = ES_espnNavDiv;

    if(ES_hidden == false) {
      if(keycode == 8) {
        if(!ES_searchStr) { ES_searchStr = ES_getElementById('searchStr'); }
        var searchStrLen = ES_searchStr.value.length;
        if(searchStrLen > 3) { ES_searchKeyPress(searchStrLen); } else { ES_searchClear(); }
      } else if(keycode == 40) {
        advance();
        return false;
      } else if(keycode == 38) {
        reverse();
        return false;
      } else if(keycode == 13) {
        return ES_submitSearchForm(ES_searchStr.form);
      } else if(keycode == 27) {
        var searchStr = ES_searchStr.value;
        if(searchStr.length < 2) { ES_searchClear(); }
      }
    }
    return true;
  }
  function ES_submitSearchForm(form) {
    if(ES_rowID) {
          var hiDiv = ES_getElementById('es_result'+ES_rowID);
          if(hiDiv) {
            var divAnchors = hiDiv.getElementsByTagName('A');
            if(divAnchors && divAnchors.length > 0) {
              var newSearchStr = divAnchors[0].innerHTML;
              if(divAnchors[0].name != null && divAnchors[0].name != '') {
                newSearchStr = divAnchors[0].name + ' ' + divAnchors[0].innerHTML;
              }
              ES_submit_loc = divAnchors[0].href;
            }
          }
    }
    if(ES_submit_loc && ES_submit_loc != '') {
      document.location = ES_submit_loc;
      return false;
    } 
    return true;
  }
  function advance() {
    var id;
    if(ES_rowID < window.ES_rowCount) {
      id = 'es_result'+ES_rowID;
      ES_resultLo(ES_getElementById(id));

      ES_rowID ++;
      id = 'es_result'+ES_rowID;
      ES_resultHi(ES_getElementById(id));
      if(ES_rowID > 10) { ES_espnNavDiv.scrollTop = ES_espnNavDiv.scrollTop + 21; }
    }

  }
  function reverse() {
    var id;
    if(ES_rowID > 1) {
      id = 'es_result'+ES_rowID;
      ES_resultLo(ES_getElementById(id));
      ES_rowID --;
      id = 'es_result'+ES_rowID;
      ES_resultHi(ES_getElementById(id));
      if(ES_rowID <= 11) { ES_espnNavDiv.scrollTop = 0; }
    }
  }
  function buildNewSearchRow(index, ind, link, linkText, extra, desc) { 
    var div = document.createElement('div');
    var rowId = 'es_result' + (index + 1);

    div.id = rowId;

    div.onclick=ES_suggestEvent;
    div.onmouseover=ES_resultHiEvent;
    div.onmouseout=ES_resultLoEvent;

    div.style.position = 'relative';
    div.style.borderBottom = '1px solid #E4E4E4';
    div.style.height = '15px';


    if(ind != null) { div.style.marginLeft = '20px'; }
    var nameDiv = document.createElement('div');
    nameDiv.id = rowId + 'name';
    nameDiv.onmousedown=ES_suggestEvent;
    nameDiv.onclick=ES_suggestEvent;
    nameDiv.onmouseover=ES_resultHiEvent;
    nameDiv.onmouseout=ES_resultLoEvent;

    nameDiv.style.position = 'absolute';
    nameDiv.style.fontFamily = 'Verdana, sans serif';
    nameDiv.style.fontSize = '9pt';

    var anchor = document.createElement('a');
    anchor.id = rowId + 'anchor';
    anchor.onmousedown=ES_suggestEvent;
    anchor.style.textDecoration = 'none';
    anchor.style.color = '#555';
    anchor.href = link;
    if(extra != null) { anchor.name = extra; }
    anchor.appendChild(document.createTextNode(linkText));
    nameDiv.appendChild(anchor);
    var typeDiv = document.createElement('div');
    typeDiv.id = rowId + 'type';
    typeDiv.onclick=ES_suggestEvent;
    typeDiv.onmousedown=ES_suggestEvent;
    typeDiv.onmouseover=ES_resultHiEvent;
    typeDiv.onmouseout=ES_resultLoEvent;

    typeDiv.style.position = 'relative';
    typeDiv.style.verticalAlign = 'bottom';
    typeDiv.style.textAlign = 'right';
    typeDiv.style.fontFamily = 'Verdana, sans serif';
    typeDiv.style.fontSize = '8pt';
    typeDiv.style.color = '#888'


    if(desc) { typeDiv.appendChild(document.createTextNode(desc)); }
    div.appendChild(nameDiv);
    div.appendChild(typeDiv);
    return div;
  }
  function suggestSearchXML(url) {
    /* if( ES_isIE == true ) { url = 'http://espn.go.com' + url; } */
    if(window.XMLHttpRequest) {
      ES_xmlHttpRequest = new XMLHttpRequest();
      ES_xmlHttpRequest.onreadystatechange = processReqChange;
      ES_xmlHttpRequest.open('GET', url, true);
      ES_xmlHttpRequest.send(null);
    } else if(window.ActiveXObject) {
      ES_xmlHttpRequest = new ActiveXObject('Microsoft.XMLHTTP');
      if(ES_xmlHttpRequest) {
        ES_xmlHttpRequest.onreadystatechange = processReqChange;
        ES_xmlHttpRequest.open('GET', url, true);
        ES_xmlHttpRequest.send();
      }
    }
  }
  function processReqChange() {
    if (ES_xmlHttpRequest != null) {
      if(ES_xmlHttpRequest.readyState == 4) {
         if(ES_xmlHttpRequest.status == 200) {
           ES_rowCount = 0;
           ES_rowID = 0;
           var numParsed = parseSuggestXML(ES_xmlHttpRequest.responseXML.documentElement,
           ES_xmlHttpRequest.responseText);
          if(numParsed && numParsed > 0) { ES_showBox(ES_espnNavDiv); }
        } else {
        }
      }
    }
  }
  function parseSuggestXML(xmlDoc, xml) {
    var numberSuggested = 0;
    if(!ES_searchStr) { ES_searchStr = ES_getElementById('searchStr'); }
    var currentSearchStr = ES_searchStr.value;

    var temp = xmlDoc.getElementsByTagName('searchStr');
    if(temp.length > 0 && temp[0].firstChild != null) {

      var searchStr = temp[0].firstChild.data;

      if(currentSearchStr.indexOf(searchStr) != -1) {
        var time = xmlDoc.getElementsByTagName('time')[0].firstChild.data;
        numberSuggested = xmlDoc.getElementsByTagName('count')[0].firstChild.data;
        var results = xmlDoc.getElementsByTagName('result');
        ES_setRowCount(results.length);

        var resultsStr = '';

        if(!ES_espnNavDivChild) { ES_espnNavDivChild = ES_getElementById('espnNavDivChild'); }
        if(!ES_espnNavDiv) { ES_espnNavDiv = ES_getElementById('espnNavDiv'); }
        var currentSearchObj = ES_espnNavDiv;
            
        currentSearchObj.style.position = 'absolute';
        currentSearchObj.style.top = ES_top; //'105px';
        currentSearchObj.style.left = ES_left; //'8px';
        currentSearchObj.style.width = ES_width; //'404px';
        currentSearchObj.style.border = '1px solid #CCC';
        currentSearchObj.style.backgroundColor = '#F5F5F5';
        currentSearchObj.style.overflow = 'auto';
        if(currentSearchObj.style.overflowx){ currentSearchObj.style.overflowx = 'hidden'; }
        currentSearchObj.style.zIndex = '8000';
        ES_hideBox(ES_espnNavDiv);
  
        var clipHeight = 0;
        if(results.length < 10) {
          clipHeight = ((results.length*19) + 3);
        } else {
          clipHeight = ((10*19) + 3);
        }
        
        if (!showFull)
        {
          if (clipHeight > ((4*19) + 3))
          {
            clipHeight = (4*19) + 3;
          }
        }
        
        currentSearchObj.style.height = clipHeight + 'px';
        currentSearchObj = ES_espnNavDivChild;
        currentSearchObj.innerHTML = '';
        if(results != null) {
          var displayedCount = 0;
          var actualCount = 0;
          for (i = 0; i < results.length; i++) {
            var ind = results[i].getAttribute('indent');
            var linkTextNode = results[i].getElementsByTagName('linkText')[0];
            var linkTextExtra = linkTextNode.getAttribute('extra');
            var navLinkText = linkTextNode.firstChild.data;
            var navUrl = results[i].getElementsByTagName('url')[0].firstChild.data;
            var navDesc = '';
            var node = results[i].getElementsByTagName('desc');
            if(node != null && node.length > 0) { navDesc = node[0].firstChild.data; }
            
            currentSearchObj.appendChild(buildNewSearchRow(i, ind, navUrl, navLinkText, linkTextExtra, navDesc));

            actualCount = i + 1;
            if(!ind) { displayedCount = displayedCount + 1; }
            if(displayedCount >= 15) { break; }
          }

          if(displayedCount >= 15) {
            currentSearchObj.appendChild(buildNewSearchRow(actualCount, null, 'http://search.espn.go.com/keyword/search?page=abbreviated&searchString=' + currentSearchStr, 'More >>', null, null));
            ES_setRowCount(actualCount+1);
          }
          if(results.length > 0) { ES_showBox(ES_espnNavDiv); }
        }

      }
    } else {
      if(!ES_espnNavDivChild) { ES_espnNavDivChild = ES_getElementById('espnNavDivChild'); }
      ES_espnNavDivChild.innerHTML = '';
      ES_hideBox(ES_espnNavDiv);
    }

    return numberSuggested;
  }
  function ES_checkMousedown(event) {
    if(!event) {
      event = window.event;
      target = event.srcElement;
      relatedTarget = event.toElement;
         var targetId = null;
      if(target){ targetId = target.id; }
      if(!target || (targetId != 'espnNavDiv' && targetId != 'searchStr')) {
         if(targetId.indexOf('es_result') == -1) {
           ES_searchClear();
         }
      }
    }
    return event;
  }
  function ES_searchBlur(event) {
    if (showFull)
    {
      if(ES_isIE == false) { ES_searchClear(); }
    }
  }
  function ES_searchClear() {
    ES_hideBox(ES_espnNavDiv);
  }
  function ES_searchKeyPress(numChars) {
    if (showFull)
    {
    var now = new Date();
    var time = (now.getHours()*60*60*1000) +
           (now.getMinutes()*60*1000) +
           (now.getSeconds()*1000) +
           now.getMilliseconds();
    if(ES_lastSearchKeyPress > 0 && numChars > 1) {
      if(ES_timerId == 0) { ES_timerId = setTimeout('performSearch()', 350); } else {
        if((time - ES_lastSearchKeyPress) < 350) {
          clearTimeout(ES_timerId);
          ES_timerId = setTimeout('performSearch()', 350);
        }
      }
    }
    ES_lastSearchKeyPress = time;
    }
  }
  function trim(s) { return s.replace (/^\s+|\s+$/g,''); }
  function performSearch() {
    ES_timerId = 0;
    var searchStr = escape(trim(ES_getElementById('searchStr').value));
    if(ES_lastSearch != searchStr) {
      ES_lastSearch = searchStr;
      if(searchStr.length > 2) { suggestSearchXML('/keyword/espncmdXML?searchStr=' + searchStr); } else {
        if(searchStr.length == 0) { ES_searchClear(); }
      }
    }
  }

  document.onkeydown = ES_checkKeycode;
  document.onmousedown = ES_checkMousedown;

  ES_setRowCount(6);