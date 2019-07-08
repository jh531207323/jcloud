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

    App.config.halo = {

        handles: [
            {
                name: 'remove',
                position: 'nw',
                events: { pointerdown: 'removeElement' },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': '删除',
                        'data-tooltip-position': 'right',
                        'data-tooltip-padding': 15
                    }
                }
            },
            {
                name: 'fork',
                position: 'ne',
                events: { pointerdown: 'startForking', pointermove: 'doFork', pointerup: 'stopForking' },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': '复制并连接',
                        'data-tooltip-position': 'left',
                        'data-tooltip-padding': 15
                    }
                }
            },
            {
                name: 'clone',
                position: 'se',
                events: { pointerdown: 'startCloning', pointermove: 'doClone', pointerup: 'stopCloning' },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': '复制',
                        'data-tooltip-position': 'left',
                        'data-tooltip-padding': 15
                    }
                }
            },
            {
                name: 'unlink',
                position: 'w',
                events: { pointerdown: 'unlinkElement' },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': '删除所有连接',
                        'data-tooltip-position': 'right',
                        'data-tooltip-padding': 15
                    }
                }
            },
            {
                name: 'link',
                position: 'e',
                events: { pointerdown: 'startLinking', pointermove: 'doLink', pointerup: 'stopLinking' },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': '连接',
                        'data-tooltip-position': 'left',
                        'data-tooltip-padding': 15
                    }
                }
            },
            {
                name: 'rotate',
                position: 'sw',
                events: { pointerdown: 'startRotating', pointermove: 'doRotate', pointerup: 'stopBatch' },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': '旋转',
                        'data-tooltip-position': 'right',
                        'data-tooltip-padding': 15
                    }
                }
            }
        ]
    };

})();
