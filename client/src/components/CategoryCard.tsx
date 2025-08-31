import { Link } from "wouter";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products/${category.slug}`}>
      <div className="group cursor-pointer" data-testid={`card-category-${category.id}`}>
        <div className="relative overflow-hidden rounded-xl">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-serif text-2xl font-bold" data-testid={`text-category-name-${category.id}`}>
              {category.name}
            </h3>
            <p className="text-sm opacity-90" data-testid={`text-category-description-${category.id}`}>
              {category.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
