import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import imageService from '@/db/image.service';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save file to disk temporarily
        const tempPath = path.join('/tmp', file.name);
        await writeFile(tempPath, buffer);

        const auth = new JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        const drive = google.drive({ version: 'v3', auth });

        const fileMetadata = {
            name: file.name,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
        };

        const media = {
            mimeType: file.type,
            body: fs.createReadStream(tempPath),
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id',
        });
        if (!response.data.id) {
            return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
        }

        // Delete the temporary file
        fs.unlinkSync(tempPath);

        const pendingImage = await imageService.createPendingImage(response.data.id);

        return NextResponse.json({ fileId: response.data.id, imageId: pendingImage.id });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}