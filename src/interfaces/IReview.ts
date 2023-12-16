export interface IReview {
  id: number | string;
  userId: number | string;
  content: string;
  rating: number;
  avatar: string;
  userName: string;
  productId: number | string;
  createdAt: string | Date;
  updatedAt: string | Date;
  UserModel: UserModel;
}

export interface UserModel {
  fullname: string;
  avatar: string;
}

export interface IRatingPoint {
  level: number;
  percents: string;
}
