/*! Rappid v2.4.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2019-07-01 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


(function(joint, util) {

    joint.shapes.app.NavigatorElementView = joint.dia.ElementView.extend({

        body: null,

        markup: [{
            tagName: 'rect',
            selector: 'body',
            attributes: {
                'fill': '#31d0c6'
            }
        }],

        initialize: function() {
            this.listenTo(this.model, 'change:position', this.translate);
            this.listenTo(this.model, 'change:size', this.resize);
            this.listenTo(this.model, 'change:angle', this.rotate);
        },

        render: function() {
            var doc = util.parseDOMJSON(this.markup);
            this.body = doc.selectors.body;
            this.el.appendChild(doc.fragment);
            this.update();
        },

        update: function() {
            var size = this.model.get('size');
            this.body.setAttribute('width', size.width);
            this.body.setAttribute('height', size.height);
            this.updateTransformation();
        }
    });

    joint.shapes.app.NavigatorLinkView = joint.dia.LinkView.extend({

        initialize: util.noop,

        render: util.noop,

        update: util.noop
    });

})(joint, joint.util);
