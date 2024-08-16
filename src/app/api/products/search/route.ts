import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  await dbConnect();

  const { search } = Object.fromEntries(request.nextUrl.searchParams);

  if (!search) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const products = await Product.find({
      name: { $regex: search, $options: 'i' }
    });

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
