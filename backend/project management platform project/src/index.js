import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const name = process.env.name

console.log(name);


console.log("Start of backend project");