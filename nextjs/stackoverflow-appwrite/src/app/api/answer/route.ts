import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";
import { AppwriteException } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const { questionId, answer, authorId } = await request.json();
        const response = await databases.createDocument(
            db,
            answerCollection,
            ID.unique(),
            {
                content: answer,
                authorId,
                questionId,
            },
        );

        // Increase author reputation
        const prefs = await users.getPrefs<UserPrefs>(authorId);

        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) + 1,
        });

        return NextResponse.json(response, {
            status: 201,
        });
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
                error: "Unknown error occurred",
            },
            {
                status: 500,
            },
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { answerId } = await request.json();

        const answer = await databases.getDocument(
            db,
            answerCollection,
            answerId,
        );

        const response = await databases.deleteDocument(
            db,
            answerCollection,
            answerId,
        );

        // decrease the reputation
        const prefs = await users.getPrefs<UserPrefs>(answer.authorId);

        await users.updatePrefs(answer.authorId, {
            reputation: Number(prefs.reputation) - 1,
        });

        return NextResponse.json({ data: response }, { status: 200 });
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
                error: "Unknown error occurred while handling answer",
            },
            {
                status: 500,
            },
        );
    }
}
