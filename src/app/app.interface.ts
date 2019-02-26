export interface ImageProperties  {
  imageName: string;
  imageType: string;
  Image: string;
}

export interface FileProperties {
  resourcesCategoryId?: number;
  fileName: string;
  fileType: string;
  files: string;
}

export interface Idomainlist {
  domainId: number;
  domainName: string;
}

export interface IcategoryList {
  categoryId: number;
  categoryName: string;
  categoryImagePath: string;
}

export interface IFunctionalAreas {
 functionalAreaId: number;
  functionalAreaName: string;
  domainId: number;
}

export interface ILoginUserDetails {
  user_id: number;
  user_name: string;
  email_id: string;
}
