'use client';

import { useRouter } from 'next/navigation';

interface DeleteProductButtonProps {
  productId: string;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh(); // Refresh the list after deletion
    } else {
      alert('Failed to delete product');
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}