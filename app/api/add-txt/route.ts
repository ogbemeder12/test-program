import { NextResponse } from 'next/server';

// ❌ REMOVE THIS LINE
// export const runtime = 'edge';

export async function POST(request: Request) {
    const CF_API_TOKEN = process.env.CF_API_TOKEN;
    const CF_ZONE_ID = process.env.CF_ZONE_ID;

    if (!CF_API_TOKEN || !CF_ZONE_ID) {
        return NextResponse.json(
            { message: 'Missing required environment variables' },
            { status: 500 }
        );
    }

    try {
        const { recordName, recordValue } = await request.json();

        if (!recordName || !recordValue) {
            return NextResponse.json(
                { message: 'Record name and value are required' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CF_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'TXT',
                    name: recordName,
                    content: recordValue,
                    ttl: 1, // Auto TTL
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.errors?.[0]?.message || 'Failed to create DNS record' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error creating DNS record:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
