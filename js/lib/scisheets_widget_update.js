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
        // Get the model's value (JSON);
        var json = this.model.get('_model_data');
        // Get the model's JSON string and parse it
        var datamod = JSON.parse(json);
        // Create the Handsontable table.
        this.$table.handsontable({
            data: datamod["data"],
            colHeaders: datamod["columns"]
        });
            
    },

});

module.exports = {
    SciSheetTableModel: SciSheetTableModel,
    SciSheetTableView: SciSheetTableView
};
