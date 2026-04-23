interface User {
    readonly dbId: number;
    email: string;
    userId: number;
    googleId?: number;
    // startTrail: () => string,
    startTrail(): string;
    getCupon(cuponname: string, value: number): number;
}

interface User {
    githubToken: string;
}

interface Admin extends User {
    role: "admin" | "ta" | "learnner";
}

const akash: Admin = {
    dbId: 1234,
    email: "akash@gmail.com",
    userId: 12345,
    startTrail: () => {
        return "trail started";
    },
    getCupon: (name: "akash40", off: 40) => {
        return 40;
    },
    githubToken: "github",
    role: "admin",
};

akash.email = "akash@akash.com";
// akash.dbId = 5544
