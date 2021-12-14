Get started:

Create a virtual env:
# Linux
sudo apt-get install python3-venv    # If needed
python3 -m venv .venv
source .venv/bin/activate

# macOS
python3 -m venv .venv
source .venv/bin/activate

# Windows
py -3 -m venv .venv
.venv\scripts\activate

If any of these scripts give you "cannot load because script is disabled on system" then follow this:
https://stackoverflow.com/questions/56199111/visual-studio-code-cmd-error-cannot-be-loaded-because-running-scripts-is-disabl/67420296#67420296

Then in vscode, change the console to the terminal that has elevated commands and rerun the scripts

These commands should make the prompt have a (.venv) in front of every command to indicate you are working in a virutal environment.
You can then swap to this environemnt with Ctrl+Shift+P, search for "Python: Select Interpreter" then select "Python <Python Version> ('.venv' : venv)"

Install pip:
python -m pip install -U --force pip

Then run:
pip install -r requirements.txt

You can also configure the launch.json by searching for it with Ctrl+Shift+P. This will let the key F5 always run then intended python file.

You are now setup.

Troubleshoot:
ModuleNotFoundError: If you are missing modules, rerun "pip install -r requirements.txt" without quotes
ModuleNotFoundError: If a module is still missing, Ctrl+Shift+P, search for "Python: Select Interpreter" and make sure VScode's python is "Python <Version number> ('.venv':venv)"


The command
>pip freeze 
will print all intalled python modules, if you make a change to the modules used, 
run this command to check the version of the module installed and then add the 
module to the requirements.txt