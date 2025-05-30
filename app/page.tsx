'use client';

import { useState } from 'react';

export default function Home() {
  const [recordName, setRecordName] = useState('');
  const [recordValue, setRecordValue] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message?: string }>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      const response = await fetch('/api/add-txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recordName, recordValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create DNS record');
      }

      setStatus({ type: 'success' });
      setRecordName('');
      setRecordValue('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  return (
    <main className="min-h-screen p-8 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create DNS TXT Record</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="recordName" className="block text-sm font-medium text-gray-700 mb-1">
              Record Name
            </label>
            <input
              type="text"
              id="recordName"
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
              placeholder="_acme-challenge"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="recordValue" className="block text-sm font-medium text-gray-700 mb-1">
              Record Value
            </label>
            <input
              type="text"
              id="recordValue"
              value={recordValue}
              onChange={(e) => setRecordValue(e.target.value)}
              placeholder="Enter record value"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            Create
          </button>
        </form>

        {status.type !== 'idle' && (
          <div className={`mt-4 p-3 rounded ${status.type === 'error' ? 'bg-red-100 text-red-700' :
            status.type === 'success' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-700'
            }`}>
            {status.type === 'loading' && 'Loading...'}
            {status.type === 'success' && 'Success!'}
            {status.type === 'error' && `Error: ${status.message}`}
          </div>
        )}
      </div>
    </main>
  );
}
