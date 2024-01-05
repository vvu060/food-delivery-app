import { User } from '@/models/User';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log({ body });
  await mongoose.connect(process.env.MONGO_URI || '');
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
