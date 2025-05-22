import Link from 'next/link';
import { Suspense } from 'react';
import { listProducts } from '../../../domain/usecases/productService';
import DeleteProductButton from '../../../components/deleteProductButton';
import { Product } from '../../../domain/entities/product';

export default async function ManageProductsPage() {
  const products: Product[] = await listProducts();

  return (
    <div>
      <h1>Manage Products</h1>
      <Link href="/manage/products/new">Create New Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ margin: '1rem 0' }}>
            <strong>{product.nom}</strong> - ${product.prix}
            <div>
              <Link href={`/manage/products/${product.id}/edit`}>Edit</Link>
              <Suspense fallback={<span>Deleting...</span>}>
                <DeleteProductButton productId={product.id} />
              </Suspense>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}