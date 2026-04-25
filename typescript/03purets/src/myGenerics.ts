const score: Array<number> = [];

const names: Array<string> = [];

function identityOne(val: boolean | number): boolean | number {
  return val;
}

function identityTwo(val: any): any {
  return val;
}

function identityThree<Type>(val: Type): Type {
  return val;
}

// identityThree("akash")

function identityFour<T>(val: T): T {
  return val;
}

interface Bottle {
  brand: string;
  type: number;
}

identityFour<Bottle>({ brand: "pepsi", type: 4 });

function getSearchProducts<T>(products: T[]): T {
  // do some database operations
  // produc't index
  const productIndex = 3;
  if (products.length <= productIndex)
    throw new Error(`array must have ${productIndex + 1} items`);
  return products[productIndex]!;
}

const getMoreSearchProducts = <T>(products: T[]): T => {
  // do some database operations
  // produc't index
  const productIndex = 4;
  if (products.length <= productIndex)
    throw new Error(`array must have ${productIndex + 1} items`);
  return products[productIndex]!;
};

interface Database {
  connection: string;
  username: string;
  password: string;
}

function anotherFunction<T, U extends Database>(valOne: T, valTwo: U): object {
  return {
    valOne,
    valTwo,
  };
}

anotherFunction(3, { connection: "", username: "", password: "" });

interface Quiz {
  name: string;
  type: string;
}

interface Course {
  name: string;
  author: string;
  subject: string;
}

class Sellable<T> {
  public cart: T[] = []

  addToCart(product: T){
    this.cart.push(product)
  }
}