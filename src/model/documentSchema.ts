import mongoose, { Schema, Document, Model } from 'mongoose';

// Define TypeScript interface for the document schema
interface DocumentsSchemaProps extends Document {
    title: string;
    initialContent?: string;
    ownerId: string;
    roomId?: string;
    organizationId?: string;
}

// Create the Mongoose schema
const documentSchema = new Schema<DocumentsSchemaProps>(
    {
        title: {
            type: String,
            required: true,
        },
        initialContent: {
            type: String,
        },
        ownerId: {
            type: String,
            required: true,
        },
        roomId: {
            type: String,
        },
        organizationId: {
            type: String,
        },
    },
    { timestamps: true }
);

// Define the model, avoiding duplicate model compilation
const Documents: Model<DocumentsSchemaProps> =
    mongoose.models.Documents || mongoose.model<DocumentsSchemaProps>('Documents', documentSchema);

export default Documents;
