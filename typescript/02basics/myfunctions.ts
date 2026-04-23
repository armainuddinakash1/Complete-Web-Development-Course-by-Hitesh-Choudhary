function addTwo(num: number): number {
  // num.toUpperCase();
    return num + 2;
    // return "hello"
}

let myValue = addTwo(3);

function getUpper(val: string): string {
    return val.toUpperCase();
}

getUpper("hello");
// getUpper(42);

function signUp(name: string, email: string, password: string, isPaid: boolean = false) {
    // Some code here
}

signUp("John Doe", "john@example.com", "password123");

function login(email: string, password: string) {
    // Some code here
}

login("john@example.com", "password123");

function getValue(myVal: number): boolean | string {
  if (myVal > 5) {
    return true;
  }
  return "200 OK";
};

const getHello = (s: string): string => {
    return "";
}

// const heros = ["thor", "spiderman", "ironman"];
const heros = [1, 2, 3];

heros.map((hero): string => {
    return `hero is ${hero}`;
})

function consoleError(errmsg: string): void {
    console.log(errmsg);
}

function handleError(errmsg: string): never {
  throw new Error(errmsg);
}