// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/infrastructure/productsRepository';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await getProductById(params.id);
    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const product = await updateProduct(params.id, body);
    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteProduct(params.id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}