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

    var options = {

        colorPalette: [
            { content: 'transparent', icon: '/js/plugins/Rappid/2.4.0/assets/transparent-icon.svg' },
            { content: '#f6f6f6' },
            { content: '#dcd7d7' },
            { content: '#8f8f8f' },
            { content: '#c6c7e2' },
            { content: '#feb663' },
            { content: '#fe854f' },
            { content: '#b75d32' },
            { content: '#31d0c6' },
            { content: '#7c68fc' },
            { content: '#61549c' },
            { content: '#6a6c8a' },
            { content: '#4b4a67' },
            { content: '#3c4260' },
            { content: '#33334e' },
            { content: '#222138' }
        ],

        colorPaletteReset: [
            { content: undefined, icon: '/js/plugins/Rappid/2.4.0/assets/no-color-icon.svg' },
            { content: '#f6f6f6' },
            { content: '#dcd7d7' },
            { content: '#8f8f8f' },
            { content: '#c6c7e2' },
            { content: '#feb663' },
            { content: '#fe854f' },
            { content: '#b75d32' },
            { content: '#31d0c6' },
            { content: '#7c68fc' },
            { content: '#61549c' },
            { content: '#6a6c8a' },
            { content: '#4b4a67' },
            { content: '#3c4260' },
            { content: '#33334e' },
            { content: '#222138' }
        ],

        fontWeight: [
            { value: '300', content: '<span style="font-weight: 300">细化</span>' },
            { value: 'Normal', content: '<span style="font-weight: Normal">普通</span>' },
            { value: 'Bold', content: '<span style="font-weight: Bolder">加粗</span>' }
        ],

        fontFamily: [
            { value: 'Alegreya Sans', content: '<span style="font-family: Alegreya Sans">Alegreya Sans</span>' },
            { value: 'Averia Libre', content: '<span style="font-family: Averia Libre">Averia Libre</span>' },
            { value: 'Roboto Condensed', content: '<span style="font-family: Roboto Condensed">Roboto Condensed</span>' }
        ],

        strokeStyle: [
            { value: '0', content: '直线' },
            { value: '2,5', content: '点线' },
            { value: '10,5', content: '虚线' }
        ],

        side: [
            { value: 'top', content: '顶部' },
            { value: 'right', content: '右边' },
            { value: 'bottom', content: '底部' },
            { value: 'left', content: '左边' }
        ],

        portLabelPositionRectangle: [
            { value: { name: 'top', args: { y: -12 }}, content: '靠上' },
            { value: { name: 'right', args: { y: 0 }}, content: '靠右' },
            { value: { name: 'bottom', args: { y: 12 }}, content: '靠底' },
            { value: { name: 'left', args: { y: 0 }}, content: '靠左' }
        ],

        portLabelPositionEllipse: [
            { value: 'radial' , content: '水平' },
            { value: 'radialOriented' , content: '斜角' }
        ],

        imageIcons: [
            { value: '/js/plugins/Rappid/2.4.0/assets/image-icon1.svg', content: '<img height="42px" src="/js/plugins/Rappid/2.4.0/assets/image-icon1.svg"/>' },
            { value: '/js/plugins/Rappid/2.4.0/assets/image-icon2.svg', content: '<img height="80px" src="/js/plugins/Rappid/2.4.0/assets/image-icon2.svg"/>' },
            { value: '/js/plugins/Rappid/2.4.0/assets/image-icon3.svg', content: '<img height="80px" src="/js/plugins/Rappid/2.4.0/assets/image-icon3.svg"/>' },
            { value: '/js/plugins/Rappid/2.4.0/assets/image-icon4.svg', content: '<img height="80px" src="/js/plugins/Rappid/2.4.0/assets/image-icon4.svg"/>' }
        ],

        imageGender: [
            { value: '/js/plugins/Rappid/2.4.0/assets/member-male.png', content: '<img height="50px" src="/js/plugins/Rappid/2.4.0/assets/member-male.png" style="margin: 5px 0 0 2px;"/>' },
            { value: '/js/plugins/Rappid/2.4.0/assets/member-female.png', content: '<img height="50px" src="/js/plugins/Rappid/2.4.0/assets/member-female.png" style="margin: 5px 0 0 2px;"/>' }
        ],

        arrowheadSize: [
            { value: 'M 0 0 0 0', content: '无' },
            { value: 'M 0 -3 -6 0 0 3 z', content: '小' },
            { value: 'M 0 -5 -10 0 0 5 z', content: '中' },
            { value: 'M 0 -10 -15 0 0 10 z', content: '大' },
        ],

        strokeWidth: [
            { value: 1, content: '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
            { value: 2, content: '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>' },
            { value: 4, content: '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>' },
            { value: 8, content: '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>' }
        ],

        router: [
            { value: 'normal', content: '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
            { value: 'orthogonal', content: '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>' },
            { value: 'oneSide', content: '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>' }
        ],

        connector: [
            { value: 'normal', content: '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
            { value: 'rounded', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
            { value: 'smooth', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' }
        ],

        labelPosition: [
            { value: 30, content: '靠近源' },
            { value: 0.5, content: '在中间' },
            { value: -30, content: '靠近目标' },
        ],

        portMarkup: [{
            value: [{
                tagName: 'rect',
                selector: 'portBody',
                attributes: {
                    'width': 20,
                    'height': 20,
                    'x': -10,
                    'y': -10
                }
            }],
            content: '矩形'
        }, {
            value: [{
                tagName: 'circle',
                selector: 'portBody',
                attributes: {
                    'r': 10
                }
            }],
            content: '圆点'
        }, {
            value: [{
                tagName: 'path',
                selector: 'portBody',
                attributes: {
                    'd': 'M -10 -10 10 -10 0 10 z'
                }
            }],
            content: '箭头'
        }]
    };

    App.config.inspector = {

        'app.Link': {
            inputs: {
                attrs: {
                    line: {
                        strokeWidth: {
                            type: 'select-button-group',
                            options: options.strokeWidth,
                            group: 'connection',
                            label: '线条粗细',
                            when: { ne: { 'attrs/line/stroke': 'transparent' }},
                            index: 4
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            group: 'connection',
                            label: '线条样式',
                            when: { ne: { 'attrs/line/stroke': 'transparent' }},
                            index: 5
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            group: 'connection',
                            label: '颜色',
                            index: 6
                        },
                        sourceMarker: {
                            d: {
                                type: 'select-box',
                                options: options.arrowheadSize,
                                group: 'marker-source',
                                label: '源箭头',
                                index: 1
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPaletteReset,
                                group: 'marker-source',
                                label: '颜色',
                                when: { ne: { 'attrs/line/sourceMarker/d': 'M 0 0 0 0' }},
                                index: 2
                            }
                        },
                        targetMarker: {
                            d: {
                                type: 'select-box',
                                options: options.arrowheadSize,
                                group: 'marker-target',
                                label: '目标箭头',
                                index: 1
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPaletteReset,
                                group: 'marker-target',
                                label: '颜色',
                                when: { ne: { 'attrs/line/targetMarker/d': 'M 0 0 0 0' }},
                                index: 2
                            }
                        }
                    }
                },
                router: {
                    name: {
                        type: 'select-button-group',
                        options: options.router,
                        group: 'connection',
                        label: '连接类型',
                        index: 1
                    },
                    args: {
                        side: {
                            type: 'select-box',
                            options: options.side,
                            placeholder: '选择',
                            group: 'connection',
                            label: '锚边',
                            when: { eq: { 'router/name': 'oneSide' }, otherwise: { unset: true }},
                            index: 2
                        }
                    }
                },
                connector: {
                    name: {
                        type: 'select-button-group',
                        options: options.connector,
                        group: 'connection',
                        label: '连接样式',
                        index: 3
                    }
                },
                labels: {
                    type: 'list',
                    group: 'labels',
                    label: '标签',
                    attrs: {
                        label: {
                            'data-tooltip': '设置多个连接标签',
                            'data-tooltip-position': 'right',
                            'data-tooltip-position-selector': '.joint-inspector'
                        }
                    },
                    item: {
                        type: 'object',
                        properties: {
                            attrs: {
                                text: {
                                    text: {
                                        type: 'content-editable',
                                        label: 'text',
                                        defaultValue: 'label',
                                        index: 1,
                                        attrs: {
                                            label: {
                                                'data-tooltip': 'Set text of the label',
                                                'data-tooltip-position': 'right',
                                                'data-tooltip-position-selector': '.joint-inspector'
                                            }
                                        }
                                    },
                                    fill: {
                                        type: 'color-palette',
                                        options: options.colorPaletteReset,
                                        label: '文本颜色',
                                        index: 5
                                    }
                                },
                                rect: {
                                    fill: {
                                        type: 'color-palette',
                                        options: options.colorPaletteReset,
                                        label: '填充',
                                        index: 3
                                    },
                                    stroke: {
                                        type: 'color-palette',
                                        options: options.colorPaletteReset,
                                        label: '边框',
                                        index: 4
                                    }
                                }
                            },
                            position: {
                                type: 'select-box',
                                options: options.labelPosition || [],
                                defaultValue: 0.5,
                                label: '位置',
                                placeholder: '自定义',
                                index: 2,
                                attrs: {
                                    label: {
                                        'data-tooltip': 'Position the label relative to the source of the link',
                                        'data-tooltip-position': 'right',
                                        'data-tooltip-position-selector': '.joint-inspector'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            groups: {
                connection: {
                    label: '连接',
                    index: 1
                },
                'marker-source': {
                    label: '源箭头',
                    index: 2
                },
                'marker-target': {
                    label: '目标箭头',
                    index: 3
                },
                labels: {
                    label: '标签',
                    index: 4
                }
            }
        },
        'standard.Rectangle': {
            inputs: {
                attrs: {
                    label: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 5
                        }
                    },
                    body: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/body/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/body/stroke': 'transparent' }},
                                    { ne: { 'attrs/body/strokeWidth': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'standard.Ellipse': {
            inputs: {
                attrs: {
                    label: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 5
                        }
                    },
                    body: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/body/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/body/stroke': 'transparent' }},
                                    { ne: { 'attrs/body/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'standard.Polygon': {
            inputs: {
                attrs: {
                    label: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 5
                        }
                    },
                    body: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/body/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/body/stroke': 'transparent' }},
                                    { ne: { 'attrs/body/strokeWidth': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'standard.Cylinder': {
            inputs: {
                attrs: {
                    label: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 5
                        }
                    },
                    body: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/body/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/body/stroke': 'transparent' }},
                                    { ne: { 'attrs/body/strokeWidth': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    top: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'top',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'top',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'top',
                            when: { ne: { 'attrs/body/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'top',
                            when: {
                                and: [
                                    { ne: { 'attrs/body/stroke': 'transparent' }},
                                    { ne: { 'attrs/body/strokeWidth': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                top: {
                    label: '顶部',
                    index: 2
                },
                text: {
                    label: '文本',
                    index: 3
                }
            }
        },
        'standard.Image': {
            inputs: {
                attrs: {
                    label: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 5
                        }
                    },
                    image: {
                        xlinkHref: {
                            type: 'select-box',
                            options: options.imageIcons,
                            label: '图片',
                            group: 'presentation',
                            index: 1
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'standard.InscribedImage': {
            inputs: {
                attrs: {
                    label: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 5
                        }
                    },
                    image: {
                        xlinkHref: {
                            type: 'select-box',
                            options: options.imageIcons,
                            label: '图片',
                            group: 'presentation',
                            index: 1
                        }
                    },
                    background: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 2
                        }
                    },
                    border: {
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 3
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 10,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/border/stroke': 'transparent' }},
                            index: 4
                        }
                    }
                },
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'standard.EmbeddedImage': {
            inputs: {
                attrs: {
                    label: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 5
                        }
                    },
                    body: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/body/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/body/stroke': 'transparent' }},
                                    { ne: { 'attrs/body/strokeWidth': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    image: {
                        xlinkHref: {
                            type: 'select-box',
                            options: options.imageIcons,
                            label: '图片',
                            group: 'image',
                            index: 1
                        }
                    }
                }
            },
            groups: {
                image: {
                    label: '图片',
                    index: 1
                },
                presentation: {
                    label: '描述',
                    index: 2
                },
                text: {
                    label: '文本',
                    index: 3
                }
            }
        },
        'standard.HeaderedRectangle': {
            inputs: {
                attrs: {
                    bodyText: {
                        textWrap: {
                            text: {
                                type: 'content-editable',
                                label: '多行文本',
                                group: 'text',
                                index: 1
                            }
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/bodyText/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/bodyText/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/bodyText/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/boduText/text': '' }},
                            index: 5
                        }
                    },
                    headerText: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'headerText',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'headerText',
                            when: { ne: { 'attrs/headerText/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'headerText',
                            when: { ne: { 'attrs/headerText/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'headerText',
                            when: { ne: { 'attrs/headerText/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'headerText',
                            when: { ne: { 'attrs/headerText/text': '' }},
                            index: 5
                        }
                    },
                    body: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/body/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/body/stroke': 'transparent' }},
                                    { ne: { 'attrs/body/strokeWidth': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    header: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'header',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'header',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'header',
                            when: { ne: { 'attrs/header/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'header',
                            when: {
                                and: [
                                    { ne: { 'attrs/header/stroke': 'transparent' }},
                                    { ne: { 'attrs/header/strokeWidth': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                },
                header: {
                    label: '头部',
                    index: 3
                },
                headerText: {
                    label: '头部文本',
                    index: 4
                }
            }
        },
        'app.RectangularModel': {
            inputs: {
                attrs: {
                    label: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 5
                        }
                    },
                    body: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/body/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/body/stroke': 'transparent' }},
                                    { ne: { 'attrs/body/strokeWidth': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                },
                ports: {
                    items: {
                        group: 'ports',
                        type: 'list',
                        label: '点集合',
                        item: {
                            type: 'object',
                            properties: {
                                group: {
                                    type: 'select-button-group',
                                    label: '组',
                                    defaultValue: 'out',
                                    options: [
                                        { value: 'in', content: 'IN' },
                                        { value: 'out', content: 'OUT' }
                                    ]
                                },
                                attrs: {
                                    portLabel: {
                                        text: { type: 'text', label: '标签' }
                                    },
                                    portBody: {
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPaletteReset,
                                            label: '覆盖填充',
                                            index: 1
                                        }
                                    }
                                }
                            }
                        }
                    },
                    groups: {
                        'in': {
                            attrs: {
                                portBody: {
                                    fill: {
                                        type: 'color-palette',
                                        options: options.colorPalette,
                                        label: '填充',
                                        when: { not: { equal: { inPorts: [] }}},
                                        group: 'inPorts',
                                        index: 1
                                    }
                                }
                            },
                            position: {
                                name: {
                                    type: 'select-box',
                                    options: options.side,
                                    label: '位置',
                                    when: { not: { equal: { inPorts: [] }}},
                                    group: 'inPorts',
                                    index: 3
                                }
                            },
                            label: {
                                position: {
                                    type: 'select-box',
                                    options: options.portLabelPositionRectangle,
                                    label: '文本位置',
                                    when: { not: { equal: { inPorts: [] }}},
                                    group: 'inPorts',
                                    index: 4
                                }
                            },
                            markup: {
                                type: 'select-box',
                                options: options.portMarkup,
                                label: '点形状',
                                group: 'inPorts',
                                index: 5,
                                overwrite: true
                            }
                        },
                        'out': {
                            attrs: {
                                portBody: {
                                    fill: {
                                        type: 'color-palette',
                                        options: options.colorPalette,
                                        label: '填充',
                                        when: { not: { equal: { outPorts: [] }}},
                                        group: 'outPorts',
                                        index: 2
                                    }
                                }
                            },
                            position: {
                                name: {
                                    type: 'select-box',
                                    options: options.side,
                                    label: '位置',
                                    when: { not: { equal: { outPorts: [] }}},
                                    group: 'outPorts',
                                    index: 4
                                }
                            },
                            label: {
                                position: {
                                    type: 'select-box',
                                    options: options.portLabelPositionRectangle,
                                    label: '文本位置',
                                    when: { not: { equal: { outPorts: [] }}},
                                    group: 'outPorts',
                                    index: 5
                                }
                            },
                            markup: {
                                type: 'select-box',
                                options: options.portMarkup,
                                label: '点形状',
                                group: 'outPorts',
                                index: 6,
                                overwrite: true
                            }
                        }
                    }
                }
            },
            groups: {
                inPorts: {
                    label: '输入点样式',
                    index: 1
                },
                outPorts: {
                    label: '输出点样式',
                    index: 2
                },
                ports: {
                    label: '点',
                    index: 3
                },
                presentation: {
                    label: '描述',
                    index: 4
                },
                text: {
                    label: '文本',
                    index: 5
                }
            }
        },
        'app.CircularModel': {
            inputs: {
                attrs: {
                    label: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        fontSize: {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 2
                        },
                        fontFamily: {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 3
                        },
                        fontWeight: {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/label/text': '' }},
                            index: 5
                        }
                    },
                    body: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        strokeWidth: {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/body/stroke': 'transparent' }},
                            index: 3
                        },
                        strokeDasharray: {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/body/stroke': 'transparent' }},
                                    { ne: { 'attrs/body/strokeWidth': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                },
                ports: {
                    items: {
                        group: 'ports',
                        type: 'list',
                        label: '点',
                        item: {
                            type: 'object',
                            properties: {
                                group: {
                                    type: 'select-button-group',
                                    label: '组',
                                    defaultValue: 'out',
                                    options: [
                                        { value: 'in', content: 'IN' },
                                        { value: 'out', content: 'OUT' }
                                    ]
                                },
                                attrs: {
                                    portLabel: {
                                        text: { type: 'text', label: '标签' }
                                    },
                                    portBody: {
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPaletteReset,
                                            label: '覆盖填充',
                                            index: 1
                                        }
                                    }
                                }
                            }
                        }
                    },
                    groups: {
                        'in': {
                            attrs: {
                                portBody: {
                                    fill: {
                                        type: 'color-palette',
                                        options: options.colorPalette,
                                        label: '填充',
                                        when: { not: { equal: { 'ports/items': [] }}},
                                        group: 'inPorts',
                                        index: 1
                                    }
                                }
                            },
                            position: {
                                args: {
                                    startAngle: {
                                        type: 'range',
                                        min: 0,
                                        max: 360,
                                        step: 1,
                                        defaultValue: 0,
                                        unit: '°',
                                        label: '位置',
                                        when: { not: { equal: { 'ports/items': [] }}},
                                        group: 'inPorts',
                                        index: 3
                                    }
                                }
                            },
                            label: {
                                position: {
                                    name: {
                                        type: 'select-button-group',
                                        options: options.portLabelPositionEllipse,
                                        label: '文本方向',
                                        when: { not: { equal: { 'ports/items': [] }}},
                                        group: 'inPorts',
                                        index: 4
                                    }
                                }
                            },
                            markup: {
                                type: 'select-box',
                                options: options.portMarkup,
                                label: '点形状',
                                group: 'inPorts',
                                index: 5,
                                overwrite: true
                            }
                        },
                        'out': {
                            attrs: {
                                portBody: {
                                    fill: {
                                        type: 'color-palette',
                                        options: options.colorPalette,
                                        label: '填充',
                                        when: { not: { equal: { 'ports/items': [] }}},
                                        group: 'outPorts',
                                        index: 2
                                    }
                                }
                            },
                            position: {
                                args: {
                                    startAngle: {
                                        type: 'range',
                                        min: 0,
                                        max: 360,
                                        step: 1,
                                        defaultValue: 180,
                                        unit: '°',
                                        label: '位置',
                                        when: { not: { equal: { 'ports/items': [] }}},
                                        group: 'outPorts',
                                        index: 4
                                    }
                                }
                            },
                            label: {
                                position: {
                                    name: {
                                        type: 'select-button-group',
                                        options: options.portLabelPositionEllipse,
                                        label: '文本位置',
                                        when: { not: { equal: { 'ports/items': [] }}},
                                        group: 'outPorts',
                                        index: 5
                                    }
                                }
                            },
                            markup: {
                                type: 'select-box',
                                options: options.portMarkup,
                                label: '点形状',
                                group: 'outPorts',
                                index: 6,
                                overwrite: true
                            }
                        }
                    }
                }
            },
            groups: {
                inPorts: {
                    label: '输入点样式',
                    index: 1
                },
                outPorts: {
                    label: '输出点样式',
                    index: 2
                },
                ports: {
                    label: '点',
                    index: 3
                },
                presentation: {
                    label: '描述',
                    index: 4
                },
                text: {
                    label: '文本',
                    index: 5
                }
            }
        },
        'fsa.StartState': {
            inputs: {
                attrs: {
                    circle: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                }
            }
        },
        'fsa.EndState': {
            inputs: {
                attrs: {
                    '.outer': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                    { ne: { 'attrs/.outer/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    '.inner': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '内部填充',
                            group: 'presentation',
                            index: 2
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'fsa.State': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    circle: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/circle/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/circle/stroke': 'transparent' }},
                                    { ne: { 'attrs/circle/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'pn.Place': {
            inputs: {
                attrs: {
                    '.label': {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/.label/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/.label/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/.label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/.label/text': '' }},
                            index: 5
                        }
                    },
                    '.root': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/.root/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/.root/stroke': 'transparent' }},
                                    { ne: { 'attrs/.root/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                },
                tokens: {
                    type: 'number',
                    min: 1,
                    max: 500,
                    group: 'data',
                    index: 1
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 2
                },
                text: {
                    label: '文本',
                    index: 3
                },
                data: {
                    label: 'Data',
                    index: 1
                }
            }
        },
        'pn.Transition': {
            inputs: {
                attrs: {
                    '.label': {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/.label/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/.label/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/.label/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/.label/text': '' }},
                            index: 5
                        }
                    },
                    rect: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/rect/stroke': 'transparent' }},
                            index: 2
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/rect/stroke': 'transparent' }},
                                    { ne: { 'attrs/rect/stroke-width': 0 }}
                                ]
                            },
                            index: 3
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'erd.Entity': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    '.outer': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                    { ne: { 'attrs/.outer/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'erd.WeakEntity': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    '.outer': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'outer',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'outer',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'outer',
                            when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'outer',
                            when: {
                                and: [
                                    { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                    { ne: { 'attrs/.outer/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    '.inner': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'inner',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'inner',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'inner',
                            when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'inner',
                            when: {
                                and: [
                                    { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                    { ne: { 'attrs/.inner/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                text: {
                    label: '文本',
                    index: 1
                },
                outer: {
                    label: '外部矩形',
                    index: 2
                },
                inner: {
                    label: '内部矩形',
                    index: 3
                }
            }
        },
        'erd.Relationship': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    '.outer': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                    { ne: { 'attrs/.outer/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'erd.IdentifyingRelationship': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    '.outer': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'outer',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'outer',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'outer',
                            when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'outer',
                            when: {
                                and: [
                                    { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                    { ne: { 'attrs/.outer/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    '.inner': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'inner',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'inner',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'inner',
                            when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'inner',
                            when: {
                                and: [
                                    { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                    { ne: { 'attrs/.inner/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                text: {
                    label: '文本',
                    index: 1
                },
                outer: {
                    label: '外部形状',
                    index: 2
                },
                inner: {
                    label: '内部形状',
                    index: 3
                }
            }
        },
        'erd.Key': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    '.outer': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'outer',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'outer',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'outer',
                            when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'outer',
                            when: {
                                and: [
                                    { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                    { ne: { 'attrs/.outer/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    '.inner': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'inner',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'inner',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'inner',
                            when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'inner',
                            when: {
                                and: [
                                    { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                    { ne: { 'attrs/.inner/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                text: {
                    label: '文本',
                    index: 1
                },
                outer: {
                    label: '外部椭圆',
                    index: 2
                },
                inner: {
                    label: '内部椭圆',
                    index: 3
                }
            }
        },
        'erd.Normal': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    '.outer': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                    { ne: { 'attrs/.outer/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'erd.Multivalued': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    '.outer': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'outer',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'outer',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'outer',
                            when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'outer',
                            when: {
                                and: [
                                    { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                    { ne: { 'attrs/.outer/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    '.inner': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'inner',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'inner',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'inner',
                            when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'inner',
                            when: {
                                and: [
                                    { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                    { ne: { 'attrs/.inner/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                text: {
                    label: '文本',
                    index: 1
                },
                outer: {
                    label: '外部椭圆',
                    index: 2
                },
                inner: {
                    label: '内部椭圆',
                    index: 3
                }
            }
        },
        'erd.Derived': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    '.outer': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'outer',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'outer',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'outer',
                            when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'outer',
                            when: {
                                and: [
                                    { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                    { ne: { 'attrs/.outer/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    '.inner': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'inner',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'inner',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'inner',
                            when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'inner',
                            when: {
                                and: [
                                    { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                    { ne: { 'attrs/.inner/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                text: {
                    label: '文本',
                    index: 1
                },
                outer: {
                    label: '外部椭圆',
                    index: 2
                },
                inner: {
                    label: '内部椭圆',
                    index: 3
                }
            }
        },
        'erd.ISA': {
            inputs: {
                attrs: {
                    text: {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'attrs/text/text': '' }},
                            index: 5
                        }
                    },
                    polygon: {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/polygon/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/polygon/stroke': 'transparent' }},
                                    { ne: { 'attrs/polygon/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '文本',
                    index: 2
                }
            }
        },
        'uml.Class': {
            inputs: {
                attrs: {
                    '.uml-class-name-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'name',
                            index: 4
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'name',
                            index: 5
                        }
                    },
                    '.uml-class-attrs-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'attributes',
                            index: 4
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'attributes',
                            index: 5
                        }
                    },
                    '.uml-class-methods-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'methods',
                            index: 4
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'methods',
                            index: 5
                        }
                    }
                },
                name: {
                    type: 'text',
                    group: 'name',
                    index: 1,
                    label: '类名称'
                },
                attributes: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'attributes',
                    index: 1,
                    label: '属性'
                },
                methods: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'methods',
                    index: 1,
                    label: '方法'
                }
            },
            groups: {
                name: {
                    label: '类名称',
                    index: 1
                },
                attributes: {
                    label: '属性',
                    index: 2
                },
                methods: {
                    label: '方法',
                    index: 3
                }
            }
        },
        'uml.Interface': {
            inputs: {
                attrs: {
                    '.uml-class-name-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'name',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'name',
                            index: 2
                        }
                    },
                    '.uml-class-attrs-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'attributes',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'attributes',
                            index: 2
                        }
                    },
                    '.uml-class-methods-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'methods',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'methods',
                            index: 2
                        }
                    }
                },
                name: {
                    type: 'text',
                    group: 'name',
                    index: 0,
                    label: '接口名称'
                },
                attributes: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'attributes',
                    index: 0,
                    label: '属性'
                },
                methods: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: '方法',
                    index: 0,
                    label: '方法'
                }
            },
            groups: {
                name: {
                    label: '接口名称',
                    index: 1
                },
                attributes: {
                    label: '属性',
                    index: 2
                },
                methods: {
                    label: '方法',
                    index: 3
                }
            }
        },
        'uml.Abstract': {
            inputs: {
                attrs: {
                    '.uml-class-name-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'name',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'name',
                            index: 2
                        }
                    },
                    '.uml-class-attrs-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'attributes',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'attributes',
                            index: 2
                        }
                    },
                    '.uml-class-methods-rect': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'methods',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'methods',
                            index: 2
                        }
                    }
                },
                name: {
                    type: 'text',
                    group: 'name',
                    index: 0,
                    label: '抽象名称'
                },
                attributes: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'attributes',
                    index: 0,
                    label: '属性'
                },
                methods: {
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    group: 'methods',
                    index: 0,
                    label: '方法'
                }
            },
            groups: {
                name: {
                    label: '抽象名称',
                    index: 1
                },
                attributes: {
                    label: '属性',
                    index: 2
                },
                methods: {
                    label: '方法',
                    index: 3
                }
            }
        },
        'uml.State': {
            inputs: {
                name: {
                    group: 'text',
                    index: 1,
                    type: 'text',
                    label: '名称'
                },
                events: {
                    group: 'events',
                    index: 1,
                    type: 'list',
                    item: {
                        type: 'text'
                    },
                    label: '事件'
                },
                attrs: {
                    '.uml-state-name': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'text',
                            when: { ne: { 'name': '' }},
                            index: 5
                        }
                    },
                    '.uml-state-body': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/.uml-state-body/stroke': 'transparent' }},
                            index: 4
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/.uml-state-body/stroke': 'transparent' }},
                                    { ne: { 'attrs/.uml-state-body/stroke-width': 0 }}
                                ]
                            },
                            index: 5
                        }
                    },
                    '.uml-state-separator': {
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '水平分割线',
                            group: 'presentation',
                            index: 3
                        }
                    },
                    '.uml-state-events': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'events',
                            when: { ne: { 'events': 0 }},
                            index: 5
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 1
                },
                text: {
                    label: '状态名称',
                    index: 2
                },
                events: {
                    label: '状态事件',
                    index: 3
                }
            }
        },
        'org.Member': {
            inputs: {
                attrs: {
                    '.rank': {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'rank',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'rank',
                            when: { ne: { 'attrs/.rank/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'rank',
                            when: { ne: { 'attrs/.rank/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'rank',
                            when: { ne: { 'attrs/.rank/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'rank',
                            when: { ne: { 'attrs/.rank/text': '' }},
                            index: 5
                        }
                    },
                    '.name': {
                        text: {
                            type: 'content-editable',
                            label: '文本',
                            group: 'name',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 80,
                            unit: 'px',
                            label: '字体大小',
                            group: 'name',
                            when: { ne: { 'attrs/.name/text': '' }},
                            index: 2
                        },
                        'font-family': {
                            type: 'select-box',
                            options: options.fontFamily,
                            label: '字体',
                            group: 'name',
                            when: { ne: { 'attrs/.name/text': '' }},
                            index: 3
                        },
                        'font-weight': {
                            type: 'select-box',
                            options: options.fontWeight,
                            label: '字体粗细',
                            group: 'name',
                            when: { ne: { 'attrs/.name/text': '' }},
                            index: 4
                        },
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'name',
                            when: { ne: { 'attrs/.name/text': '' }},
                            index: 5
                        }
                    },
                    '.card': {
                        fill: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '填充',
                            group: 'presentation',
                            index: 1
                        },
                        stroke: {
                            type: 'color-palette',
                            options: options.colorPalette,
                            label: '边框',
                            group: 'presentation',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 30,
                            step: 1,
                            defaultValue: 1,
                            unit: 'px',
                            label: '边框粗细',
                            group: 'presentation',
                            when: { ne: { 'attrs/.card/stroke': 'transparent' }},
                            index: 3
                        },
                        'stroke-dasharray': {
                            type: 'select-box',
                            options: options.strokeStyle,
                            label: '边框样式',
                            group: 'presentation',
                            when: {
                                and: [
                                    { ne: { 'attrs/.card/stroke': 'transparent' }},
                                    { ne: { 'attrs/.card/stroke-width': 0 }}
                                ]
                            },
                            index: 4
                        }
                    },
                    image: {
                        'xlink:href': {
                            type: 'select-button-group',
                            options: options.imageGender,
                            label: '性别',
                            group: 'gender',
                            index: 1
                        }
                    }
                }
            },
            groups: {
                presentation: {
                    label: '描述',
                    index: 4
                },
                rank: {
                    label: '排名',
                    index: 2
                },
                name: {
                    label: '名称',
                    index: 3
                },
                gender: {
                    label: '性别',
                    index: 1
                }
            }
        }
    };

})();
