var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var handsontable_css = require('handsontable/dist/handsontable.full.css');

import Handsontable from 'handsontable/dist/handsontable.full.js';

// Create the model
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

        console.log('lets render a table!');
  
        // Create the table and place in the notebook output
        this.$table = $('<div />')
            .attr('id', 'table_' + (table_id++))
            .appendTo(this.$el);

        // Get the model's values (JSON);
        var cell_data = this.model.get('_model_data');
        var header_data = this.model.get('_model_header');
        var index_data = this.model.get('_model_index');

        // Get the model's JSON strings and parse them
        var cell_data_mod = JSON.parse(cell_data);
        var header_data_mod = JSON.parse(header_data);
        var index_data_mod = JSON.parse(index_data);  

        // Create the Handsontable table.
        this.$table.handsontable({
            data: cell_data_mod,
            colHeaders: header_data_mod,
            columnSorting: true,
            manualColumnResize: true,
            sortIndicator: true
        }); 

    },

    update: function() {
        // PYTHON --> JS UPDATE.

        console.log('update function is running');

        // Get the model's values (JSON);
        var cell_data = this.model.get('_model_data');
        var header_data = this.model.get('_model_header');
        var index_data = this.model.get('_model_index');

        // Get the model's JSON strings and parse them
        var cell_data_mod = JSON.parse(cell_data);
        var header_data_mod = JSON.parse(header_data);
        var index_data_mod = JSON.parse(index_data);  
   
        // Give the parsed data to the Handsontable widget
        this.$table.handsontable({
            data: cell_data_mod,
            colHeaders: header_data_mod,
            columnSorting: true,
            manualColumnResize: true,
            sortIndicator: true
            //rowHeaders: rowheadermod
        });
    
        // Don't touch this...
        return SciSheetTableView.__super__.update.apply(this);
    },  
    
    // Tell Backbone to listen to the change event of input controls.
  
    events: {"change": "handle_table_change"},    

    handle_table_change: function(event) {
        // JS --> PYTHON UPDATE.
        console.log('now events is running');

        // Get table instance
        var ht = this.$table.handsontable('getInstance');

        // Get the data and serialize it
        var data_vals = JSON.stringify(ht.getData());    
        var col_vals = JSON.stringify(ht.getColHeader());
       
        // Change the widget data 
        this.model.set('_model_data', data_vals);
        this.model.set('_model_header', col_vals);

        // Don't touch this...
        this.touch();
    },  

});

module.exports = {
    SciSheetTableModel: SciSheetTableModel,
    SciSheetTableView: SciSheetTableView
};
