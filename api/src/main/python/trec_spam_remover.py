import os

# open the file containing mapping of file > ham (note need to remove spam manually first)
ham = open("index").read().splitlines()

# get the filename
ham = [l2 for l1, l2 in (line.split() for line in ham)]

# get all files in the data directory
files = os.listdir("data")

for f in files:
    if "data/" + f not in ham:  # if it's not in our list of ham files it's spam
        os.remove("data/" + f)  # spam so remove it
