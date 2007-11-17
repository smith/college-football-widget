function qas_errHandler() {
	return true;
}
window.onerror = qas_errHandler;

function qas_appendParam(n,v) {
	var w = window;
	if (v && !(v === 'undefined')) w.srcUrl += ('&' + n + '=' + v);
}

function qas_appendAttr(n,v) {
	var w = window;
	if (v && !(v === 'undefined')) w.wFrmStr += (' ' + n + '="' + v + '"');
}

function qas_writeAdIFrame() {
	var w = window;
	var jspServ = w.adsonar_jv;
	var jspServProtocol = 'http://';
	if ( w.adsonar_ssl && (w.adsonar_ssl == true) ) {
		jspServProtocol = 'https://';
	}
	w.srcUrl = jspServProtocol + jspServ +'/adserving/getAds.jsp?';
	w.wFrmStr = '';
	var wrand = Math.round(Math.random() * 1000000);
	qas_appendAttr('name',('adsonar_serve' + wrand));
	qas_appendAttr('id',('adsonar_serve' + wrand));
	qas_appendAttr('scrolling','no');
	qas_appendAttr('frameborder','0');
	qas_appendAttr('marginwidth','0');
	qas_appendAttr('marginheight','0');
	qas_appendAttr('vspace','0');
	qas_appendAttr('hspace','0');
	qas_appendAttr('width',w.adsonar_zw);
	qas_appendAttr('height',w.adsonar_zh);
	qas_passParams();
	qas_appendAttr('src',w.srcUrl);
	w.adsonar_placementId = null;
	w.adsonar_pid = null;
	w.adsonar_ps = null;
	w.adsonar_zw = null;
	w.adsonar_zh = null;
	w.adsonar_jv = null;
	w.adsonar_topicid = null;
	w.wFrmStr = '<ifr' + 'ame' + w.wFrmStr + '>' + '</ifr' + 'ame>';
	document.write(w.wFrmStr);
}

function qas_writeAdPopup(popType) {
	var w = window;
	var jspServ = w.adsonar_jv;
	var jspServProtocol = 'http://';
	if ( w.adsonar_ssl && (w.adsonar_ssl == true) ) {
		jspServProtocol = 'https://';
	}
	w.srcUrl = jspServProtocol + jspServ +'/adserving/getAds.jsp?';
	w.wFrmStr = '';
	qas_passParams();
	qas_appendParam('url',escape(w.location.href));
	var sWidth = screen.availWidth;
	var sHeight = screen.availHeight;
	var wLeftPos = (sWidth - w.adsonar_zw)/2;
	var wTopPos = (sHeight - w.adsonar_zh)/2;
	var wURL = w.srcUrl;
	var wName = 'adSonarPopup_' + w.adsonar_pid + '_' + w.adsonar_ps;
	var wParams = '';
	if ((popType == 2) || (popType == 4)) {
		wParams = 'LEFT=' + (wLeftPos - 25) + ',TOP=' + (wTopPos - 100) + ',WIDTH=' + (w.adsonar_zw + 50) + ',HEIGHT=' + (w.adsonar_zh + 200);
		wParams += ',directories,location,menubar,resizable,scrollbars,status,titlebar,toolbar';
	} else {
		wParams = 'LEFT=' + wLeftPos + ',TOP=' + wTopPos + ',WIDTH=' + w.adsonar_zw + ',HEIGHT=' + w.adsonar_zh;
	}
	var newPopupWin = window.open(wURL, wName, wParams);
	if ((popType == 3) || (popType == 4)) {
		if (newPopupWin) {
			newPopupWin.blur();
			newPopupWin.opener.focus();
		}
	} else {
		if (newPopupWin) newPopupWin.focus();
	}
}

function qas_passParams() {
	var w = window;
	qas_appendParam('placementId',w.adsonar_placementId);
	qas_appendParam('pid',w.adsonar_pid);
	qas_appendParam('ps',w.adsonar_ps);
	qas_appendParam('kc',escape(w.adsonar_kc));
	qas_appendParam('gw',w.adsonar_gw);
	qas_appendParam('gh',w.adsonar_gh);
	qas_appendParam('zw',w.adsonar_zw);
	qas_appendParam('zh',w.adsonar_zh);
	qas_appendParam('tc',escape(w.adsonar_tc));
	qas_appendParam('bc',escape(w.adsonar_bc));
	qas_appendParam('uc',escape(w.adsonar_uc));
	qas_appendParam('tl',w.adsonar_tl);
	qas_appendParam('ul',w.adsonar_ul);
	qas_appendParam('ts',w.adsonar_ts);
	qas_appendParam('bs',w.adsonar_bs);
	qas_appendParam('us',w.adsonar_us);
	qas_appendParam('tm',w.adsonar_tm);
	qas_appendParam('xb',w.adsonar_xb);
	qas_appendParam('xbc',escape(w.adsonar_xbc));
	qas_appendParam('xp',w.adsonar_xp);
	qas_appendParam('xpc',escape(w.adsonar_xpc));
	qas_appendParam('pb',w.adsonar_pb);
	qas_appendParam('pbc',escape(w.adsonar_pbc));
	qas_appendParam('ib',w.adsonar_ib);
	qas_appendParam('ibc',escape(w.adsonar_ibc));
	qas_appendParam('dbg',w.adsonar_dbg);
	qas_appendParam('fr',w.adsonar_fr);
	qas_appendParam('tp',w.adsonar_tp);
	qas_appendParam('zip',escape(w.adsonar_zip));
	qas_appendParam('topic',escape(w.adsonar_topic));
	qas_appendParam('tcu',escape(w.adsonar_tcu));
	qas_appendParam('topicid',w.adsonar_topicid);
	qas_appendParam('ssl',escape(w.adsonar_ssl));
	var u = w.adsonar_rfu;
	if ((!(u && !(u === 'undefined'))) || (u == '')) {
		u = document.referrer;
		if (window.top.location == document.location)
			u = document.location;
	}
	qas_appendParam('url',escape(u));
	qas_appendParam('v','5');
}

function qas_writeAd() {
	var w = window;
	var adType = '';
	if (w.adsonar_tp && !(w.adsonar_tp === 'undefined'))
		adType = w.adsonar_tp;
	switch (adType) {
		case 'up':
			qas_writeAdPopup(1); // standard popup
			break;
		case 'upx':
			qas_writeAdPopup(2); // standard popup +
			break;
		case 'un':
			qas_writeAdPopup(3); // standard popunder
			break;
		case 'unx':
			qas_writeAdPopup(4); // standard popunder +
			break;
		default:
			qas_writeAdIFrame();
	}
}

function qas_rDir(fa,ft) {
	var fx = document.qas_frm;
	fx.action = fa;
	fx.target = ft;
	fx.submit();
}

function qas_cfrm() {
	if (!document.qas_frm) {
		document.write('<form id="qas_frm" name="qas_frm" method="get" action="" target=""><input type="hidden" name="ie52_mac_only" value=""></form>');
	}
}

qas_cfrm();
qas_writeAd();

