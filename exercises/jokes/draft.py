import pyjokes

get = pyjokes.get_joke()

get1 = pyjokes.get_jokes(language="de", category="neutral")[:10]
print(get1[1])
for i in get1:
    print(i)
print(len(get1))
