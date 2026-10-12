import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { auth as getSession } from '@/auth';
import imageService from '@/db/image.service';

const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
    const session = await getSession();
    if (session?.user?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only images are allowed' }, { status: 400 });
        }
        if (file.size > MAX_BYTES) {
            return NextResponse.json({ error: 'File is larger than 5 MB' }, { status: 413 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save file to disk temporarily
        const tempPath = path.join('/tmp', randomUUID());
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