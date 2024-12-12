import connectDb from "@/lib/connectDb";
import Documents from "@/model/documentSchema";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request){
    console.log("Function called")
    await connectDb();
    try {
        const { userId }: { userId: string | null } = await auth()
        if(!userId){
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }
        const body = await req.json()
           // Proceed to create a document with the authenticated user's ID as ownerId
        const newDocument = await Documents.create({
            ...body,
            ownerId: userId, // Use the userId from the token
        });
        return new Response(JSON.stringify(newDocument), { status: 201 });
    } catch (error) {
        console.error("Error creating document:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
    
}