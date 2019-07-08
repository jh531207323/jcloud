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
            'save': { index: 0 },
            'undo-redo': { index: 1 },
            'clear': { index: 2 },
            'export': { index: 3 },
            'print': { index: 4 },
            'fullscreen': { index: 5 },
            'order': { index: 6 },
            'layout': { index: 7 },
            'zoom': { index: 8 },
            'grid': { index: 9 },
            'snapline': { index: 10 }
        },
        tools: [
            {
                type: 'button',
                name: 'saveFlow',
                group: 'save',
                text: '保存',
                attrs: {
                    button: {
                        'data-tooltip': '保存',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'toJSON',
                group: 'save',
                text: 'JSON',
                attrs: {
                    button: {
                        'data-tooltip': 'ToJSON',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'undo',
                name: 'undo',
                group: 'undo-redo',
                attrs: {
                    button: {
                        'data-tooltip': '撤销',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'redo',
                name: 'redo',
                group: 'undo-redo',
                attrs: {
                    button: {
                        'data-tooltip': '重做',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'clear',
                group: 'clear',
                attrs: {
                    button: {
                        id: 'btn-clear',
                        'data-tooltip': '清空面板',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'svg',
                group: 'export',
                text: '导出SVG',
                attrs: {
                    button: {
                        id: 'btn-svg',
                        'data-tooltip': '导出SVG',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'png',
                group: 'export',
                text: '导出PNG',
                attrs: {
                    button: {
                        id: 'btn-png',
                        'data-tooltip': '导出PNG',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'print',
                group: 'print',
                attrs: {
                    button: {
                        id: 'btn-print',
                        'data-tooltip': '打印',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'to-front',
                group: 'order',
                text: '置前',
                attrs: {
                    button: {
                        id: 'btn-to-front',
                        'data-tooltip': '将对象置前',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'to-back',
                group: 'order',
                text: '置后',
                attrs: {
                    button: {
                        id: 'btn-to-back',
                        'data-tooltip': '将对象置后',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
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
                group: 'zoom',
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
                group: 'zoom',
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
                group: 'zoom',
                text: '显示比例:'
            },
            {
                type: 'zoom-slider',
                name: 'zoom-slider',
                group: 'zoom'
            },
            {
                type: 'zoom-in',
                name: 'zoom-in',
                group: 'zoom',
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
                group: 'grid'
            },
            {
                type: 'label',
                name: 'grid-size-label',
                group: 'grid',
                text: '边框大小:',
                attrs: {
                    label: {
                        'data-tooltip': '改变边框大小',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'range',
                name: 'grid-size',
                group: 'grid',
                text: 'Grid size:',
                min: 1,
                max: 50,
                step: 1,
                value: 10
            },
            {
                type: 'separator',
                group: 'snapline'
            },
            {
                type: 'checkbox',
                name: 'snapline',
                group: 'snapline',
                label: '对齐线:',
                value: true,
                attrs: {
                    input: {
                        id: 'snapline-switch'
                    },
                    label: {
                        'data-tooltip': '开启/关闭 对齐线',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'fullscreen',
                name: 'fullscreen',
                group: '全屏',
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
