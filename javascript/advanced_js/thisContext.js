const person = {
    name: "Akash",
    greet() {
        console.log(`Hi, I am ${this.name}`);
    },
};
// person.greet();

const greetFunction = person.greet;
// greetFunction();

const boundGreet = person.greet.bind({ name: "John" });
// boundGreet();

// bind, call, apply

const game = {
    title: "Sonic the hedgehog",
    year: 1991,
};

function info(platform, character) {
    console.log(
        `${this.title} was released in ${this.year} for ${platform} it features the character ${character}.`
    );
}

// info.call(game, "SEGA", "Sonic");
// info.apply(game, ["SEGA", "Sonic"]);
// info();
const gameInfo = info.bind(game, "SEGA", "Sonic");
gameInfo();

const game2 = {
    title: "Super Mario",
    year: 1985,
};

// gameInfo.bind(game2)
// gameInfo()

// const gameInfo2 = info.bind(game2)
// gameInfo2()