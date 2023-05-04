import { NavigateOptions,  } from 'react-router-dom';

export interface LabInfoType { 
    id: number,
    name: string,
    link: string,
    people: string,
    intro: string
};

export interface LocationState extends NavigateOptions {
    state: {
      pathname: string;
    };
};

export interface RichLabInfoType { 
    id: number,
    name: string,
    link: string,
    people: string,
    intro: string
};

export const RichLabInfoTemplate:RichLabInfoType = { 
    id: 1,
    name: "",
    link: "",
    people: "",
    intro: "",
};

export interface ReviewsType {
    rating: number,
    comment: string,
    name: string
};
export interface parsedNameInt { 
    name: string,
    initial: string,
}

export interface commentsInt { 
    id: number,
    name: string,
    rating: number,
    word: string
}

export interface UserData {
    username: string,
    name: string | null,
    email: string | null,
    created: string
};
