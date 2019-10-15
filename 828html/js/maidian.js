(function () {
    var cookieUtil = {
        //get
        get: function (name) {
            //key

            var cookieName = encodeURIComponent(name) + "=";
            //key所在的开始下标
            var cookieStart = document.cookie.indexOf(cookieName);
            //定义存放value的变量
            var cookieValue = null;

            if (cookieStart > -1) {
                //如果cookieName存在

                var cookieEnd = document.cookie.indexOf(";", cookieStart);

                cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));

            }
            //cookie不存在输出null
            return cookieValue;
        },

        //set
        set: function (name, value, expires, path, domain, secure) {
            var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

            if (expires) {
                var expirestime = new Date();
                expirestime.setTime(expires);
                cookieText += ";expires=" + expirestime.toGMTString();
            }
            if (path) {
                cookieText += ";path=" + path;
            }
            if (domain) {
                cookieText += ";domain=" + domain;
            }
            if (secure) {
                cookieText += ";secure=" + secure;
            }
            document.cookie = cookieText;
        },

        //setExt
        setExt: function (name, value) {
            this.set(name, value, new Date().getTime() + 315360000000, "/")
        }
    }
    //js主体
    var tracker = {
        //配置
        clientConfig: {
            //服务器配置地址
            serverUrl: "http://192.168.0.104:80/log.gif",
            sesstionTimeout: 360, //360s--6min
            maxWaitTime: 3600,//1h
            ver: "1"
        },
        //设置cookie十年过期
        cookieExpiresTime: 315360000000,

        //发送服务器列名
        columns: {
            eventName: "en",
            version: "ver",
            website: "website",
            sdk: "sdk",
            memberId: "m_id",
            uuid: "u_id",
            sid: "s_id",
            nowtime: "nowtime",
            language: "l",
            userAgent: "b_l",
            power: "power",
            title: "title",
            currentUrl: "cur_url",
            refer: "ref_url",
            uname: "uname",
            orderId: "order_id",
            orderName: "order_name",
            price: "price",
            type: "type",
            payType: "pay_type",
            category: "category",
            action: "action",
            kv: "kv_",
            duration: "duration"

        },

        //key值
        keys: {
            //成员id
            mid: "member_id",
            //会话id
            sid: "session_id",
            uuid: "uuid_id",
            pretime: "pretime",
            launch: "e_l",
            pageView: "page",
            chargeRequest: "cr",
            eventDurtation: "ed"
        },
        //获取会话id
        getSid() {
            return cookieUtil.get(this.keys.sid);
        },
        //保存sid
        setSid(sid) {
            if (sid) {
                return cookieUtil.setExt(this.keys.sid, sid);
            }
        },
        //获取uuid
        getUuid() {
            return cookieUtil.get(this.keys.uuid);
        },
        //设置uuid
        setUuid(uuid) {
            if (uuid) {
                return cookieUtil.setExt(this.keys.uuid, uuid);
            }
        },
        //获取mid
        getMemberId() {
            return cookieUtil.get(this.keys.mid);
        },
        //设置memberid
        setMemberId(mid) {
            return cookieUtil.setExt(this.keys.mid, mid);
        },



        //页面初始，开始加载js
        startSession() {
            /*判断会话id是否存在，
                如果存在，判断会话是否过期，
                    如果过期创建新的会话
                    没有过期更新时间
                不存在
                    直接创建新的会话
                
                执行页面加载的方法
            */

            if (this.getSid()) {
                if (this.isSessionOut()) {
                    //会话过期，创建新的会话
                    this.createNewSession();
                } else {
                    //会话没有过期，更新会话时间
                    this.updateTime(new Date().getTime());
                }
            } else {
                this.createNewSession();
            }
            this.onPageView();
        },
        //执行onlunch事件
        onlunch() {
            var launch = {}
            launch[this.columns.eventName] = this.keys.launch;
            //公用的数据
            this.setCommonColumns(launch);
            //发送到服务器端,编码后的data
            this.sendToServerData(this.parseParam(launch))
        },
        //页面加载的方法
        onPageView() {
            if (this.perTimeOut()) {
                var nowTime = new Date().getTime();
                var obj = {};
                obj[this.columns.eventName] = this.keys.pageView;
                //当前页面标题
                obj[this.columns.title] = document.title;
                //当前页面的链接
                obj[this.columns.currentUrl] = window.location.href;
                //上一个页面的链接
                obj[this.columns.refer] = document.referrer;
                this.setCommonColumns(obj);
                this.sendToServerData(this.parseParam(obj));
                this.updateTime(nowTime);
            }
        },
        //订单产生 type货币类型，paytype支付方式
        onChargeRequest(orderId, orderName, price, type, payType) {
            if (this.perTimeOut()) {
                if (!orderId || !orderName || !price || !type || !payType) {
                    console.log("订单id,订单名称，订单价格，货币类型，支付方式不存在")
                    return;
                }
                var obj = {};
                obj[this.columns.eventName] = this.keys.chargeRequest;
                obj[this.columns.orderId] = orderId
                obj[this.columns.orderName] = orderName
                obj[this.columns.price] = price
                obj[this.columns.type] = type
                obj[this.columns.payType] = payType
                this.setCommonColumns(obj);
                this.sendToServerData(this.parseParam(obj));
                this.updateTime(new Date().getTime());
            }
        },
        //事件 category事件名称，action事件动作，map其他参数，duration持续时间
        onEventDurtation(category, action, map, duration) {
            if (this.perTimeOut) {
                if (category && action) {
                    var obj = {};
                    obj[this.columns.eventName] = this.keys.eventDurtation;
                    obj[this.columns.category] = category
                    obj[this.columns.action] = action
                    if (map) {
                        for (e in map) {
                            if (e && map[e]){
                                obj[this.columns.kv + e] = map[e]
                            }
                        }
                    }
                    if (duration) {
                        obj[this.columns.duration] = duration
                    }
                }
                this.setCommonColumns(obj);
                this.sendToServerData(this.parseParam(obj));
                this.updateTime(new Date().getTime());
            }
        },
        //处理发送服务器的数据data
        sendToServerData(data) {
            var img = new Image(1, 1);
            img.onerror = function () {
                //图片加载失败

            }
            img.src = this.clientConfig.serverUrl + "?" + data;
        },

        //判断会话是否过期,当前时间与访问时间的间隔,如果间隔大于会话过期时间，返回true，否则返回false
        isSessionOut() {
            var nowDate = new Date().getTime();
            var pretime = cookieUtil.get(this.keys.pretime);
            if (pretime) {
                return nowDate - pretime > this.clientConfig.sesstionTimeout * 1000;
            }
            return true;
        },
        //更新会话时间
        updateTime(Date) {
            return cookieUtil.set(this.keys.pretime, Date)
        },
        //创建新的会话
        createNewSession() {
            var nowtime = new Date().getTime();
            //创建新的sessinid，更新会话最新访问时间
            var sid = this.createUuid();
            this.setSid(sid)
            this.updateTime(nowtime);
            if (!this.getUuid()) {
                //如果uuid不存在,创建新的uuid
                var uuid = this.createUuid();
                this.setUuid(uuid);
                //执行lunch事件
                this.onlunch();
            }

        },
        //创建Uuid
        createUuid() {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var tmpid = [];
            var r;
            //uuid格式 xxxxxxxx-xxxx-4xxx-vxxx-xxxxxxxxxxxx
            tmpid[8] = tmpid[13] = tmpid[18] = tmpid[23] = '-';
            tmpid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!tmpid[i]) {
                    r = 0 | Math.random() * 16;
                    tmpid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return tmpid.join('');
        },
        //设置公用的参数
        setCommonColumns(data) {
            //分辨率
            data[this.columns.power] = screen.width + "*" + screen.height;
            //版本
            data[this.columns.version] = this.clientConfig.ver;
            //平台
            data[this.columns.website] = "website";
            //sdk
            data[this.columns.sdk] = "js";
            //memberid
            data[this.columns.memberId] = this.getMemberId();
            //uuid
            data[this.columns.uuid] = this.getUuid();
            //sessionid
            data[this.columns.sid] = this.getSid();
            //当前访问时间
            data[this.columns.nowtime] = new Date().getTime();
            //语言
            data[this.columns.language] = window.navigator.language;
            //浏览器类型
            data[this.columns.userAgent] = window.navigator.userAgent;
            //姓名
            data[this.columns.uname] = "李东升";

        },
        //处理发送服务器端数据
        parseParam(data) {
            var parms = "";
            for (e in data) {
                if (e && data[e]) {
                    parms += encodeURIComponent(e) + '=' + encodeURIComponent(data[e]) + '&';
                }
            }
            if (parms) {
                return parms.substring(0, parms.length - 1);
            } else {
                return parms;
            }
        },
        //对外暴漏的方法必须执行此方法
        perTimeOut() {
            var nowTime = new Date().getTime();
            if (this.isSessionOut()) {
                this.startSession();
            } else {
                this.updateTime(nowTime);
            }
            return true;
        },



    };

    //对外暴露的方法名称，执行js主体
    window.__AE__ = {
        //调用主体的js设置memberID
        setMemberId: function (memberId) {
            tracker.setMemberId(memberId);
        },
        //调用主体的js开始加载方法
        startSession: function () {
            tracker.startSession();
        },
        //页面加载
        onPageView:function() {
            tracker.onPageView();
        },
        //订单事件
        onChargeRequest:function(orderId, orderName, price, type, payType) {
            tracker.onChargeRequest(orderId, orderName, price, type, payType);
        },
        //事件
        onEventDurtation:function(category, action, map, duration) {
            tracker.onEventDurtation(category, action, map, duration);
        }
    };
    //自动加载
    var autoLoad = function () {
        //参数配置
        //定义memberId存放的容器
        var memberId = null;
        //获取memberId 是否存在
        var _aelog_ = _aelog_ || window._aelog_ || [];
        for ( i = 0; i < _aelog_.length; i++) {
            if (_aelog_[i][0] == "memberId") {
                memberId = _aelog_[i][1];
            }
        }
        //如果memberid存在，设置cookie里memberId
        if (memberId) {
            __AE__.setMemberId(memberId);
        }

        //启动埋点程序，开始页面加载
        __AE__.startSession();


    }
    autoLoad();

})();