interface ICategory {
  id: number;
  name: string;
  imageUrl: string;
}

interface ICategoryResponse extends ICategory {
  slug: string;
}

export type { ICategory, ICategoryResponse };
