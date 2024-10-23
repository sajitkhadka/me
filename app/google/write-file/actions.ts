'use server'

import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs, { unlinkSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function uploadFile(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) {
        throw new Error('No file uploaded');
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

    try {
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id',
        });

        // Delete the temporary file
        await unlinkSync(tempPath);

        return { fileId: response.data.id };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file');
    }
}