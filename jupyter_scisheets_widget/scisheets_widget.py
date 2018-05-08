import json
import ipywidgets as widgets
import numpy as np
import pandas as pd
from IPython.display import display
from traitlets import Unicode
from traitlets import default
from traitlets import List

class SciSheetTable(widgets.DOMWidget):
    # Name of the view in JS 
    _view_name = Unicode('SciSheetTableView').tag(sync=True)
    # Name of the model in JS
    _model_name = Unicode('SciSheetTableModel').tag(sync=True)
    # Namespace for the view (name of JS package)
    _view_module = Unicode('jupyter_scisheets_widget').tag(sync=True)
    # Namespace for the module (name of JS package)
    _model_module = Unicode('jupyter_scisheets_widget').tag(sync=True)
    # Defines the data (contents of cells) 
    _model_data = Unicode().tag(sync=True)
    # Defines the header information
    _model_header = Unicode().tag(sync=True)
    # Defines the index information
    _model_index = Unicode().tag(sync=True)

    # Set the default layout
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
        """
        Converts DataFrame to json and defines self._widget values
        """
        if type(self._df) == pd.core.frame.DataFrame:
            model_data = self._df.to_json(orient='split')
            model_data = json.loads(model_data)
            self._widget._model_data = json.dumps(model_data['data'])
            self._widget._model_header = json.dumps(model_data['columns'])
            self._widget._model_index = json.dumps(model_data['index'])
        else:
            print('Please enter a pandas dataframe')

    def _on_data_changed(self, e):
        """ 
        Pulls data from the handsontable whenever the user changes a value
        in the table
        """
        data_dict = json.loads(self._widget._model_data)
        col_dict = json.loads(self._widget._model_header)
        index_dict = json.loads(self._widget._model_index)
        updated_df = pd.DataFrame(data=data_dict, index=index_dict,
                                  columns=col_dict)
        # Note this will have to be more robust if new rows and/or
        # columns are added to the widget
        self._df.update(updated_df)        

    def to_dataframe(self):
        """ 
        Update the original DataFrame
        """ 
        return self._df
        
    def show(self):
        """ 
        Display the widget
        """          
        display(self._widget)
