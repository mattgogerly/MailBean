import random, sys

input_file = sys.argv[1]
output_file = sys.argv[2]

# write a random number before each line
with open(input_file, 'r') as source:
    data = [(random.random(), line) for line in source]

# sort the lines (using the added random number)
data.sort()

with open(output_file, 'w') as target:
    for _, line in data:  # write the line back without the random number
        target.write(line)
