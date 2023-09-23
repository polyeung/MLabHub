import psycopg2
import os
import json
from dateutil.parser import parse
from dateutil import tz
import random
from dotenv import load_dotenv
import json
from util import get_round
from datetime import datetime
from gen_labels import gen_labels_from_url, get_labels
# Load the .env file
load_dotenv()

valid_labels = {"UI/UX": "",\
"Robotics": "",\
"WebDev": "",\
"AI": "Artificial Intelligence",\
"ML": "Machine Learning",\
"CompVis": "Computer Vision",\
"NLP": "Natural Language Processing",\
"Cybersec": "Cybersecurity",\
"Quantum": "",\
"AR": "Augmented Reality",\
"VR": "Virtual Reality",\
"Blockchain": "",\
"Bioinfo": "Bioinformatics",\
"HCI": "Human-Computer Interaction",\
"SoftEng": "Software Engineering",\
"Embedded": "",\
"NetCom": "Network & Communication",\
"Cloud": "",\
"IoT": "Internet of Things",\
"DataSci": "Data Science",\
"Graphics": "",\
"Gaming": "",\
"MobileApp": "",\
"DSP": "Digital Signal Processing",\
"Crypto": "Cryptography",\
"EnergyComp": "Energy-efficient Computing",\
"E-Health": "",\
"CompBio": "Computational Biology",\
"Systems": "",\
"AutoSys": "Autonomous Systems",\
"GreenComp": "Sustainability & Computing",\
"HPC": "High-Performance Computing",\
"DistSys": "Distributed Systems",\
"CogPsych": "Cognitive Psychology",
"BehavPsych": "Behavioral Psychology",
"DevPsych": "Developmental Psychology",
"SocPsych": "Social Psychology",
"ClinPsych": "Clinical Psychology",
"NeuroPsych": "Neuropsychology",
"HealthPsych": "Health Psychology",
"ForenPsych": "Forensic Psychology",
"PosPsych": "Positive Psychology",
"EvoPsych": "Evolutionary Psychology",
"CellBio": "Cellular Biology",
"MolBio": "Molecular Biology",
"Genetics": "",
"EvoBio": "Evolutionary Biology",
"Ecology": "",
"AnatPhys": "Anatomy & Physiology",
"Microbio": "Microbiology",
"Botany": "Study of Plants",
"Zoology": "Study of Animals",
"Biotech": "Biotechnology",

"IntMed": "Internal Medicine",
"Surgery": "",
"Pediatrics": "Child Health",
"ObGyn": "Obstetrics & Gynecology (Women's Health and Childbirth)",
"Cardio": "Cardiology (Heart and Blood Vessels)",
"Endocr": "Endocrinology (Hormones and Glands)",
"Neuro": "Neurology (Nervous System)",
"Psychiatry": "Mental Health",
"Radiology": "Imaging Techniques",
"Oncology": "Cancer Treatment and Research",
}



def insert_labs():
    global info
        
    # Database configuration
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASS = os.getenv("DB_PASS")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")

    # Construct the database URL
    DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    try:
        # Connect to the database
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
        # select random tags
        cursor.execute("SELECT COUNT(*) FROM labs;")
        count = cursor.fetchone()[0]
        if count > 0:
            print("got labs!", count)



        
        sql = "SELECT id,link FROM labs;"
        # values = (lab['name'], lab['url'], lab['intro'], lab['people'], lab['dep'], "NA", True, lab['emails'],1, datetime.now())  # Replace 'value1', 'value2', etc. with your actual values
            
        # Execute the query
        cursor.execute(sql, values)

        # # Commit the changes
        # conn.commit()

        print("Data inserted successfully!")

        # Close the cursor and connection
        cursor.close()
        conn.close()
        print("Connection closed.")
    except Exception as e:
        print("Error:", e)
res = []
def gen_init_labels():
    with open("./all_links.txt", 'r') as f:
        for line in f:
            id, url = line.strip().split(',')

            labels = gen_labels_from_url(url, False)
            res.append([id, url, labels])
    
    print(res)

def refine_labels():
    res1 = [['1', 'https://web.eecs.umich.edu/~xwanghci/lab.html', 'HCI, AI, NLP'], ['30', 'https://theory.engin.umich.edu/', 'Labels: Theory'], ['31', 'https://cse-teaching.engin.umich.edu/', 'SoftEng'], ['32', 'https://systems.engin.umich.edu/', 'Systems'], ['33', 'https://hcc.engin.umich.edu/', 'HCI'], ['34', 'https://ce.engin.umich.edu/', 'Labels: Embedded, Systems'], ['35', 'https://ai.engin.umich.edu/', 'AI Lab'], ['36', 'https://radlab.engin.umich.edu/', 'Electromagnetics, Radar, Wireless, Antennas, Remote Sensing, RF Circuits'], ['37', 'http://websites.umich.edu/~ocm/', 'Optoelectronic Components and Materials Group, Research, Organic Electronics, Photovoltaic Cells, OLED, Outcoupling, Thermophotovoltaic cells, Roll-to-Roll Fabrication System'], ['38', 'https://optics.engin.umich.edu/', 'Optics & Photonics Lab - Optics & Photonics Lab: Optics, Photonics'], ['40', 'https://mpel.engin.umich.edu/', 'EnergyComp'], ['41', 'https://mint.engin.umich.edu/', 'Labels: Bioinfo, Systems'], ['42', 'https://ipan.engin.umich.edu/', 'labels from the list above that are appropriate for the description are: Neurotech, Embedded'], ['43', 'https://cuos.engin.umich.edu/', 'Appropriate labels from the list for the description above are: \n- UI/UX\n- Robotics\n- WebDev\n- AI\n- ML\n- CompVis\n- NLP\n- Cybersec\n- Quantum\n- AR\n- VR\n- Blockchain\n- Bioinfo\n- HCI\n- SoftEng\n- Embedded\n- NetCom\n- Cloud\n- IoT\n- DataSci\n- Graphics\n- Gaming\n- MobileApp\n- DSP\n- EnergyComp\n- CompBio\n- Systems\n- AutoSys\n- GreenComp\n- HPC\n- DistSys\n- Theory'], ['44', 'https://dynamo.engin.umich.edu/', 'Labels: EnergyComp, Systems'], ['45', 'https://micl.engin.umich.edu/', 'Embedded, IoT, Systems'], ['39', 'https://network-games-muri.engin.umich.edu/', 'Labels: NetCom, Cybersec, Systems'], ['46', 'https://michiganictd.org/', 'Labels: HCI, SoftEng, Systems'], ['48', 'http://edtech.labs.si.umich.edu/', 'Appropriate labels from the list for the description are: \n- Learning Analytics\n- Educational Data Mining'], ['49', 'https://iarg.si.umich.edu/', 'HCI, Digital Curation, Information Science'], ['50', 'https://www.mi2lab.com/', 'HCI, AR, VR'], ['52', 'http://www-personal.umich.edu/~annastef/PCL_Lab.html', 'Embedded, AutoSys'], ['53', 'https://sms.engin.umich.edu/', 'Labels: Smart Materials and Structures'], ['54', 'https://avm.engin.umich.edu/', 'Labels: Manufacturing, Research, Collaboration'], ['55', 'https://brg.engin.umich.edu/', 'Labels: Robotics, Human-robot Interaction, Localization and Mapping, Smart Manufacturing, Decision-making, Energy Systems'], ['56', 'https://jwo.engin.umich.edu/', 'Labels: Research'], ['57', 'https://arc.engin.umich.edu/', 'Robotics, AI, Systems'], ['58', 'https://www-personal.umich.edu/~epureanu/', 'Labels: Systems, Bioinfo, Robotics, CompBio'], ['59', 'https://stml.engin.umich.edu/', 'SoftEng'], ['60', 'https://me.engin.umich.edu/people/faculty/noel-perkins/', 'Labels: Mechanical Engineering'], ['61', 'https://me-web.engin.umich.edu/ibbl/', 'Bioinfo, CompBio, Systems'], ['62', 'https://www.kines.umich.edu/research/labs-centers/michigan-performance-research-laboratory', 'Labels: Robotics, WebDev, AI, ML, CompVis, NLP, Cybersec, HCI, SoftEng, Systems'], ['63', 'https://brl.engin.umich.edu/', 'Labels: Research'], ['64', 'https://bme.umich.edu/research-area/bio-micro-nanotechnology-and-molecular-engineering/bio-mems-and-microfluidics/', 'Bioinfo, Systems'], ['65', 'https://autolab.engin.umich.edu/', 'Labels: Automotive Engineering'], ['51', 'https://ledlab.si.umich.edu/', 'UI/UX, WebDev, HCI'], ['66', 'https://sms.engin.umich.edu/', 'Labels: Smart Materials and Structures'], ['67', 'https://imtl.engin.umich.edu/', 'Labels: Embedded, Systems'], ['68', 'https://mc2.engin.umich.edu/', 'Labels: Robotics, WebDev'], ['70', 'https://adera.engin.umich.edu', 'Labels: EnergyComp'], ['71', 'https://htp.engin.umich.edu/members/', 'Members - Heat Transfer Physics\n\nLabels: Systems'], ['72', 'https://sites.google.com/umich.edu/violilab/home', 'WebDev'], ['73', 'http://websites.umich.edu/~nanomech/', 'Labels: Bioinfo, Systems'], ['74', 'https://cmite.bme.umich.edu/', 'Labels: Bioinfo, SoftEng'], ['75', 'https://shearesearch.engin.umich.edu/', 'Labels: Bioinfo, Systems, CompBio'], ['76', 'https://denglab.engin.umich.edu/', 'Bioinfo, Systems']]
    with open("./refined_label.txt", 'w') as f:
        for id,url,labels in res1:
            labels.replace('\n', ' ')
            f.write(f"{id}|{url}|{labels}\n")


def insert_labels():
    # Database configuration
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASS = os.getenv("DB_PASS")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    label_dict = get_labels('./labels_test.json')
    # Construct the database URL
    DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    try:
        # Connect to the database
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        with open("./refined_label.txt", 'r') as f:
            for line in f:
                id, url, labels = line.strip().split("|")
                for label in labels.strip().split(","):
                    label = label.strip()

                    if label in label_dict:
                        # where we can insert label
                        print(f"Inserting for lab {id}")
                        sql = "INSERT INTO lab_label (labs, fullname, shortname) VALUES (%s, %s, %s)"
                        values = (id, label_dict[label],label)
                        # Execute the query
                        cursor.execute(sql, values)
                        # # Commit the changes
                        conn.commit()

                        print("Data inserted successfully!")

        # Close the cursor and connection
        cursor.close()
        conn.close()
        print("Connection closed.")
    except Exception as e:
        print("Error:", e)

    



if __name__ == '__main__':
        
    # gen_init_labels()
    insert_labels()
    