# Cloudflare DNS TXT Record Creator

A Next.js application that allows you to create TXT records in your Cloudflare DNS zone. This tool is particularly useful for creating ACME challenge records for SSL certificate validation.

## Features

- Simple form interface for creating TXT records
- Real-time status updates
- Edge runtime for optimal performance
- Input validation
- Error handling

## Prerequisites

- Node.js 18+ installed
- A Cloudflare account with API access
- A Cloudflare API token with DNS:Edit permissions
- A Cloudflare Zone ID

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
CF_API_TOKEN=your_cloudflare_api_token
CF_ZONE_ID=your_cloudflare_zone_id
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## Usage

1. Open the application in your browser
2. Enter the Record Name (e.g., `_acme-challenge`)
3. Enter the Record Value
4. Click "Create" to add the TXT record

## Implementation Notes

Time spent: ~1.5 hours

### Approach and Trade-offs

1. **Edge Runtime**: Chose to use Edge runtime for the API endpoint to minimize latency and improve performance. The trade-off is that we can't use Node.js-specific features, but the Cloudflare API is simple enough that this isn't a limitation.

2. **Form Design**: Kept the form simple with just two fields to focus on the core functionality. Could be extended to support more DNS record types and options if needed.

3. **Error Handling**: Implemented comprehensive error handling both on the frontend and backend to provide clear feedback to users.

4. **Environment Variables**: Required environment variables are checked at runtime to fail fast if they're not properly configured.

5. **No Zone Creation**: Deliberately omitted automatic zone creation to keep the scope focused and avoid potential security implications. Users should create zones through the Cloudflare dashboard.

## Security Considerations

- The API token should have minimal required permissions (DNS:Edit)
- Environment variables are used to keep sensitive data out of the codebase
- Input validation is performed on both client and server side

## License

MIT
