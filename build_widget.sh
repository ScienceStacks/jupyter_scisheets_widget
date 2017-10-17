# Uninstall notebook extenstion
jupyter nbextension uninstall --py --sys-prefix jupyter_scisheets_widget

# Remove static folder
rm -rf jupyter_scisheets_widget/static/

# Install the python package
python setup.py build
pip install -e .

# Install and enable the notebook extension
jupyter nbextension install --py --symlink --sys-prefix jupyter_scisheets_widget
jupyter nbextension enable --py --sys-prefix jupyter_scisheets_widget
