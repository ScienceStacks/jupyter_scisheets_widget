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
        console.log('lets render a table!');

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

        console.log('update function is running');
    
        // Get the model's value (JSON)
        var json_model = this.model.get('_model_data')
   
        // Get the model's JSON string, and parse it. 
        var datamod = JSON.parse(json_model);

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
        console.log('now events is running');

        // Get table instance
        var ht = this.$table.handsontable('getInstance');

        // Get the data and serialize it
        var data_vals = JSON.stringify(ht.getData());    
        var col_vals = JSON.stringify(ht.getColHeader());
        console.log(data_vals);
        console.log(col_vals);
        
        var ht_data = JSON.stringify(ht.getSourceDataArray());
        console.log(ht_data); 

        var dict= {
            data: data_vals,
            columns: col_vals
        };
        var dict1={};
        dict1['"data"'] = data_vals;
        dict1['"columns"'] = col_vals;
        console.log(dict);
        console.log(dict1);
        console.log(JSON.stringify(dict));
        console.log(JSON.stringify(dict1));
        //this.model.set('_model_header', JSON.stringify(dict1));
        this.model.set('_model_data', JSON.stringify(dict1));
        //this.model.set('_model_data', ht_data);    

        // Don't touch this...
        this.touch();
    },  

});

module.exports = {
    SciSheetTableModel: SciSheetTableModel,
    SciSheetTableView: SciSheetTableView
};
