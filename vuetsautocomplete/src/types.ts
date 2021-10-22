export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
};

export type Human = {
  id: number;
  name: string;
  username: string;
  url: string;
};

export type PhotoList = Photo[];
