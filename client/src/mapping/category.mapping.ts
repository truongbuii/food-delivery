import { ICategoryResponse } from "@/interfaces";

const MapperCategory = (category: Record<string, any>): ICategoryResponse => {
  return {
    id: category.id ?? "",
    name: category.name ?? "",
    imageUrl: category.imageUrl ?? "",
    slug: category.slug ?? "",
  };
};

export { MapperCategory };
