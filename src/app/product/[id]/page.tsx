import { Product } from "@/domain/entities/product";
import { getProductById } from "@/infrastructure/productsRepository";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function ProductDetails({ params }: PageProps) {
  let product: Product | null = null;
  const {id} = await params;

  try {
    product = await getProductById(id);
  } catch (error) {
    return notFound();
  }

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <h1>{product.nom}</h1>
      <p>{product.description}</p>
      <p>
        Price: ${product.prix}
        {product.quantite !== undefined && ` | Stock: ${product.quantite}`}
      </p>
      <Link href="/">Back to Products</Link>
    </div>
  );
}
