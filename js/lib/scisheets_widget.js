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

    update: function() {
        // PYTHON --> JS UPDATE.
    
        // Get the model's value (JSON)
        var json_model = this.model.get('_model_data')
        //var json_model = this.model.get('_model_data');
        //var json_header = this.model.get('_model_header');
        //var json_row_header = this.model.get('_model_row_header');
   
        //console.log(json_row_header);
 
        // Get the model's JSON string, and parse it. 
        var datamod = JSON.parse(json_model);
        //var headermod = JSON.parse(json_header);
        //var rowheadermod = JSON.parse(json_row_header);

        //console.log(headermod);
        //console.log(rowheadmod);

        // Give it to the Handsontable widget.
        this.$table.handsontable({
            data: datamod["data"],
            colHeaders: datamod["columns"]
            //colHeaders: headermod,
            //rowHeaders: rowheadermod
        });
    
        // Don't touch this...
        return SciSheetTableView.__super__.update.apply(this);
    },  
    
    // Tell Backbone to listen to the change event of input controls.
  
    events: {"change": "handle_table_change"},    

    handle_table_change: function(event) {
        // JS --> PYTHON UPDATE.

        // Get table instance
        var ht = this.$table.handsontable('getInstance');

        // Get the data and serialize it
        var json_vals = JSON.stringify(ht.getData());    
        var col_vals = JSON.stringify(ht.getColHeader());
        console.log(json_vals);
        console.log(col_vals);
        //var row_vals = JSON.stringify(ht.getRowHeader());

        var dict= {};
        dict["data"] = json_vals;
        dict["columns"] = col_vals;
        var dict1= {};
        dict1['data'] = json_vals;
        dict1['columns'] = col_vals;
        // Update the model with the JSON string.
        //var dict = [];
        //dict.push({
        //    key: "data",
        //    value: json_vals
        //});
        //dict.push({
        //    key: "columns",
        //    value: col_vals
        //});
        console.log(dict1);
        console.log(JSON.stringify(dict1));
        console.log(dict);
        console.log(JSON.stringify(dict));
        this.model.set('_model_data', JSON.stringify(dict1));
        //this.model.set('_model_header', col_vals);
        //this.model.set('_model_row_header', row_vals);
    
        // Don't touch this...
        this.touch();
    },  

});

module.exports = {
    SciSheetTableModel: SciSheetTableModel,
    SciSheetTableView: SciSheetTableView
};
