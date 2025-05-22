import Image from "next/image";
import { } from "module";
import { listProducts } from "@/domain/usecases/productService";
import { Product } from "@/domain/entities/product";
import Link from "next/link";

export default async function Home() {
  const products: Product[] = await listProducts();
  return (
    <div>
      <h1>Nos produits</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>{product.nom}</Link>
          </li>
        ))}
      </ul>
      <footer>
        <Link href="/manage">Manage Your Brewery</Link>
      </footer>

    </div>
  );
}
