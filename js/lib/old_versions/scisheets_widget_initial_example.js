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

// Custom View. Renders the widget model.
var SciSheetTableView = widgets.DOMWidgetView.extend({
    render: function() {
        var data = function () {
            return Handsontable.helper.createSpreadsheetData(100, 10);
        };

//        var data_df = this.model.get("_model_data");

        var container = this.el;

        var hot = new Handsontable(container, {
          data: data(),
          minSpareCols: 1,
          minSpareRows: 1,
          rowHeaders: true,
          colHeaders: true,
          contextMenu: true
        });       
    }
});

module.exports = {
    SciSheetTableModel: SciSheetTableModel,
    SciSheetTableView: SciSheetTableView
};
