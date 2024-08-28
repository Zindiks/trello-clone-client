export interface Board {
  id: string,
  title: string,
  orgId: string,
  imageId: string
  imageThumbUrl: string
  imageFullUrl: string
  imageLinkHTML: string
  imageUserName: string
  lists: List[]
  createdAt:string
  updatedAt:string

}



export interface List{
  id:string,
  title:string,
  order:number,
  cards: Card[]
  createdAt:string,
  updatedAt:string,
  boardId:string,
}


export interface Card{
  id:string,
  title:string
  order:number
  description?:string
  listId:string
}