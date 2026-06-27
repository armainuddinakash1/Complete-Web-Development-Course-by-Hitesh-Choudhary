import {
    answerCollection,
    db,
    questionCollection,
    voteCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException, ID, Query } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const { votedById, voteStatus, type, typeId } = await request.json();

        const response = await databases.listDocuments(db, voteCollection, [
            Query.equal("type", type),
            Query.equal("typeId", typeId),
            Query.equal("votedById", votedById),
        ]);

        if (response.documents.length > 0) {
            await databases.deleteDocument(
                db,
                voteCollection,
                response.documents[0].$id,
            );

            // Increase / Decrease the reputation of the question/answer author
            const questionOrAnswer = await databases.getDocument(
                db,
                type === "question" ? questionCollection : answerCollection,
                typeId,
            );

            const authorPrefs = await users.getPrefs<UserPrefs>(
                questionOrAnswer.authorId,
            );

            await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
                reputation:
                    response.documents[0].voteStatus === "upvoted"
                        ? Number(authorPrefs.reputation) - 1
                        : Number(authorPrefs.reputation) + 1,
            });
        }

        // that means prev vote does not exists or voteStatus changed
        if (response.documents[0]?.voteStatus !== voteStatus) {
            const doc = await databases.createDocument(
                db,
                voteCollection,
                ID.unique(),
                {
                    type,
                    typeId,
                    voteStatus,
                    votedById,
                },
            );

            // Increate/Decrease the reputation of the question/answer author accordingly
            const questionOrAnswer = await databases.getDocument(
                db,
                type === "question" ? questionCollection : answerCollection,
                typeId,
            );

            const authorPrefs = await users.getPrefs<UserPrefs>(
                questionOrAnswer.authorId,
            );

            // if vote was present
            // see the mindmap to understand the logic
            if (response.documents[0]) {
                await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
                    reputation:
                        voteStatus === "upvoted"
                            ? // that means prev vote was "downvote" and new vote is "upvote" so we have to increase the reputation
                              Number(authorPrefs.reputation) + 1
                            : // that means prev vote was "upvote" and new vote is "downvote" so we have to decrease the reputation
                              Number(authorPrefs.reputation) - 1,
                });
            } else {
                await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
                    reputation:
                        voteStatus === "upvoted"
                            ? // that means prev vote was "undefined" and new vote is "upvoted" so we have to increase the reputation
                              Number(authorPrefs.reputation) + 1
                            : // that means prev vote was "undefined" and new vote is "downvoted" so we have to decrease the reputation
                              Number(authorPrefs.reputation) - 1,
                });
            }

            const [upvotes, downvotes] = await Promise.all([
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", type),
                    Query.equal("typeId", typeId),
                    Query.equal("voteStatus", "upvoted"),
                    Query.limit(1), // for optimization as we only need total
                ]),
                databases.listDocuments(db, voteCollection, [
                    Query.equal("type", type),
                    Query.equal("typeId", typeId),
                    Query.equal("voteStatus", "downvoted"),
                    Query.limit(1), // for optimization as we only need total
                ]),
            ]);

            return NextResponse.json(
                {
                    data: {
                        document: doc,
                        voteResult: upvotes.total - downvotes.total,
                    },
                    message: response.documents[0]
                        ? "Vote Status Updated"
                        : "Voted",
                },
                {
                    status: response.documents[0] ? 200 : 201,
                },
            );
        }

        const [upvotes, downvotes] = await Promise.all([
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "upvoted"),
                Query.limit(1), // for optimization as we only need total
            ]),
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "downvoted"),
                Query.limit(1), // for optimization as we only need total
            ]),
        ]);

        return NextResponse.json(
            {
                data: {
                    document: null,
                    voteResult: upvotes.total - downvotes.total,
                },
                message: "Vote Withdrawn",
            },
            {
                status: 200,
            },
        );
    } catch (error: unknown) {
        if (error instanceof AppwriteException) {
            return NextResponse.json(
                {
                    error: error.message,
                },
                {
                    status: error.code || 500,
                },
            );
        }

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: error.message,
                },
                {
                    status: 500,
                },
            );
        }

        return NextResponse.json(
            {
                error: "Unknown error occurred while handling vote",
            },
            {
                status: 500,
            },
        );
    }
}
