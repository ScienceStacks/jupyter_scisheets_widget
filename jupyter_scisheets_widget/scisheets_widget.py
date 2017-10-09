import ast
import json
import StringIO
import ipywidgets as widgets
import numpy as np
import pandas as pd
from IPython.display import display
from traitlets import Unicode
from traitlets import default
from traitlets import List

class SciSheetTable(widgets.DOMWidget):

    _view_name = Unicode('SciSheetTableView').tag(sync=True)
    _model_name = Unicode('SciSheetTableModel').tag(sync=True)
    _view_module = Unicode('jupyter_scisheets_widget').tag(sync=True)
    _model_module = Unicode('jupyter_scisheets_widget').tag(sync=True)
    _model_data = Unicode().tag(sync=True)
    _model_header = Unicode().tag(sync=True)
    _model_index = Unicode().tag(sync=True)


    @default('layout')
    def _default_layout(self):
        return widgets.Layout(height='400px', align_self='stretch')


class HandsonDataFrame(object):
    def __init__(self, df):
        self._df = df
        self._widget = SciSheetTable()
        self._on_displayed(self)
        self._widget.observe(self._on_data_changed, '_model_data')
        self._widget.unobserve(self._on_displayed)

    def _on_displayed(self, e):
        if type(self._df) == pd.core.frame.DataFrame:
            model_data = self._df.to_json(orient='split')
            model_data = ast.literal_eval(model_data)
            self._widget._model_data = json.dumps(model_data['data'])
            self._widget._model_header = json.dumps(model_data['columns']) 
            self._widget._model_index = json.dumps(model_data['index']) 
        else:
            print('Please enter a pandas dataframe')

    def _on_data_changed(self, e):
        # Widget ==> DataFrame (called every time the user
        # changes a value in the graphical widget)
        print('data is being changed')
        data_dict = ast.literal_eval(self._widget._model_data)
        col_dict = ast.literal_eval(self._widget._model_header)
        index_dict = ast.literal_eval(self._widget._model_index)
        updated_df = pd.DataFrame(data=data_dict, index=index_dict, 
                                  columns=col_dict)
        # Note this will have to be more robust if new rows and/or
        # columns are added to the widget
        self._df.update(updated_df)        

    def to_dataframe(self):
        return self._df
        
    def show(self):
        display(self._widget)
