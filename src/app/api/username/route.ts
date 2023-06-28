import { NextApiRequest } from 'next';
import { headers } from 'next/headers';
export async function GET(Request: NextApiRequest) {
  const useHeader = headers();
  const header = useHeader.get('content-type');
  return new Response('We are using the content-type header!', {
    status: 200,
    headers: { 'content-type': header! },
  });
}
