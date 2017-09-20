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

    @default('layout')
    def _default_layout(self):
        return widgets.Layout(height='400px', align_self='stretch')

    def load_df(self, df):
        if type(df) == pd.core.frame.DataFrame:
            self._model_data = df.to_json(orient='split')
        else:
            print('Please enter a pandas dataframe')

    def load_list(self, list_data):
        if type(list_data) == list:    
            self._model_data = json.dumps(list_data)
        else:
            print('Please enter a list')

    def set_data(self, initial_data):
        self._model_data = initial_data
        # check if initial_data is a list
        #if type(initial_data) == list:
        #    self._model_data = json.dumps(initial_data)
        # check if initial_data is a pandas dataframe
        #elif type(initial_data) == pd.core.frame.DataFrame:
        #    self._model_data = initial_data.to_json(orient='records')
        #else:
        #    print('Please enter a list or dataframe')

class HandsonDataFrame(object):
    def __init__(self, df):
        self._df = df
        self._widget = SciSheetTable()
        self._widget.observe(self._on_data_changed, '_model_data')
        self._widget.unobserve(self._on_displayed)

    def _on_displayed(self, e):
        # DataFrame ==> Widget (upon initialization only)
        json = self._df.to_json(orient='values')
        self._widget.value = json
        
    def _on_data_changed(self, e, val):
        # Widget ==> DataFrame (called every time the user
        # changes a value in the graphical widget)
        buf = StringIO.StringIO(val)
        self._df = pd.read_json(buf, orient='values')
        
    def to_dataframe(self):
        return self._df
        
    def show(self):
        display(self._widget)
