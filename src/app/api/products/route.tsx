import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/infrastructure/productsRepository';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await addProduct(body);
    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}