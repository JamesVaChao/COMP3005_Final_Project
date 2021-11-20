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

Install pip:
python -m pip install -U --force pip

Then run:
pip install -r requirements.txt

You are now setup.

Troubleshoot:
if you are missing modules, run "pip install -r requirements.txt" without quotes


The command
>pip freeze 
will print all intalled python modules, if you make a change to the modules used, 
run this command to check the version of the module installed and then add the 
module to the requirements.txt