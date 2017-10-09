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
    _model_data = Unicode('Welcome!').tag(sync=True)
    _model_header = Unicode().tag(sync=True)
    #_model_row_header = Unicode().tag(sync=True)


    @default('layout')
    def _default_layout(self):
        return widgets.Layout(height='400px', align_self='stretch')

    def load_df(self, df):
        if type(df) == pd.core.frame.DataFrame:
            model_data = df.to_json(orient='split')
            #import pdb; pdb.set_trace();
            print(model_data)
            model_data = ast.literal_eval(model_data)
            print(model_data)
            self._model_data = json.dumps(model_data)
            print(self._model_data)
            #self._model_data = json.dumps(model_data['data'])
            #self._model_header = json.dumps(model_data['columns']) 
            #self._model_row_header = json.dumps(model_data['index']) 
        else:
            print('Please enter a pandas dataframe')

    def load_list(self, list_data):
        if type(list_data) == list:    
            self._model_data = json.dumps(list_data)
        else:
            print('Please enter a list')


class HandsonDataFrame(object):
    def __init__(self, df):
        self._df = df
        self._widget = SciSheetTable()
        self._on_displayed(self)
        self._widget.observe(self._on_data_changed, '_model_data')
        self._widget.unobserve(self._on_displayed)

    def _on_displayed(self, e):
        if type(self._df) == pd.core.frame.DataFrame:
            print('on displayed')
            model_data = self._df.to_json(orient='split')
            print(model_data)
            model_data = ast.literal_eval(model_data)
            print(model_data)
            self._widget._model_data = json.dumps(model_data)
            print(self._widget._model_data)
            #self._widget._model_data = json.dumps(model_data['data'])
            #self._widget._model_header = json.dumps(model_data['columns']) 
            #self._widget._model_row_header = json.dumps(model_data['index']) 
        else:
            print('Please enter a pandas dataframe')

    def _on_data_changed(self, e):
        # Widget ==> DataFrame (called every time the user
        # changes a value in the graphical widget)
        print('data is being changed')
        print(self._widget._model_data)
        self._widget._model_header = self._widget._model_data    
        #data_dic = {}
        #data_dic['columns'] = ast.literal_eval(self._widget._model_header)
        #data_dic['index'] = ast.literal_eval(self._widget._model_row_header)
        #data_dic['data'] = ast_literal_eval(self._widget._model_data)
        #data_dic = ast.literal_eval(self._widget._model_data)
        #self._df = pd.read_json(json.dumps(data_dic), orient='split')
        #self._df = pd.read_json(json.dumps(data_dic), orient='split')
        
    def to_dataframe(self):
        return self._df
        
    def show(self):
        display(self._widget)
