import random, sys

input_file = sys.argv[1]
training_file = sys.argv[2]
test_file = sys.argv[3]

# write a random number before each line
with open(input_file, 'r') as source:
    data = [(random.random(), line) for line in source]

# sort the lines (using the added random number)
data.sort()

i = 1
with open(training_file, 'w') as training:
    with open(test_file, 'w') as test:
        for _, line in data:  # write the line back without the random number
            if i in (3, 6, 9):
                test.write(line)
            else:
                training.write(line)

            if i == 10:
                i = 0
            i = i + 1
