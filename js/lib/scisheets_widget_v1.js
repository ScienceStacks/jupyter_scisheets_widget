var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var handsontable_css = require('handsontable/dist/handsontable.full.css');

import Handsontable from 'handsontable/dist/handsontable.full.js';

var SciSheetTableModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'), {
        _model_name : 'SciSheetTableModel',
        _view_name : 'SciSheetTableView',
        _model_module : 'jupyter_scisheets_widget',
        _view_module : 'jupyter_scisheets_widget',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0'
    })
});

var table_id = 0;

// Custom View. Renders the widget model.
var SciSheetTableView = widgets.DOMWidgetView.extend({
    render: function(){
        // CREATION OF THE WIDGET IN THE NOTEBOOK.
            
        // Add a <div> in the widget area.
        this.$table = $('<div />')
            .attr('id', 'table_' + (table_id++))
            .appendTo(this.$el);
        // Create the Handsontable table.
        this.$table.handsontable({
        });
            
    },

    update: function() {
        // PYTHON --> JS UPDATE.
            
        // Get the model's JSON string, and parse it.
        var data = $.parseJSON(this.model.get('value'));
        // Give it to the Handsontable widget.
        this.$table.handsontable({data: data});
            
        // Don't touch this...
        return HandsonTableView.__super__.update.apply(this);
    },
        
    // Tell Backbone to listen to the change event of input controls.
    events: {"change": "handle_table_change"},
        
    handle_table_change: function(event) {
        // JS --> PYTHON UPDATE.
            
        // Get the table instance.
        var ht = this.$table.handsontable('getInstance');
        // Get the data, and serialize it in JSON.
        var json = JSON.stringify(ht.getData());
        // Update the model with the JSON string.
        this.model.set('value', json);
            
        // Don't touch this...
        this.touch();
    },

//    render: function() {
//        var data = function () {
//            return Handsontable.helper.createSpreadsheetData(100, 10);
//        };
//
//        var container = this.el;
//
//        var hot = new Handsontable(container, {
//          data: data(),
//          minSpareCols: 1,
//          minSpareRows: 1,
//          rowHeaders: true,
//          colHeaders: true,
//          contextMenu: true
//        });       
//    }
});

module.exports = {
    SciSheetTableModel: SciSheetTableModel,
    SciSheetTableView: SciSheetTableView
};
