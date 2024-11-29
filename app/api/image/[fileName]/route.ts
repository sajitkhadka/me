import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const getExtensionFromContentType = (contentType: string | undefined): string => {
    if (!contentType) return 'bin';
    const typeMap: { [key: string]: string } = {
        'image/png': 'png',
        'image/jpeg': 'jpg',
        'image/gif': 'gif',
        'image/bmp': 'bmp',
        'image/tiff': 'tiff',
        'image/webp': 'webp',
        'image/svg+xml': 'svg',
        'application/pdf': 'pdf',
        'text/plain': 'txt',
        'application/json': 'json',
    };
    return typeMap[contentType] || 'bin';
};

export async function GET(req: NextRequest, { params }: { params: { fileName: string } }) {
    const { fileName } = params;
    if (!fileName || typeof fileName !== 'string') {
        return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    try {
        const auth = new JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });

        const response = await drive.files.get({
            fileId: fileName,
            alt: 'media',
        }, { responseType: 'arraybuffer' });

        const fileContent = response.data as ArrayBuffer;
        const contentType = response.headers['content-type'];
        const fileExtension = getExtensionFromContentType(contentType);

        const buffer = Buffer.from(fileContent);
        const nextResponse = new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': contentType || 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${fileName}.${fileExtension}"`,
                // 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600',
                'Cache-Control': 'public, max-age=31536000, immutable'
            },
        });

        return nextResponse;
    } catch (error) {
        console.error('Error reading file:', error);
        return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
    }
}
