import { Permission } from "appwrite";
import { answerCollection, db } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
    // Create Collection
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
  console.log("Answer collection created")

  // Create Attribute
  await Promise.all([
    databases.createStringAttribute(db, answerCollection, "content", 10000, true),
    databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
    databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
  ])
  console.log("Answer Attribute Created")
}
