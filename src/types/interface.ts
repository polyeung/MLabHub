import { extend } from 'lodash';
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
};

export interface commentsInt { 
    id: number,
    name: string,
    rating: number,
    word: string
};

export interface jobdataInt {
    labid: number,
    title: string,
    course: string,
    rate: number,
    contact: string,
    intro: string,
    labname: string,
    lablink: string
};

export interface UserData {
    username: string,
    name: string | null,
    email: string | null,
    created: string
};

export interface LabInfoTypeForm {
    name: string,
    link: string,
    dep: string,
    addr: string,
    funding: string
};

export const LabInfoTypeFormTemplate: LabInfoTypeForm = {
    name: "Human AI Lab",
    link: "http://testing.ai.lab.com",
    dep: "CSE",
    addr: "",
    funding: ""
};

export interface PersonInfoType { 
    name: string,
    email: string,
};

export interface AddrInfoType { 
    addr1: string,
    addr2: string,
    city: string,
    zip: string,
    country: string,
    state:string
};

export const AddrInfoTemplate: AddrInfoType = {
    addr1: '',
    addr2: '',
    city: '',
    zip: '',
    country: '',
    state: ''
};

export interface LabFormProps { 
    info: LabInfoTypeForm,
    addr: AddrInfoType,
    handleSetAddr: (key: string, value: string) => any;
    handleSetInfo: (key: string, value: string) => any;
};




export interface PeopleFormProps { 
    peopleDict: { [key: string]: PersonInfoType },
    handleUpdatePerson: (id: string, name: string, email: string) => any,
    handleDeletePerson:(id: string) => any
};

export interface ReviewFormProps { 
    peopleDict: { [key: string]: PersonInfoType },
    addr: AddrInfoType,
    info: LabInfoTypeForm
};