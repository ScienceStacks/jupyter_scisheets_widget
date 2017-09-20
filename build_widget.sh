jupyter nbextension uninstall --py --sys-prefix jupyter_scisheets_widget

rm -rf jupyter_scisheets_widget/static/

python setup.py build
pip install -e .

jupyter nbextension install --py --symlink --sys-prefix jupyter_scisheets_widget
jupyter nbextension enable --py --sys-prefix jupyter_scisheets_widget
