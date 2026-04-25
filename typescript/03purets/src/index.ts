/*
class User {
    public name: string;
    private email: string;
    readonly city: string = "san-francisco";
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}
*/

class User {
  protected _courseCount = 1;

  readonly city: string = "san-francisco";
  constructor(
    public name: string,
    public email: string,
    private userId: string,
  ) {}

  private deleteToken() {
    console.log("Token deleted");
  }

  get getAppleEmail(): string {
    return `apple${this.email}`;
  }

  get courseCount(): number {
    return this._courseCount;
  }

  set courseCount(courseNum) {
    if (courseNum <= 1) {
      throw new Error("Course count should be more than 1");
    }
    this._courseCount = courseNum
  }
}

class subUser extends User {
    isFamily: boolean = true;
    constructor(name: string, email: string, userId: string) {
        super(name, email, userId);
        this._courseCount = 4; // Uses the setter
    }
}

const akash = new User("akash", "akash@gmail.com", "123");
// akash.city = "palo alto"
// console.log(akash._courseCount);

// learned how to write production grade code in typescript