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