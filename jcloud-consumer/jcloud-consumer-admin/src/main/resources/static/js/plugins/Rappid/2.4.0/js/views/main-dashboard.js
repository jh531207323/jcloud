/*! Rappid v2.4.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2019-07-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


var App = window.App || {};

(function (_, joint) {

    'use strict';

    App.MainView = joint.mvc.View.extend({

        className: 'app',

        events: {
            'focus input[type="range"]': 'removeTargetFocus',
            'mousedown': 'removeFocus',
            'touchstart': 'removeFocus'
        },

        removeTargetFocus: function (evt) {
            evt.target.blur();
        },

        removeFocus: function () {
            document.activeElement.blur();
            window.getSelection().removeAllRanges();
        },

        init: function () {

            this.initializePaper();
            this.initializeStencil();
            this.initializeSelection();
            this.initializeToolsAndInspector();
            this.initializeNavigator();
            this.initializeToolbar();
            this.initializeKeyboardShortcuts();
            this.initializeTooltips();
        },

        // Create a graph, paper and wrap the paper in a PaperScroller.
        initializePaper: function () {

            var graph = this.graph = new joint.dia.Graph;

            graph.on('add', function (cell, collection, opt) {
                if (opt.stencil) this.createInspector(cell);
            }, this);

            this.commandManager = new joint.dia.CommandManager({graph: graph});

            var paper = this.paper = new joint.dia.Paper({
                width: 1000,
                height: 1000,
                gridSize: 10,
                drawGrid: true,
                model: graph,
                defaultLink: new joint.shapes.app.Link,
                defaultConnectionPoint: joint.shapes.app.Link.connectionPoint,
                interactive: {linkMove: false}
            });

            paper.on('blank:mousewheel', _.partial(this.onMousewheel, null), this);
            paper.on('cell:mousewheel', this.onMousewheel, this);

            this.snaplines = new joint.ui.Snaplines({paper: paper});

            var paperScroller = this.paperScroller = new joint.ui.PaperScroller({
                paper: paper,
                autoResizePaper: true,
                cursor: 'grab'
            });

            this.$('.paper-container').append(paperScroller.el);
            paperScroller.render().center();
        },

        // Create and populate stencil.
        initializeStencil: function () {

            var stencil = this.stencil = new joint.ui.Stencil({
                label: "监控面板",
                paper: this.paperScroller,
                snaplines: this.snaplines,
                scaleClones: true,
                width: 240,
                groups: App.config.stencil.groups,
                dropAnimation: true,
                groupsToggleButtons: true,
                search: {
                    '*': ['type', 'attrs/text/text', 'attrs/label/text', 'attrs/.label/text'],
                    'org.Member': ['attrs/.rank/text', 'attrs/.name/text']
                },
                // Use default Grid Layout
                layout: {
                    columnWidth: 70,
                    columns: 3,
                    rowHeight: 50,
                }
            });

            this.$('.stencil-container').append(stencil.el);
            stencil.render().load(App.config.stencil.shapes);
        },

        initializeKeyboardShortcuts: function () {

            this.keyboard = new joint.ui.Keyboard();
            this.keyboard.on({}, this);
        },

        initializeSelection: function () {

            this.clipboard = new joint.ui.Clipboard();
            this.selection = new joint.ui.Selection({
                paper: this.paper,
                handles: App.config.selection.handles,
                useModelGeometry: true
            });

            // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
            // Otherwise, initiate paper pan.
            this.paper.on('blank:pointerdown', function (evt, x, y) {

                if (this.keyboard.isActive('shift', evt)) {
                    this.selection.startSelecting(evt);
                } else {
                    this.selection.cancelSelection();
                    this.paperScroller.startPanning(evt, x, y);
                    this.paper.removeTools();
                }

            }, this);

            this.paper.on('element:pointerdown', function (elementView, evt) {

            }, this);

            this.selection.on('selection-box:pointerdown', function (elementView, evt) {

            }, this);
        },

        createInspector: function (cell) {

            return joint.ui.Inspector.create('.inspector-container', _.extend({
                cell: cell
            }, App.config.inspector[cell.get('type')]));
        },

        initializeToolsAndInspector: function () {

            this.paper.on({

                //paper元素点击事件
                'element:pointerup': function (elementView) {

                    if(!window.checkNode(elementView.model.attributes))
                    {
                        return;
                    }

                    var element = elementView.model;

                    if (this.selection.collection.contains(element)) return;

                    var halo = new joint.ui.Halo({
                        cellView: elementView,
                        handles: App.config.halo.handles,
                        type: 'toolbar',
                        boxContent: function (b, c) {
                            return b.model.get('type');
                        }
                    });

                    // Adding a custom action.
                    //halo.addHandle({ name: 'myaction', position: 's', icon: 'images/myaction.png' });
                    halo.on('action:startNode:pointerdown', function (evt) {
                        evt.stopPropagation();

                        if (window.startNode) {
                            window.startNode(element);
                        }
                    });
                    halo.on('action:stopNode:pointerdown', function (evt) {
                        evt.stopPropagation();

                        if (window.stopNode) {
                            window.stopNode(element);
                        }
                    });
                    halo.on('action:suspendNode:pointerdown', function (evt) {
                        evt.stopPropagation();

                        if (window.suspendNode) {
                            window.suspendNode(element);
                        }
                    });
                    halo.on('action:configNode:pointerdown', function (evt) {
                        evt.stopPropagation();

                        if (window.configNode) {
                            window.configNode(element);
                        }
                    });

                    halo.render();

                    this.selection.collection.reset([]);
                    //this.selection.collection.add(element, { silent: true });
                    this.selection.collection.add(element);

                    this.paper.removeTools();

                    this.createInspector(element);
                },

                'link:pointerup': function (linkView) {

                },

                'link:mouseenter': function (linkView) {

                },

                'link:mouseleave': function (linkView) {

                }

            }, this);

            this.graph.on('change', function (cell, opt) {

                if (!cell.isLink() || !opt.inspector) return;

                var ns = joint.linkTools;
                var toolsView = new joint.dia.ToolsView({
                    name: 'link-inspected',
                    tools: [
                        new ns.Boundary({padding: 15}),
                    ]
                });

                cell.findView(this.paper).addTools(toolsView);

            }, this)
        },

        initializeNavigator: function () {

            var navigator = this.navigator = new joint.ui.Navigator({
                width: 240,
                height: 115,
                paperScroller: this.paperScroller,
                zoom: false,
                paperOptions: {
                    elementView: joint.shapes.app.NavigatorElementView,
                    linkView: joint.shapes.app.NavigatorLinkView,
                    cellViewNamespace: { /* no other views are accessible in the navigator */}
                }
            });

            this.$('.navigator-container').append(navigator.el);
            navigator.render();
        },

        initializeToolbar: function () {

            var toolbar = this.toolbar = new joint.ui.Toolbar({
                groups: App.config.toolbar.groups,
                tools: App.config.toolbar.tools,
                references: {
                    paperScroller: this.paperScroller,
                    commandManager: this.commandManager
                }
            });

            toolbar.on({
                'flowRun:pointerclick': _.bind(this.flowRun, this),
                'flowStop:pointerclick': _.bind(this.flowStop, this),
                'flowSuspend:pointerclick': _.bind(this.flowSuspend, this),
                'layout:pointerclick': _.bind(this.layoutDirectedGraph, this),
                'snapline:change': _.bind(this.changeSnapLines, this),
                'grid-size:change': _.bind(this.paper.setGridSize, this.paper)
            });

            this.$('.toolbar-container').append(toolbar.el);
            toolbar.render();
        },

        changeSnapLines: function (checked) {

            if (checked) {
                this.snaplines.startListening();
                this.stencil.options.snaplines = this.snaplines;
            } else {
                this.snaplines.stopListening();
                this.stencil.options.snaplines = null;
            }
        },

        initializeTooltips: function () {

            new joint.ui.Tooltip({
                rootTarget: document.body,
                target: '[data-tooltip]',
                direction: 'auto',
                padding: 10
            });
        },

        // backwards compatibility for older shapes
        exportStylesheet: '.scalable * { vector-effect: non-scaling-stroke }',

        //运行流程
        flowRun: function () {

            if (window.flowRun) {
                window.flowRun();
            }
        },

        //停止流程
        flowStop: function () {
            if (window.flowStop) {
                window.flowStop();
            }
        },

        //挂机流程
        flowSuspend: function () {
            if (window.flowSuspend) {
                window.flowSuspend();
            }
        },

        onMousewheel: function (cellView, evt, x, y, delta) {

            if (this.keyboard.isActive('alt', evt)) {
                evt.preventDefault();
                this.paperScroller.zoom(delta * 0.2, {min: 0.2, max: 5, grid: 0.2, ox: x, oy: y});
            }
        },

        layoutDirectedGraph: function () {

            joint.layout.DirectedGraph.layout(this.graph, {
                setLinkVertices: true,
                rankDir: 'TB',
                marginX: 100,
                marginY: 100
            });

            this.paperScroller.centerContent();
        }
    });

})(_, joint);
