import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongoose';
import Product from '../../../../models/Product';

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const product = await Product.findOne({ id: id });
    return NextResponse.json({ exists: !!product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
