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
```
# Create environment
conda create -n scisheets-widget-env python=2.7 notebook numpy pandas nb_conda

# Mac/Linux:
source activate scisheets-widget-env

# Windows:
activate scisheets-widget-env

# Install other packages
conda install -c conda-forge ipywidgets nodejs

# To remove environment
conda env remove --name scisheets-widget-env
```

Installing the package
```
# Clone the repo
git clone https://github.com/ScienceStacks/jupyter_scisheets_widget.git
cd jupyter_scisheets_widget

# Installing jupyter_scisheets_widget
python setup.py build
pip install -e .

jupyter nbextension install --py --symlink --sys-prefix jupyter_scisheets_widget
jupyter nbextension enable --py --sys-prefix jupyter_scisheets_widget
```


To install use pip:

    $ pip install jupyter_scisheets_widget
    $ jupyter nbextension enable --py --sys-prefix jupyter_scisheets_widget


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
