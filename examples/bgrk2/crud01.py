#!/use/bin/env/python3

def read_csv (filename:str):

    all_gmae = []
    with open(filename, "r", encoding= "utf-8") as dataFile:
        for line in dataFile:
            all_gmae.append(line.strip().split(","))
    return all_gmae
