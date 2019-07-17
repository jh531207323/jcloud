/*! Rappid v2.4.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2019-07-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


var App = App || {};
App.config = App.config || {};

(function () {

    'use strict';

    App.config.stencil = {};

    App.config.stencil.groups = {
        flow: {index: 1, label: '流程'},
        flownode: {index: 2, label: '流程节点'},
    };

    App.config.stencil.shapes = {};

    App.config.stencil.shapes.flow = [
        {
            type: 'flow.Rectangle',
            size: {width: 1, height: 1},
            attrs: {
                root: {
                    dataTooltip: '运行节点',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    rx: 2,
                    ry: 2,
                    fill: 'transparent',
                    stroke: '#7c68fc',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '0',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 14,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'flow.Rectangle',
            size: {width: 1, height: 1},
            attrs: {
                root: {
                    dataTooltip: '停止节点',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    rx: 2,
                    ry: 2,
                    fill: 'transparent',
                    stroke: '#7c68fc',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '0',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 14,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'flow.Rectangle',
            size: {width: 1, height: 1},
            attrs: {
                root: {
                    dataTooltip: '暂停节点',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    rx: 2,
                    ry: 2,
                    fill: 'transparent',
                    stroke: '#7c68fc',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '0',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 14,
                    strokeWidth: 0
                }
            }
        }
    ];

    App.config.stencil.shapes.flownode = [
        {
            type: 'flow.Rectangle',
            size: {width: 5, height: 3},
            attrs: {
                root: {
                    dataTooltip: '开始',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    rx: 2,
                    ry: 2,
                    fill: 'transparent',
                    stroke: '#7c68fc',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '开始',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 14,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'flow.Rectangle',
            size: {width: 5, height: 3},
            attrs: {
                root: {
                    dataTooltip: '停止',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    rx: 2,
                    ry: 2,
                    fill: 'transparent',
                    stroke: '#7c68fc',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '停止',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 14,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'flow.Rectangle',
            size: {width: 5, height: 3},
            attrs: {
                root: {
                    dataTooltip: '暂停',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    rx: 2,
                    ry: 2,
                    fill: 'transparent',
                    stroke: '#7c68fc',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '暂停',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 14,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'flow.Rectangle',
            size: {width: 5, height: 3},
            attrs: {
                root: {
                    dataTooltip: '配置',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    rx: 2,
                    ry: 2,
                    fill: 'transparent',
                    stroke: '#7c68fc',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '配置',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 14,
                    strokeWidth: 0
                }
            }
        },
    ];
})();
