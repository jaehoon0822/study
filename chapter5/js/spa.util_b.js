/***
 * spa.util_b.js
 * javascript browser utility
 * 
 * Michael S. Mikowski 가 comfile
 * 웹에서 영감을 얻어 1998년 작성하고 수정한 루틴
 * MIT licence
 * 
 */

 spa.util_b = (function() {
     'use strict'
     /** module scope start */
     var
        configMap = {
            regex_encode_html: /[&"'><]/g,
            regex_encode_noamp: /["'><]/g,
            html_encode_map: {
                '&' : '&#38;',
                '"' : '&#34;',
                "'" : '&#39;',
                '>' : '&#62;',
                '<' : '&#60;'
            }
        },
        decodeHtml, encodeHtml, getEmSize;

        configMap.encode_noamp_map = $.extend(
            {}, configMap.html_encode_map
        );
        delete configMap.encode_noamp_map['&'];
        /** module scope end */

        /** utility method start */
        
        // decodeHTML start
        // HTML entity 를 browser 친화적으로 decoding 한다.
        // http://stackoverflow.com/wuestions/1912501/\unescape-html-entities-in-javascript 참고
        // 

        decodeHtml = function( str ) {
            return $( '<div/>' ).html( str || '' ).text();
        };

        // decodeHTML end

        // encodingHTML start

        encodeHtml = function( input_arg_str, exclude_amp ) {
            var
                input_str = String( input_arg_str ),
                regex, lookup_map;
            
            if ( exclude_amp ) {
                lookup_map = configMap.encode_noamp_map;
                regex = configMap.regEx_encode_noamp;
            }
            else {
                lookup_map = configMap.html_encode_map;
                regex = configMap.regex_encode_html;
            }
            return input_str.replace(
                regex, function( match, name ) {
                    return lookup_map[ match ] || '';
                }
            );
        };

        // encodingHTML end

        // getEmSize start
        // em 크기를 픽셀값으로 반환
        //
        getEmSize = function( elem ) {
            return Number(
                getComputedStyle( elem, '' ).fontSize.match(/\d*\.?\d*/)[0]
            );
        };
        //
        // getEmSize end

        // 노출 메서드
        return {
            decodeHtml: decodeHtml,
            encodeHtml: encodeHtml,
            getEmSize: getEmSize
        };
 })()