let score: number | string = 33;

score = "55";

score = 44;

type User = {
    name: string;
    id: number;
};

type Admin = {
    username: string;
    id: number;
};

let akash: User | Admin = { name: "Akash", id: 1 };

akash = { username: "Akash123", id: 1 };


/*
function getDbId(id: number | string) {
    console.log(`DB id is: ${id}`);

}

getDbId(3);
getDbId("3");
*/

function getDbId(id: number | string) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}

// array

const data: number[] = [1, 2, 3];

const data2: string[] = ["1", "2", "3"];

const data3: (number | string)[] = [1, "2", 3];

let seatAllotment: "aisle" | "middle" | "window";
seatAllotment = "aisle";
// seatAllotment = "akash"