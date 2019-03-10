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
        + '<div class="spa-shell-modal"></div>'
    },
    stateMap = {
        $container: null,
    },
    jqueryMap = {},
    setJqueryMap, initModule;

    /** module scope variable enc */

    /** Utility method start */
    /** Utility method end */

    /** DOM Method start */
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
        }
    }
    /** DOM Method end */

    /** Event handler start */
    /** Event handler end */

        /** Public mehtod /initModule/ start */
    initModule = function($container) {
        stateMap.$container = $container;
        setJqueryMap();
        $container.html( configMap.main_html );
    }

    return {initModule: initModule};
})()