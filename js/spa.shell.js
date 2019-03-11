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
        chat_retract_time: 2000
    },
    stateMap = {
        $container: null,
    },
    jqueryMap = {},
    setJqueryMap, initModule, toggleChat;

    /** module scope variable enc */

    /** Utility method start */
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

            console.log('runnig')
        if (is_sliding) {
            return false;
        };
        if (do_extend) {
            jqueryMap.$chat.animate(
                { height: configMap.chat_extend_height },
                configMap.chat_extend_time,
                function() {
                    if (callback) callback( jqueryMap.$chat )
                }
            )
            console.log('extend');
            return true;
        } 
        jqueryMap.$chat.animate(
            { height: configMap.chat_retract_height },
            configMap.chat_retract_time,
            function() {
                if (callback) callback( jqueryMap.$chat );
            }
        );
        console.log('retract');
        return true;
    };
    
    /** DOM Method end */

    /** Event handler start */
    /** Event handler end */

    /** Public method start */
        /** Public method /initModule/ start */
    initModule = function($container) {
        stateMap.$container = $container;
        $container.html( configMap.main_html );
        setJqueryMap();
        // toggleTest
        setTimeout( function() {toggleChat(true)}, 1000 );
        setTimeout( function() {toggleChat(false)}, 3000 );
    }
        /** Public method /initModule/ end */
    /** Public method end */

    return {initModule: initModule};
})()