/*
const User = {
    name: "John Doe",
    email: "john@example.com",
    isActive: true,
};

function createUser({name, ispaid}: {name: string, ispaid: boolean}) {}

let newUser = { name: "Jane Smith", ispaid: true, email: "jane@example.com" };

createUser(newUser)

interface UserInput {
    name: string;
    price: number;
}

function createCourse(): UserInput {
    return { name: "TypeScript Course", price: 9.99 };
}
*/

/*
type User = {
    name: string;
    email: string;
    isActive: boolean;
}

function createUser(user: User): User {
    return user;
}

createUser({name: "John Doe", email: "john@example.com", isActive: true})
*/

type User = {
    readonly _id: string;
    name: string;
    email: string;
    isActive: boolean;
    creditCardDetails?: number;
};

let myUser: User = {
    _id: "12345",
    name: "John Doe",
    email: "john@example.com",
    isActive: false,
    creditCardDetails: 1234567890,
};

type cardNumber = {
    cardnumber: number;
};

type cardDate = {
    carddate: string;
};

type cardDetails = cardNumber &
    cardDate & {
        cvv: number;
    };

myUser.email = "john.doe@example.com";
// myUser._id = "54321";
