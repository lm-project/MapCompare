var BMapLib = window.BMapLib = BMapLib || {};
(function() {
	var baidu = baidu || {
		guid: "$BAIDU$"
	};
	(function() {
		window[baidu.guid] = {};
		baidu.extend = function(target, source) {
			for (var p in source) {
				if (source.hasOwnProperty(p)) {
					target[p] = source[p];
				}
			}
			return target;
		};
		baidu.lang = baidu.lang || {};
		baidu.lang.guid = function() {
			return "TANGRAM__" + (window[baidu.guid]._counter++).toString(36);
		};
		window[baidu.guid]._counter = window[baidu.guid]._counter || 1;
		window[baidu.guid]._instances = window[baidu.guid]._instances || {};
		baidu.lang.Class = function(guid) {
			this.guid = guid || baidu.lang.guid();
			window[baidu.guid]._instances[this.guid] = this
		};
		window[baidu.guid]._instances = window[baidu.guid]._instances || {};
		baidu.lang.isString = function(source) {
			return "[object String]" == Object.prototype.toString.call(source)
		};
		baidu.lang.isFunction = function(source) {
			return "[object Function]" == Object.prototype.toString.call(source)
		};
		baidu.lang.Class.prototype.toString = function() {
			return "[object " + (this._className || "Object") + "]"
		};
		baidu.lang.Event = function(type, target) {
			this.type = type;
			this.returnValue = true;
			this.target = target || null;
			this.currentTarget = null
		};
		baidu.lang.Class.prototype.addEventListener = function(type, handler, key) {
			if (!baidu.lang.isFunction(handler)) {
				return
			}!this.__listeners && (this.__listeners = {});
			var t = this.__listeners,
				id;
			if (typeof key == "string" && key) {
				if (/[^\w\-]/.test(key)) {
					throw ("nonstandard key:" + key)
				} else {
					handler.hashCode = key;
					id = key
				}
			}
			type.indexOf("on") != 0 && (type = "on" + type);
			typeof t[type] != "object" && (t[type] = {});
			id = id || baidu.lang.guid();
			handler.hashCode = id;
			t[type][id] = handler
		};
		baidu.lang.Class.prototype.removeEventListener = function(type, handler) {
			if (baidu.lang.isFunction(handler)) {
				handler = handler.hashCode
			} else {
				if (!baidu.lang.isString(handler)) {
					return
				}
			}!this.__listeners && (this.__listeners = {});
			type.indexOf("on") != 0 && (type = "on" + type);
			var t = this.__listeners;
			if (!t[type]) {
				return
			}
			t[type][handler] && delete t[type][handler]
		};
		baidu.lang.Class.prototype.dispatchEvent = function(event, options) {
			if (baidu.lang.isString(event)) {
				event = new baidu.lang.Event(event)
			}!this.__listeners && (this.__listeners = {});
			options = options || {};
			for (var i in options) {
				event[i] = options[i]
			}
			var i, t = this.__listeners,
				p = event.type;
			event.target = event.target || this;
			event.currentTarget = this;
			p.indexOf("on") != 0 && (p = "on" + p);
			baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);
			if (typeof t[p] == "object") {
				for (i in t[p]) {
					t[p][i].apply(this, arguments)
				}
			}
			return event.returnValue
		};
		baidu.lang.inherits = function(subClass, superClass, className) {
			var key, proto, selfProps = subClass.prototype,
				clazz = new Function();
			clazz.prototype = superClass.prototype;
			proto = subClass.prototype = new clazz();
			for (key in selfProps) {
				proto[key] = selfProps[key]
			}
			subClass.prototype.constructor = subClass;
			subClass.superClass = superClass.prototype;
			if ("string" == typeof className) {
				proto._className = className
			}
		};
		baidu.dom = baidu.dom || {};
		baidu.g = baidu.dom.g = function(id) {
			if ("string" == typeof id || id instanceof String) {
				return document.getElementById(id)
			} else {
				if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
					return id
				}
			}
			return null
		};
		baidu.browser = baidu.browser || {};
		if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
			baidu.browser.ie = baidu.ie = document.documentMode || +RegExp["\x241"]
		}
		baidu.dom._NAME_ATTRS = (function() {
			var result = {
				cellpadding: "cellPadding",
				cellspacing: "cellSpacing",
				colspan: "colSpan",
				rowspan: "rowSpan",
				valign: "vAlign",
				usemap: "useMap",
				frameborder: "frameBorder"
			};
			if (baidu.browser.ie < 8) {
				result["for"] = "htmlFor";
				result["class"] = "className"
			} else {
				result.htmlFor = "for";
				result.className = "class"
			}
			return result
		})();
		baidu.getAttr = baidu.dom.getAttr = function(element, key) {
			element = baidu.dom.g(element);
			if ("style" == key) {
				return element.style.cssText
			}
			key = baidu.dom._NAME_ATTRS[key] || key;
			return element.getAttribute(key)
		};
		baidu.event = baidu.event || {};
		baidu.event._listeners = baidu.event._listeners || [];
		baidu.on = baidu.event.on = function(element, type, listener) {
			type = type.replace(/^on/i, "");
			element = baidu.g(element);
			var realListener = function(ev) {
				listener.call(element, ev)
			}, lis = baidu.event._listeners,
				filter = baidu.event._eventFilter,
				afterFilter, realType = type;
			type = type.toLowerCase();
			if (filter && filter[type]) {
				afterFilter = filter[type](element, type, realListener);
				realType = afterFilter.type;
				realListener = afterFilter.listener
			}
			if (element.addEventListener) {
				element.addEventListener(realType, realListener, false)
			} else {
				if (element.attachEvent) {
					element.attachEvent("on" + realType, realListener)
				}
			}
			lis[lis.length] = [element, type, listener, realListener, realType];
			return element
		}
	})();
	BMapLib.COUNTRY_TYPE_CODE = 0;
	BMapLib.PROVINCE_TYPE_CODE = 1;
	BMapLib.CITY_TYPE_CODE = 2;
	var CityList = BMapLib.CityList = function(opts) {
		opts = opts || {};
		this._opts = baidu.extend(baidu.extend(this._opts || {}, {
			container: null,
			map: null
		}), opts);
		this._data = null;
		this._css = [".bmaplib_cityList{color:#333;font:12px arial,sans-serif;padding-left:10px;}", ".bmaplib_cityList h4{font-size:12px;font-weight:normal;margin:0;}", ".bmaplib_cityList hr{height:1px;border-top:solid 1px #ccc; border-bottom:none;}", ".bmaplib_cityList form,.bmaplib_cityList dl{margin:0;}", ".bmaplib_cityList dd,.bmaplib_cityList h4,.bmaplib_cityList dt{padding: 2px 0; vertical-align: top;line-height: 150%;}", ".bmaplib_cityList dt{float:left;width:52px;}", ".bmaplib_cityList dd{margin-left:52px;}", ".bmaplib_cityList a{color:#0000CC;text-decoration:underline;outline:none;margin-right: 8px;}", ".bmaplib_cityList dt a{margin-right:0;}", ".bmaplib_cityListDescript{color:#999;}", ".bmaplib_cityList .black{color:#000;}", ".bmaplib_cityList form span{color:red;}"];
		this._getDataFromMapServer()
	};
	baidu.lang.inherits(CityList, baidu.lang.Class, "CityList");
	var _citylistCount = 1;
	var _outputData = null;
	CityList.prototype._getDataFromMapServer = function() {
		var me = this;
		scriptRequest("http://api.map.baidu.com/library/CityList/1.2/src/data/CityData.js", function() {
			me._callback()
		})
	};
	CityList.prototype._callback = function() {
		if (BMapLib.CityList._cityData) {
			this._data = BMapLib.CityList._cityData;
			BMapLib.CityList._cityData = null;
			_outputData = this._formatCityData(this._data);
			this._renderHtml();
			this._bind()
		}
	};
	CityList.prototype._renderHtml = function() {
		if (!this._opts.container || !baidu.g(this._opts.container)) {
			return
		}
		this._execCss();
		var htm = [],
			data = this._data,
			vds = "javascript:void(0)",
			newData = {};
		htm.push("<div class='bmaplib_cityList' id='bmaplib_cityList_" + this.guid + "'><dl>");
		if (data.municipalities && data.municipalities.length > 0) {
			htm.push("<dt>\u76f4\u8f96\u5e02\uff1a</dt><dd>");
			for (var i = 0, n = data.municipalities.length; i < n; i++) {
				var mu = data.municipalities[i];
				htm.push("<a href='#vd#' code='" + _citylistCount + "'>" + mu.n + "</a>");
				newData[_citylistCount] = {
					g: mu.g,
					t: BMapLib.CITY_TYPE_CODE,
					n: mu.n
				};
				_citylistCount++
			}
			htm.push("</dd>")
		}
		for (var i = 0, n = data.provinces.length; i < n; i++) {
			var pv = data.provinces[i];
			htm.push("<dt><a href='#vd#' class='black' code='" + _citylistCount + "'>" + pv.n + "</a>\uff1a</dt><dd>");
			newData[_citylistCount] = {
				g: pv.g,
				t: BMapLib.PROVINCE_TYPE_CODE,
				n: pv.n
			};
			_citylistCount++;
			for (var j = 0, m = pv.cities.length; j < m; j++) {
				htm.push("<a href='#vd#' code='" + _citylistCount + "'>" + pv.cities[j].n + "</a>");
				newData[_citylistCount] = {
					g: pv.cities[j].g,
					t: BMapLib.CITY_TYPE_CODE,
					n: pv.cities[j].n
				};
				_citylistCount++
			}
			htm.push("</dd>")
		}
		if (data.other && data.other.length > 0) {
			htm.push("<dt>\u5176\u4ed6\uff1a</dt><dd>");
			for (var i = 0, n = data.other.length; i < n; i++) {
				var oth = data.other[i];
				htm.push("<a href='#vd#' code='" + _citylistCount + "'>" + oth.n + "</a>");
				newData[_citylistCount] = {
					g: oth.g,
					t: BMapLib.CITY_TYPE_CODE,
					n: oth.n
				};
				_citylistCount++
			}
			htm.push("</dd>")
		}
		htm.push("</dl></div>");
		baidu.g(this._opts.container).innerHTML = htm.join("").replace(/#vd#/ig, vds);
		this._data = newData
	};
	CityList.prototype._bind = function() {
		if (!this._opts.container || !baidu.g(this._opts.container) || !baidu.g("bmaplib_cityList_" + this.guid)) {
			return
		}
		var cl = baidu.g("bmaplib_cityList_" + this.guid);
		var tags = cl.getElementsByTagName("a"),
			me = this;
		for (var i = 0, n = tags.length; i < n; i++) {
			(function() {
				var tg = tags[i];
				if (!tg) {
					return
				}
				baidu.on(tg, "click", function() {
					if (!baidu.getAttr(tg, "code")) {
						return
					}
					var event = new baidu.lang.Event("oncityclick"),
						code = baidu.getAttr(tg, "code"),
						json = me._data[code];
					if (!json) {
						return
					}
					json = formatJson(json);
					event.name = json.name;
					event.center = json.center;
					event.citytype = json.t;
					var _zoom = json.zoom;
					if (me._opts.map) {
						var _map = me._opts.map;
						_zoom = getBestLevel(_zoom, _map);
						_map.centerAndZoom(json.center, _zoom)
					}
					event.zoom = _zoom;
					me.dispatchEvent(event)
				})
			})()
		}
	};
	CityList.prototype._execCss = function() {
		if (!BMapLib.CityList._isStyleRender) {
			var st = null;
			if (baidu.g("_bmaplib_citylist_css")) {
				baidu.g("_bmaplib_citylist_css").parentNode.removeChild(baidu.g("_bmaplib_citylist_css"))
			}
			var st = document.createElement("STYLE");
			st.type = "text/css";
			st.id = "_bmaplib_citylist_css";
			document.body.appendChild(st);
			if (baidu.browser.ie > 0) {
				st.styleSheet.cssText = this._css.join("")
			} else {
				st.appendChild(document.createTextNode(this._css.join("")))
			}
			BMapLib.CityList._isStyleRender = true
		}
	};
	CityList.prototype._formatCityData = function(cityData) {
		var _dt = cityData,
			_newDt = {};
		if (_dt.municipalities && _dt.municipalities.length > 0) {
			_newDt.municipalities = [];
			for (var i = 0, n = _dt.municipalities.length; i < n; i++) {
				_newDt.municipalities.push(formatJson(_dt.municipalities[i]))
			}
		}
		if (_dt.provinces && _dt.provinces.length > 0) {
			_newDt.provinces = [];
			for (var i = 0, n = _dt.provinces.length; i < n; i++) {
				_newDt.provinces.push(formatJson(_dt.provinces[i]));
				_newDt.provinces[i].cities = [];
				for (var j = 0, m = _dt.provinces[i].cities.length; j < m; j++) {
					_newDt.provinces[i].cities.push(formatJson(_dt.provinces[i].cities[j]))
				}
			}
		}
		if (_dt.other && _dt.other.length > 0) {
			_newDt.other = [];
			for (var i = 0, n = _dt.other.length; i < n; i++) {
				_newDt.other.push(formatJson(_dt.other[i]))
			}
		}
		return _newDt
	};
	CityList.prototype.getCityData = function() {
		return ( !! _outputData ? _outputData : false)
	};

	function formatJson(cityinfo) {
		if (!cityinfo || !cityinfo.n || !cityinfo.g) {
			return
		}
		var newInfo = {};
		newInfo.name = cityinfo.n;
		var dts = cityinfo.g.split("|"),
			dtsPts = dts[0].split(",");
		newInfo.center = new BMap.Point(dtsPts[0], dtsPts[1]);
		var _zoom = parseInt(dts[1], 10);
		newInfo.zoom = _zoom;
		if ( !! cityinfo.t) {
			newInfo.t = cityinfo.t
		}
		return newInfo
	}

	function scriptRequest(url, callback, charset) {
		var isIe = /msie/i.test(window.navigator.userAgent);
		var scriptId = "_script_bmaplib_citylist_";
		if (baidu.g(scriptId)) {
			var script = baidu.g(scriptId)
		} else {
			if (baidu.g(scriptId)) {
				baidu.g(scriptId).parentNode.removeChild(baidu.g(scriptId))
			}
			var script = document.createElement("script");
			if (charset != null) {
				script.charset = charset
			}
			script.setAttribute("id", scriptId);
			script.setAttribute("type", "text/javascript");
			document.body.appendChild(script)
		}
		var t = new Date();
		if (url.indexOf("?") > -1) {
			url += "&t=" + t.getTime()
		} else {
			url += "?t=" + t.getTime()
		}
		var _complete = function() {
			if (!script.readyState || script.readyState == "loaded" || script.readyState == "complete") {
				if (typeof(callback) == "function") {
					try {
						callback()
					} catch (e) {}
				} else {
					eval(callback)
				}
			}
		};
		if (isIe) {
			script.onreadystatechange = _complete
		} else {
			script.onload = _complete
		}
		script.setAttribute("src", url)
	}

	function getBestLevel(level, map) {
		if (map) {
			var sz = map.getSize();
			var ratio = Math.min(sz.width / 1100, sz.height / 660);
			level = Math.round(level + (Math.log(ratio) / Math.log(2)))
		}
		if (level < 1) {
			level = 1
		}
		if (level > 18) {
			level = 18
		}
		return level
	}
})();