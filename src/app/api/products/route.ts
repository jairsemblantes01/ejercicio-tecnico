import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import Product from '../../../models/Product';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const data = await request.json();
    const product = new Product(data);
    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
      }
      return NextResponse.json(product, { status: 200 });
    } else {
      const products = await Product.find({});
      return NextResponse.json(products, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const data = await request.json();
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Producto eliminado exitosamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
