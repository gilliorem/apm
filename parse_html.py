import time
import re
import requests
from bs4 import BeautifulSoup
import json

#attendance_url = "https://www.myskillsfuture.gov.sg/api/take-attendance/RA688443"
# First: get the input list (that the APM has upload on the attendance page)

participant_list_file_path = '/home/regillio/var/www/html/apm/data/participants/participant-list.txt'

with open (participant_list_file_path, 'r') as f:
    participant_str = f.read();


#print(participant_str);

participant_list = participant_str.split('\n')
n_participants = len(participant_list);
print("number of participants: ",n_participants)

for i, p in enumerate(participant_list):
    participant_list[i] = p.upper();

for p in participant_list:
    print(p);


# Second: we read the ra-code
# So we can load the Skills Future Attendance Taking page.
# So we can get the *Attendance Code*
# Se we can get the trainer and trainee list
ra_file_path = '/home/regillio/var/www/html/apm/data/ra-code/ra-code.txt'

with open (ra_file_path, 'r') as f:
    ra_code = f.read();

print(ra_code);

attendance_url = "https://www.myskillsfuture.gov.sg/api/take-attendance/" + ra_code;
#url_with_code = "https://www.myskillsfuture.gov.sg/api/get-attendance?attendanceCode=CY62783&motCode=1&sortBy=createdDate_desc"

response = requests.get(attendance_url)
#print(response)

soup = BeautifulSoup(response.text, 'html.parser')
#print(soup)
scripts = soup.find_all('script')
for script in scripts:
    if script.string: # Check if the script has text inside
        # 2. Search for the pattern "attendanceCode=" followed by alphanumeric characters
        match = re.search(r'attendanceCode=([A-Z0-9]+)', script.string)
        print(match)
        if match:
            # 3. Extract the first "capturing group" (the part in parentheses)
            attendance_code = match.group(1)
            print(f"Found Code: {attendance_code}")
            break
        else:
            print("no match")


new_url = "https://www.myskillsfuture.gov.sg/api/get-attendance?attendanceCode=" + attendance_code + "&motCode=1&sortBy=createdDate_desc"
#print(new_url);


def refresh_attendance():
    #while True:
        response = requests.get(new_url);
        data = response.json();
        trainee_list = []
        trainer_list = []

        for trainee in data['attendees']:
            name = trainee.get('name')
            role = trainee.get('attendeeType')
            if (role == 'Trainee'):
                trainee_list.append(name);
            else:
                trainer_list.append(name);
        print("Trainers:", trainer_list);

        trainee_list.sort()
        n_trainee = len(trainee_list);
        print("Trainees:", trainee_list);

        missing = n_participants - n_trainee;
        print("missing", missing, "participants");

        missing_set = set(participant_list) - set(trainee_list);
        print("missing:", missing_set)

        with open('/home/regillio/var/www/html/apm/data/missing/missing.json', 'w') as f:
            json.dump(list(missing_set), f)

        #time.sleep(3);

refresh_attendance();
