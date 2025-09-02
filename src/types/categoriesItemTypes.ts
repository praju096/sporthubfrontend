export interface categoriesItem {
    category_id: number;
    category_name: string;
}
export interface categoriesItemApiResponse {
    data: categoriesItem[]; 
}