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

    App.config.stencil = {};

    App.config.stencil.groups = {
        flow: { index: 1, label: '流程' },
        // standard: { index: 2, label: '标准' },
        // fsa: { index: 3, label: '状态' },
        // pn: { index: 4, label: '网络' },
        // erd: { index: 5, label: '实体关系' },
        // uml: { index: 6, label: 'UML' },
        // org: { index: 7, label: '组织机构' }
    };

    App.config.stencil.shapes = {};

    App.config.stencil.shapes.flow = [
        {
            type: 'fsa.StartState',
            preserveAspectRatio: true,
            attrs: {
                root: {
                    dataTooltip: '开始',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                circle: {
                    width: 50,
                    height: 30,
                    fill: '#61549c',
                    'stroke-width': 0
                },
                text: {
                    text: '开始',
                    fill: '#c6c7e2',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11,
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'fsa.EndState',
            preserveAspectRatio: true,
            attrs: {
                root: {
                    dataTooltip: '结束',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.inner': {
                    fill: '#6a6c8a',
                    stroke: 'transparent'
                },
                '.outer': {
                    fill: 'transparent',
                    stroke: '#61549c',
                    'stroke-width': 2,
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '结束',
                    fill: '#c6c7e2',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11,
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'standard.Rectangle',
            size: { width: 5, height: 3 },
            attrs: {
                root: {
                    dataTooltip: '流程节点',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    rx: 2,
                    ry: 2,
                    width: 50,
                    height: 30,
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '流程节点',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'app.RectangularModel',
            size: { width: 40, height: 30 },
            allowOrthogonalResize: false,
            attrs: {
                root: {
                    dataTooltip: '并行流程节点',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    fill: 'transparent',
                    rx: 2,
                    ry: 2,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '并行流程节点',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            },
            ports: {
                items: [
                    { group: 'in' },
                    { group: 'in' },
                    { group: 'out' }
                ]
            }
        },
        {
            type: 'standard.Polygon',
            size: { width: 5, height: 3 },
            attrs: {
                root: {
                    dataTooltip: '判定',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    refPoints: '50,0 100,50 50,100 0,50',
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '判定',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'standard.Cylinder',
            size: { width: 5, height: 3 },
            attrs: {
                root: {
                    dataTooltip: '存储',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                top: {
                    fill: '#31d0c6',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '存储',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            }
        },
    ];

    App.config.stencil.shapes.standard = [
        {
            type: 'standard.Rectangle',
            size: { width: 5, height: 3 },
            attrs: {
                root: {
                    dataTooltip: '矩形',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    rx: 2,
                    ry: 2,
                    width: 50,
                    height: 30,
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '矩形',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'standard.Ellipse',
            size: { width: 5, height: 3 },
            attrs: {
                root: {
                    dataTooltip: '椭圆',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    width: 50,
                    height: 30,
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '椭圆',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'app.RectangularModel',
            size: { width: 40, height: 30 },
            allowOrthogonalResize: false,
            attrs: {
                root: {
                    dataTooltip: '关系矩形',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    fill: 'transparent',
                    rx: 2,
                    ry: 2,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '关系矩形',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            },
            ports: {
                items: [
                    { group: 'in' },
                    { group: 'in' },
                    { group: 'out' }
                ]
            }
        },
        {
            type: 'app.CircularModel',
            size: { width: 5, height: 3 },
            allowOrthogonalResize: false,
            attrs: {
                root: {
                    dataTooltip: '关系椭圆',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0',
                },
                label: {
                    text: '关系椭圆',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            },
            ports: {
                items: [
                    { group: 'in' },
                    { group: 'in' },
                    { group: 'out' }
                ]
            }
        },
        {
            type: 'standard.Polygon',
            size: { width: 5, height: 3 },
            attrs: {
                root: {
                    dataTooltip: '菱形',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    refPoints: '50,0 100,50 50,100 0,50',
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '菱形',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'standard.Cylinder',
            size: { width: 5, height: 3 },
            attrs: {
                root: {
                    dataTooltip: '圆柱',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                top: {
                    fill: '#31d0c6',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '圆柱',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'standard.Image',
            size: { width: 53, height: 42 },
            attrs: {
                root: {
                    dataTooltip: '图片',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                image: {
                    xlinkHref: '/js/plugins/Rappid/2.4.0/assets/image-icon1.svg'
                },
                body: {
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                label: {
                    text: '图片',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    fill: '#c6c7e2'
                }
            }
        },
        {
            type: 'standard.EmbeddedImage',
            size: { width: 5, height: 3 },
            attrs: {
                root: {
                    dataTooltip: '卡片',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                image: {
                    xlinkHref: '/js/plugins/Rappid/2.4.0/assets/image-icon1.svg'
                },
                label: {
                    text: '卡片',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'standard.InscribedImage',
            size: { width: 1, height: 1 },
            attrs: {
                root: {
                    dataTooltip: '图标',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                border: {
                    stroke: '#31d0c6',
                    strokeWidth: 3,
                    strokeDasharray: '0'
                },
                background: {
                    fill: 'transparent'
                },
                image: {
                    xlinkHref: '/js/plugins/Rappid/2.4.0/assets/image-icon1.svg'
                },
                label: {
                    text: '图标',
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0
                }
            }
        },
        {
            type: 'standard.HeaderedRectangle',
            size: { width: 5, height: 3 },
            attrs: {
                root: {
                    dataTooltip: '面板',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                body: {
                    fill: 'transparent',
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0'
                },
                header: {
                    stroke: '#31d0c6',
                    fill: '#31d0c6',
                    strokeWidth: 2,
                    strokeDasharray: '0',
                    height: 20
                },
                bodyText: {
                    textWrap: {
                        text: '多行文本...',
                        width: -10,
                        height: -20,
                        ellipsis: true
                    },
                    fill: '#c6c7e2',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0,
                    refY2: 12,
                },
                headerText: {
                    text: '头部',
                    fill: '#f6f6f6',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 'Normal',
                    fontSize: 11,
                    strokeWidth: 0,
                    refY: 12
                }
            }
        }
    ];

    App.config.stencil.shapes.fsa = [

        {
            type: 'fsa.StartState',
            preserveAspectRatio: true,
            attrs: {
                root: {
                    dataTooltip: '开始',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                circle: {
                    width: 50,
                    height: 30,
                    fill: '#61549c',
                    'stroke-width': 0
                },
                text: {
                    text: '开始',
                    fill: '#c6c7e2',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11,
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'fsa.EndState',
            preserveAspectRatio: true,
            attrs: {
                root: {
                    dataTooltip: '结束',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.inner': {
                    fill: '#6a6c8a',
                    stroke: 'transparent'
                },
                '.outer': {
                    fill: 'transparent',
                    stroke: '#61549c',
                    'stroke-width': 2,
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '结束',
                    fill: '#c6c7e2',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11,
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'fsa.State',
            preserveAspectRatio: true,
            attrs: {
                root: {
                    dataTooltip: '状态',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                circle: {
                    fill: '#6a6c8a',
                    stroke: '#61549c',
                    'stroke-width': 2,
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '状态',
                    fill: '#c6c7e2',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11,
                    'stroke-width': 0
                }
            }
        }
    ];

    App.config.stencil.shapes.pn = [

        {
            type: 'pn.Place',
            preserveAspectRatio: true,
            tokens: 3,
            attrs: {
                root: {
                    dataTooltip: '区域',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.root': {
                    fill: 'transparent',
                    stroke: '#61549c',
                    'stroke-width': 2,
                    'stroke-dasharray': '0'
                },
                '.tokens circle': {
                    fill: '#6a6c8a',
                    stroke: '#000',
                    'stroke-width': 0
                },
                '.label': {
                    text: '',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal'
                }
            }
        },
        {
            type: 'pn.Transition',
            preserveAspectRatio: true,
            attrs: {
                root: {
                    dataTooltip: '过渡',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                rect: {
                    rx: 3,
                    ry: 3,
                    width: 12,
                    height: 50,
                    fill: '#61549c',
                    stroke: '#7c68fc',
                    'stroke-width': 0,
                    'stroke-dasharray': '0'
                },
                '.label': {
                    text: '过渡',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'stroke-width': 0,
                    'fill': '#222138'
                }
            }
        }
    ];

    App.config.stencil.shapes.erd = [

        {
            type: 'erd.Entity',
            attrs: {
                root: {
                    dataTooltip: '实体',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.outer': {
                    rx: 3,
                    ry: 3,
                    fill: '#31d0c6',
                    'stroke-width': 2,
                    stroke: 'transparent',
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '实体',
                    'font-size': 11,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    fill: '#f6f6f6',
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'erd.WeakEntity',
            attrs: {
                root: {
                    dataTooltip: '弱实体',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.outer': {
                    fill: 'transparent',
                    stroke: '#feb663',
                    'stroke-width': 2,
                    points: '100,0 100,60 0,60 0,0',
                    'stroke-dasharray': '0'
                },
                '.inner': {
                    fill: '#feb663',
                    stroke: 'transparent',
                    points: '97,5 97,55 3,55 3,5',
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '弱实体',
                    'font-size': 11,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    fill: '#f6f6f6',
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'erd.Relationship',
            attrs: {
                root: {
                    dataTooltip: '关系',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.outer': {
                    fill: '#61549c',
                    stroke: 'transparent',
                    'stroke-width': 2,
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '关系',
                    'font-size': 11,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    fill: '#f6f6f6',
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'erd.IdentifyingRelationship',
            attrs: {
                root: {
                    dataTooltip: '标识关系',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.outer': {
                    fill: 'transparent',
                    stroke: '#6a6c8a',
                    'stroke-dasharray': '0'
                },
                '.inner': {
                    fill: '#6a6c8a',
                    stroke: 'transparent',
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '标识关系',
                    'font-size': 11,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    fill: '#f6f6f6',
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'erd.ISA',
            attrs: {
                root: {
                    dataTooltip: 'ISA',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                text: {
                    text: 'ISA',
                    fill: '#f6f6f6',
                    'letter-spacing': 0,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11
                },
                polygon: {
                    fill: '#feb663',
                    stroke: 'transparent',
                    'stroke-dasharray': '0'
                }
            }
        },
        {
            type: 'erd.Key',
            attrs: {
                root: {
                    dataTooltip: '键',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.outer': {
                    fill: 'transparent',
                    stroke: '#fe854f',
                    'stroke-dasharray': '0'
                },
                '.inner': {
                    fill: '#fe854f',
                    stroke: 'transparent',
                    display: 'block',
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '键',
                    'font-size': 11,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    fill: '#f6f6f6',
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'erd.Normal',
            attrs: {
                root: {
                    dataTooltip: '普通',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.outer': {
                    fill: '#feb663',
                    stroke: 'transparent',
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '普通',
                    'font-size': 11,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    fill: '#f6f6f6',
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'erd.Multivalued',
            attrs: {
                root: {
                    dataTooltip: '多个值',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.outer': {
                    fill: 'transparent',
                    stroke: '#fe854f',
                    'stroke-dasharray': '0'
                },
                '.inner': {
                    fill: '#fe854f',
                    stroke: 'transparent',
                    rx: 43,
                    ry: 21,
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '多个值',
                    'font-size': 11,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    fill: '#f6f6f6',
                    'stroke-width': 0
                }
            }
        },
        {
            type: 'erd.Derived',
            attrs: {
                root: {
                    dataTooltip: '派生',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.outer': {
                    fill: 'transparent',
                    stroke: '#fe854f',
                    'stroke-dasharray': '0'
                },
                '.inner': {
                    fill: '#feb663',
                    stroke: 'transparent',
                    'display': 'block',
                    'stroke-dasharray': '0'
                },
                text: {
                    text: '派生',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11,
                    'stroke-width': 0
                }
            }
        }
    ];

    App.config.stencil.shapes.uml = [

        {
            type: 'uml.Class',
            name: 'Class',
            attributes: ['+attr1'],
            methods: ['-setAttr1()'],
            size: {
                width: 150,
                height: 100
            },
            attrs: {
                root: {
                    dataTooltip: '类',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.uml-class-name-rect': {
                    top: 2,
                    fill: '#61549c',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8
                },
                '.uml-class-attrs-rect': {
                    top: 2,
                    fill: '#61549c',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8
                },
                '.uml-class-methods-rect': {
                    top: 2,
                    fill: '#61549c',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8
                },
                '.uml-class-name-text': {
                    ref: '.uml-class-name-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11
                },
                '.uml-class-attrs-text': {
                    ref: '.uml-class-attrs-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11
                },
                '.uml-class-methods-text': {
                    ref: '.uml-class-methods-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11
                }
            }
        },
        {
            type: 'uml.Interface',
            name: 'Interface',
            attributes: ['+attr1'],
            methods: ['-setAttr1()'],
            size: {
                width: 150,
                height: 100
            },
            attrs: {
                root: {
                    dataTooltip: '接口',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.uml-class-name-rect': {
                    fill: '#fe854f',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8
                },
                '.uml-class-attrs-rect': {
                    fill: '#fe854f',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8
                },
                '.uml-class-methods-rect': {
                    fill: '#fe854f',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8
                },
                '.uml-class-name-text': {
                    ref: '.uml-class-name-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11
                },
                '.uml-class-attrs-text': {
                    ref: '.uml-class-attrs-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-size': 11
                },
                '.uml-class-methods-text': {
                    ref: '.uml-class-methods-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11
                }
            }
        },
        {
            type: 'uml.Abstract',
            name: 'Abstract',
            attributes: ['+attr1'],
            methods: ['-setAttr1()'],
            size: {
                width: 150,
                height: 100
            },
            attrs: {
                root: {
                    dataTooltip: '抽象',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.uml-class-name-rect': {
                    fill: '#6a6c8a',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8
                },
                '.uml-class-attrs-rect': {
                    fill: '#6a6c8a',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8
                },
                '.uml-class-methods-rect': {
                    fill: '#6a6c8a',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8
                },
                '.uml-class-name-text': {
                    ref: '.uml-class-name-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11
                },
                '.uml-class-attrs-text': {
                    ref: '.uml-class-attrs-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11
                },
                '.uml-class-methods-text': {
                    ref: '.uml-class-methods-rect',
                    'ref-y': 0.5,
                    'y-alignment': 'middle',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 11
                }
            }
        },

        {
            type: 'uml.State',
            name: 'State',
            events: ['entry/', 'create()'],
            size: {
                width: 150,
                height: 100
            },
            attrs: {
                root: {
                    dataTooltip: '状态',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.uml-state-body': {
                    fill: '#feb663',
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    rx: 8,
                    ry: 8,
                    'stroke-dasharray': '0'
                },
                '.uml-state-separator': {
                    stroke: '#f6f6f6',
                    'stroke-width': 1,
                    'stroke-dasharray': '0'
                },
                '.uml-state-name': {
                    fill: '#f6f6f6',
                    'font-size': 11,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal'
                },
                '.uml-state-events': {
                    fill: '#f6f6f6',
                    'font-size': 11,
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal'
                }
            }
        }
    ];

    App.config.stencil.shapes.org = [

        {
            type: 'org.Member',
            attrs: {
                root: {
                    dataTooltip: '人员',
                    dataTooltipPosition: 'left',
                    dataTooltipPositionSelector: '.joint-stencil'
                },
                '.rank': {
                    text: '排名',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-size': 12,
                    'font-weight': 'Bold',
                    'text-decoration': 'none'
                },
                '.name': {
                    text: '人员',
                    fill: '#f6f6f6',
                    'font-family': 'Roboto Condensed',
                    'font-weight': 'Normal',
                    'font-size': 10
                },
                '.card': {
                    fill: '#31d0c6',
                    stroke: 'transparent',
                    'stroke-width': 0,
                    'stroke-dasharray': '0'
                },
                image: {
                    width: 32,
                    height: 32,
                    x: 16,
                    y: 13,
                    ref: null,
                    'ref-x': null,
                    'ref-y': null,
                    'y-alignment': null,
                    'xlink:href': '/js/plugins/Rappid/2.4.0/assets/member-male.png'
                }
            }
        }
    ];

})();
