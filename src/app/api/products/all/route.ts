import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongoose';
import Product from '../../../../models/Product';

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');

  try {
    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const queryLimit = limit ? parseInt(limit, 10) : 0;

    console.log('queryLimit:', queryLimit);
    const products = queryLimit > 0
      ? await Product.find(query).limit(queryLimit)
      : await Product.find(query);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}
