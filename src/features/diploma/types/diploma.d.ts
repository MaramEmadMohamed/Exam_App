

//          All diploma  /////////////////////////////
export interface Diplomas{
    id:string,
    title:string,
    description:string,
    image:string,
    immutable:boolean,
    createdAt:string,
    updatedAt:string
}

export interface DiplomasMetaData{
    total:number,
    page:number,
    limit:number,
    totalPages:number
}

export interface DiplomasResponse{
   status: boolean,
   code:number,
   payload:{
    data:Diplomas[],
    metadata: DiplomasMetaData
   }
}

export interface ApiErrorResponse {
  status: false;
  code: number;
  message: string;
  errors: {
    path: string;
    message: string;
    messages: string[];
  }[];
}


////////  Diploma {id}  //////////

export interface DiplomaDetails{
    id:string,
    title:string,
    description:string,
    image:string,
    immutable:boolean,
    createdAt:string,
    updatedAt:string
}

export interface DiplomaDetailsResponse {
  status: boolean;
  code: number;
  payload?: { diploma: DiplomaDetails };
  diploma?: DiplomaDetails;
}
