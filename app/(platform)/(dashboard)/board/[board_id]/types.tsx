export interface Board {
  id: string,
  title: string,
  org_id: string,
  image_id: string
  image_thumb_url: string
  image_full_url: string
  image_link_html: string
  image_username: string
  lists: List[]
  created_at:string
  updated_at:string

}



export interface List{
  id:string,
  title:string,
  order:number,
  cards: Card[]
  created_at:string,
  updated_at:string,
  board_id:string,
}


export interface Card{
  id:string,
  title:string
  order:number
  description?:string
  list_id:string
}