### setup
```
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### structure
1. chat gpt api is only for extracting labname and brief intro
2. member name need to prompting to chat gpt manually and paste in result (TODO: limited by token size, can be automated)

### usage
1. put urls for one department collected in source folder
2. reset everything by running ```./script/clear.sh```
3. ```python3 driver.py dep_name``` (dep_name need to follow google doc convention, see:  )
4. go to every result file and manually prompting to gpt and paste the member name back (remove prof.)
5. ```python3 gen_email.py```
6.  examine every result file.txt in result folder and insert into database
