/*! Rappid v2.4.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2019-07-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';

    App.config.selection = {

        handles: [{
            name: 'remove',
            position: 'nw',
            events: {
                pointerdown: 'removeElements'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': '删除所有选择对象',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }

        }, {
            name: 'rotate',
            position: 'sw',
            events: {
                pointerdown: 'startRotating',
                pointermove: 'doRotate',
                pointerup: 'stopBatch'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': '旋转所有选择对象',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }

        }, {
            name: 'resize',
            position: 'se',
            events: {
                pointerdown: 'startResizing',
                pointermove: 'doResize',
                pointerup: 'stopBatch'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': '调节所有选择对象大小',
                    'data-tooltip-position': 'left',
                    'data-tooltip-padding': 15
                }
            }
        }]
    };

})();
