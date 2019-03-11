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
        + '<div class="spa-shell-chat"></div>'
        + '<div class="spa-shell-modal"></div>',

        chat_extend_height: 450,
        chat_retract_height: 15,
        chat_extend_time: 1000,
        chat_retract_time: 300,
        chat_retract_title: 'Click to extend',
        chat_extend_title: 'Click to retract',

        anchor_schema_map: {
            chat: { open: true, closed: true }
        }
    },
    stateMap = {
        $container: null,
        anchor_map: {},
        is_chat_retracted: true,
    },
    jqueryMap = {},
    setJqueryMap, initModule, toggleChat, onClick,
    copyAnchorMap, changeAnchorPart, onHashchange;

    /** module scope variable enc */

    /** Utility method start */

    copyAnchorMap = function() {
        return $.extend( true, {}, stateMap.anchor_map );
    };

    /** Utility method end */

    /** DOM Method start */
    setJqueryMap = function() {
        var $container = stateMap.$container;
        console.log('setJqueryMap:');
        console.log($container);
        jqueryMap = {
            $container: $container,
            $chat: $container.find( '.spa-shell-chat' )
        };
    }

    toggleChat = function(do_extend, callback) {
        var
            px_chat_ht = jqueryMap.$chat.height(),
            is_open = px_chat_ht === configMap.chat_extend_height,
            is_closed = px_chat_ht === configMap.chat_retract_height,
            is_sliding = ! is_open && ! is_closed;

        if (is_sliding) {
            return false;
        };
        if (do_extend) {
            jqueryMap.$chat.animate(
                { height: configMap.chat_extend_height },
                configMap.chat_extend_time,
                function() {
                    jqueryMap.$chat.attr('title', configMap.chat_extend_title)
                    stateMap.is_chat_retracted = false;
                    console.log(stateMap.is_chat_retracted)
                    if (callback) callback( jqueryMap.$chat )
                }
            )
            return true;
        } 
        jqueryMap.$chat.animate(
            { height: configMap.chat_retract_height },
            configMap.chat_retract_time,
            function() {
                jqueryMap.$chat.attr( 'title', configMap.chat_retract_title );
                stateMap.is_chat_retracted = true;
                if (callback) callback( jqueryMap.$chat );
            }
        );
        return true;
    };

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
            anchor_map_previous = copyAnchorMap(),
            anchor_map_proposed,
            _s_chat_previous, _s_chat_proposed,
            s_chat_proposed;

            console.log('a: ',anchor_map_previous)
        
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
                    case 'open':
                        toggleChat( true );
                    break;
                    case 'closed':
                        toggleChat( false );
                    break;
                    default:
                        toggleChat( false );
                        delete anchor_map_proposed.chat;
                        $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
                        console.log(anchor_map_proposed);
                }
            }
            return false;
        }

    onClick = function(e) {
        if ( toggleChat( stateMap.is_chat_retracted ) ) {
            changeAnchorPart({
                chat: ( stateMap.is_chat_retracted ? 'open' : 'closed')
            });
            console.log('cc: ', copyAnchorMap());
        }
        return false;
    }
    /** Event handler end */

    /** Public method start */
        /** Public method /initModule/ start */
    initModule = function($container) {

        stateMap.$container = $container;
        $container.html( configMap.main_html );
        setJqueryMap();
        
        stateMap.is_chat_retracted = true;
        jqueryMap.$chat
            .attr('title', configMap.is_chat_retracted)
            .click(onClick);
        
        $.uriAnchor.configModule({
            schema_map: configMap.anchor_schema_map
        });

        $(window)
            .bind( 'hashchange', onHashchange )
            .trigger( 'hashchange' );
        // toggleTest
    }
        /** Public method /initModule/ end */
    /** Public method end */

    return {initModule: initModule};
})()