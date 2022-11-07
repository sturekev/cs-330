import pyjokes

get = pyjokes.get_jokes()

get1 = pyjokes.get_jokes()[:10]
print(get1[1])
for i in get1:
    print(i)
print(len(get1))
