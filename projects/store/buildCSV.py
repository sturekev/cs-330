import csv

header = ['name', 'category', 'price']
data = [
    ['Jordan 1 Dior', 'sneaker', 13000],
    ['Stepen curry 6', 'sneaker', 300],
    ['Jordan 1 Micheal Jordan', 'sneaker', 90000],
    ['Jeezy V2 Zebra','sneaker', 1200],
    ['Jordan 1 Mid Orange','sneaker', 350]
]

with open('countries.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)

    # write the header
    writer.writerow(header)

    # write multiple rows
    writer.writerows(data)