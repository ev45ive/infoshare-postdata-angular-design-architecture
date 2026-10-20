```ts


type emptySet = never; // BOTTOM TYPE/SET
type undefinedValue = undefined;

type Fruits = 'apple' | 'banana' | 'pear';
type Food = Fruits | 'pizza' | never | never; //  Fruits | "pizza"

type x = { x: number };
type y = { y: number };

type point = x & y;
type pointX = x & { x: '123' }; // never

let p: point = { x: 1, y: 2 };

const banana = 'banana'; // "banana"
let money = 'money'; // string

// TOP TYPE/SET
// type everything = any;
// evernythig.get.me.a.million.dollars().now() // unsafe!

type everything = unknown; // Safe

const random: everything = 'królik' as const;

// Type narrowing:
if (typeof random === 'string') {
  random.length;
  if (random === 'królik') {
    random;
  }
}


```