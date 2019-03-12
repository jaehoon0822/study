/*
 * spa.chat.js
 * spa 용 채팅 기능 모음
 */

spa.chat = (function() {
    var
        configMap = {
            main_html: String()
                + '<div style="padding:1em; color:#fff;">'
                    + 'Say hello to chat'
                + '</div>',
            sttable_map: {}
        },
        stateMap = {
            $container: null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule;

    /** Utility method start */
    /** Utility method end */

    /** DOM mthod start */
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
        };
    }
    /** DOM method end */

    /** EvnetHandler start */
    /** EventHandler end */

    /** public method start */
    configModule = function( input_map ) {
        spa.util.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };

    initModule = function( $container ) {
        $container.html( configMap.main_html );
        console.log('container  ', $container)
        stateMap.$container = $container;
        console.log('spa chat js')
        setJqueryMap();
        return true;
    };

    return {
        configModule: configModule,
        initModule: initModule
    }
    /** public method end */

})();