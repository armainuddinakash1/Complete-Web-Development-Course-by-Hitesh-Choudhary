import { DatabasesIndexType, Permission, Role } from "node-appwrite";
import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";

async function waitForAttribute(
    databaseId: string,
    collectionId: string,
    key: string,
) {
    while (true) {
        const attribute = await databases.getAttribute(
            databaseId,
            collectionId,
            key,
        );

        if (attribute.status === "available") {
            return;
        }

        if (attribute.status === "failed") {
            throw new Error(`Attribute "${key}" failed to process.`);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}

export default async function createQuestionCollection() {
    try {
        // Create Collection
        await databases.createCollection(
            db,
            questionCollection,
            questionCollection,
            [
                Permission.create(Role.users()),
                Permission.read(Role.any()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ],
        );

        console.log("Question Collection Created");

        // Create Attributes
        await Promise.all([
            databases.createStringAttribute(
                db,
                questionCollection,
                "title",
                100,
                true,
            ),
            databases.createStringAttribute(
                db,
                questionCollection,
                "content",
                10000,
                true,
            ),
            databases.createStringAttribute(
                db,
                questionCollection,
                "authorId",
                50,
                true,
            ),
            databases.createStringAttribute(
                db,
                questionCollection,
                "tags",
                100,
                true,
                undefined,
                true,
            ),
            databases.createStringAttribute(
                db,
                questionCollection,
                "attachmentId",
                50,
                false,
            ),
        ]);

        console.log("Question Attributes Submitted");

        // Wait for attributes to finish processing
        await Promise.all([
            waitForAttribute(db, questionCollection, "title"),
            waitForAttribute(db, questionCollection, "content"),
            waitForAttribute(db, questionCollection, "authorId"),
            waitForAttribute(db, questionCollection, "tags"),
            waitForAttribute(db, questionCollection, "attachmentId"),
        ]);

        console.log("Question Attributes Available");

        // Create Fulltext Indexes
        await Promise.all([
            databases.createIndex(
                db,
                questionCollection,
                "title_fulltext",
                DatabasesIndexType.Fulltext,
                ["title"],
            ),
            databases.createIndex(
                db,
                questionCollection,
                "content_fulltext",
                DatabasesIndexType.Fulltext,
                ["content"],
            ),
        ]);

        console.log("Question Indexes Created");
    } catch (error) {
        console.error("Failed to create question collection:", error);
        throw error;
    }
}
