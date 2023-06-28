import { NextApiRequest } from 'next';

export async function GET(
  request: NextApiRequest,
  { params }: { params: { user: string } }
) {
  const user = params.user;
  return new Response(`Welcome to my Next application, user: ${user}`);
}
