import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "./config";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDB() {
    try {
        await databases.get(db);
        console.log("Database Connected");
    } catch (error) {
        try {
            await databases.create(db, db);
            console.log("Database Created");
            // Create Collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),
            ]);
            console.log("Collection Created")
            console.log("Database Connected")
        } catch (error) {
            console.log("Error creating databases or collection", error)
        }
    }
    return databases
}
