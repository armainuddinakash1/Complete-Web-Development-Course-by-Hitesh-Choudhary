let user: [string, number, boolean] = ["Akash", 1, true];

user = ["Akash", 1, true];

let rgb: [number, number, number] = [255, 255, 255];

type User = [number, string]

const user2: User = [121, "akash@gmail.com"]

user2[0] = 122

user2.push("true")
// user2.push(true)