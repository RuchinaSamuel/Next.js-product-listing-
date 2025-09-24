
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";


const baseProducts = Array.from({ length: 61 }, (_, i) => ({
  id: i + 1,
  src: `/shoes/shoe${i + 1}.webp`,
  alt: `Shoe ${i + 1}`,
}));

export default function ProductList() {
  const [visibleProducts, setVisibleProducts] = useState(baseProducts);
  const loaderRef = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
      
          setVisibleProducts((prev) => [
            ...prev,
            ...baseProducts.map((p, i) => ({
              ...p,
              id: prev.length + i + 1, 
            })),
          ]);
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, []);

  return (
    <div className=" p-6">
        <div className="flex items-center justify-center w-full pb-6">
      <h1 className="text-2xl font-bold">PRODUCT LISTS</h1>
        </div>
  

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <Image
              src={product.src}
              alt={product.alt}
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="font-semibold text-gray-700">{product.alt}</h2>
            </div>
          </div>
        ))}
      </div>

  
      <div ref={loaderRef} className="h-10 flex justify-center items-center">
        <span className="text-gray-500">Loading more...</span>
      </div>
    </div>
  );
}
