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

    App.config.toolbar = {
        groups: {
            'flow': { index: 0 },
            'layout': { index: 1 },
            'zoom': { index: 2 },
            'fullscreen': { index: 3 },
        },
        tools: [
            {
                type: 'button',
                name: 'flowRun',
                group: 'flow',
                text: '全部运行',
                attrs: {
                    button: {
                        'data-tooltip': '全部运行',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'flowStop',
                group: 'flow',
                text: '全部停止',
                attrs: {
                    button: {
                        'data-tooltip': '全部停止',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'flowSuspend',
                group: 'flow',
                text: '全部挂起',
                attrs: {
                    button: {
                        'data-tooltip': '全部挂起',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'separator',
                group: 'layout'
            },
            {
                type: 'button',
                group: 'layout',
                name: 'layout',
                attrs: {
                    button: {
                        id: 'btn-layout',
                        'data-tooltip': '自动布局',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'zoom-to-fit',
                name: 'zoom-to-fit',
                group: 'layout',
                attrs: {
                    button: {
                        'data-tooltip': '自动比例',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'zoom-out',
                name: 'zoom-out',
                group: 'layout',
                attrs: {
                    button: {
                        'data-tooltip': '放大',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'label',
                name: 'zoom-slider-label',
                group: 'layout',
                text: '显示比例:',
                attrs: {
                    label: {
                        'data-tooltip': '改变显示比例',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'zoom-slider',
                name: 'zoom-slider',
                group: 'zoom'
            },
            {
                type: 'zoom-in',
                name: 'zoom-in',
                group: 'layout',
                attrs: {
                    button: {
                        'data-tooltip': '缩小',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'separator',
                group: 'fullscreen'
            },
            {
                type: 'fullscreen',
                name: 'fullscreen',
                group: 'fullscreen',
                attrs: {
                    button: {
                        'data-tooltip': '切换全屏模式',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            }
        ]
    };
})();
