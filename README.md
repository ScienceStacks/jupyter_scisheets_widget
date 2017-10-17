jupyter_scisheets_widget
===============================

Incorporating SciSheets into Jupyter

This widget allows pandas dataframe to be rendered as a data grid (spreadsheet)
by using handsontable.

______________________________________________________
******** This widget is still in development! ********
------------------------------------------------------

Installation
------------

[comment]: # (
To install use pip:

    $ pip install jupyter_scisheets_widget
    $ jupyter nbextension enable --py --sys-prefix jupyter_scisheets_widget
)

For a development installation (requires npm),

    $ git clone https://github.com/ScienceStacks/jupyter_scisheets_widget.git
    $ cd jupyter_scisheets_widget
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix jupyter_scisheets_widget
    $ jupyter nbextension enable --py --sys-prefix jupyter_scisheets_widget

If changes are made to the code, you can reinstall the widget using:
    $ jupyter nbextension uninstall --py --sys-prefix jupyter_scisheets_widget
    $ rm -rf jupyter_scisheets_widget/static/
    $ python setup.py build
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix jupyter_scisheets_widget
    $ jupyter nbextension enable --py --sys-prefix jupyter_scisheets_widget

You can alternatively run:
    $ bash build_widget.sh
                                                                    
