spa.shell = (function(){

    /** module scope variable start */
    var configMap = {
        main_html: String()
        + '<div class="spa-shell-head">'
            + '<div class="spa-shell-head-logo"></div>'
            + '<div class="spa-shell-head-acct"></div>'
            + '<div class="spa-shell-head-search"></div>'
        + '</div>'
        + '<div class="spa-shell-main">'
            + '<div class="spa-shell-main-nav"></div>'
            + '<div class="spa-shell-main-contents"></div>'
        + '</div>'
        + '<div class="spa-shell-foot"></div>'
        + '<div class="spa-shell-modal"></div>',

        anchor_schema_map: {
            chat: { opened: true, closed: true }
        },
        resize_interval: 200
    },
    stateMap = {
        $container: null,
        anchor_map: {},
        resize_idto: undefined
    },
    jqueryMap = {},
    setJqueryMap, initModule, setChatAnchor, 
    copyAnchorMap, changeAnchorPart, onHashchange,
    onResize;

    /** module scope variable enc */

    /** Utility method start */

    copyAnchorMap = function() {
        return $.extend( true, {}, stateMap.anchor_map );
    };

    /** Utility method end */

    /** DOM Method start */
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
        };
    }

    changeAnchorPart = function ( arg_map ) {
        var 
            anchor_map_revise = copyAnchorMap(),
            bool_return = true,
            key_name, key_name_dep;

        KEYVAL:
        for ( key_name in arg_map) {
            if (arg_map.hasOwnProperty( key_name )) {
                if ( key_name.indexOf('_') === 0 ) {
                    continue KEYVAL;
                }
                anchor_map_revise[key_name] = arg_map[key_name];
                key_name_dep = '_' + key_name;
                if ( arg_map[key_name_dep] ) {
                    anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                }
                else {
                    delete anchor_map_revise[key_name_dep];
                    delete anchor_map_revise['_s' + key_name_dep];
                }
            }
        }
        try {
            $.uriAnchor.setAnchor( anchor_map_revise );
        }
        catch (error) {
            $.uriAnchor.setAnchor( stateMap.anchor_map, null, true );
            bool_return = false;
        }
        return bool_return;
    }
    
    /** DOM Method end */

    /** Event handler start */
    onHashchange = function(e) {
        var
            _s_chat_previous, _s_chat_proposed, s_chat_proposed,
            anchor_map_proposed,
            is_ok = true;
            anchor_map_previous = copyAnchorMap();
        
        // 앵커 파싱 시도
        try { anchor_map_proposed = $.uriAnchor.makeAnchorMap(); }
        catch (error) {
            $.uriAnchor.setAnchor( anchor_map_previous, null, true );
            return false;
        }
        stateMap.anchor_map = anchor_map_proposed;

        // 편의 변수
        _s_chat_previous = anchor_map_previous._s_chat;
        _s_chat_proposed = anchor_map_proposed._s_chat;
        // 변경된 경우 채팅 컴포넌트 조정을 시작
        if ( ! anchor_map_previous 
            || _s_chat_previous !== _s_chat_proposed) {
                s_chat_proposed = anchor_map_proposed.chat;
                switch ( s_chat_proposed ) {
                    case 'opened':
                        is_ok = spa.chat.setSliderPosition( 'opened' );
                    break;
                    case 'closed':
                        is_ok = spa.chat.setSliderPosition( 'closed' );
                    break;
                    default:
                        spa.chat.setSliderPosition( 'closed' );
                        delete anchor_map_proposed.chat;
                        $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
                }
            }
            if ( ! is_ok ) {
                if ( anchor_map_previous ) {
                    $.uriAnchor.setAnchor( anchor_map_previous, null, true);
                    stateMap.anchor_map = anchor_map_previous;
                } else {
                    delete anchor_map_proposed.chat;
                    $.uriAnchor.setAnchor( anchor_map_proposed, null, true);
                }
            }
            return false;
        }
    
    setChatAnchor = function(position_type) {
        return changeAnchorPart( { chat: position_type });
    };

    onResize = function() {
        if ( stateMap.resize_idto ) { return true; }
        spa.chat.handleResize();
        stateMap.resize_idto = setTimeout(
            function() { stateMap.resize_idto = undefined; },
            configMap.resize_interval
        )
        return true;
    }

    /** Event handler end */

    /** Public method start */
        /** Public method /initModule/ start */
    initModule = function($container) {

        stateMap.$container = $container;
        $container.html( configMap.main_html );
        setJqueryMap();
        
        $.uriAnchor.configModule({
            schema_map: configMap.anchor_schema_map
        });

        // 기능 모듈을 설정 및 초기화
        spa.chat.configModule( {
            set_chat_anchor: setChatAnchor,
            chat_model: spa.model.chat,
            people_model: spa.model.people
        } );

        spa.chat.initModule( jqueryMap.$container );

        $(window)
            .bind( 'resize', onResize )
            .bind( 'hashchange', onHashchange )
            .trigger( 'hashchange' );
        // toggleTest
    }
        /** Public method /initModule/ end */
    /** Public method end */

    return {initModule: initModule};
})()