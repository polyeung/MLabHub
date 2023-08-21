import { extend } from 'lodash';
import { NavigateOptions,  } from 'react-router-dom';

export interface SimpleLabInfoType {
    id: number,
    name: string,
    link: string,
    dep: string
};
export interface LabInfoType { 
    id: number,
    name: string,
    link: string,
    people: string,
    intro: string,
    emails: string,
    dep: string,
    isSaved: boolean
};

export interface ResponseAllLabs {
    total_page: number,
    count: number,
    previous: string | null,
    next: string | null,
    labs: LabInfoType[]
};

export const ResponseAllLabsTemp: ResponseAllLabs = {
    total_page: 0,
    count: 0,
    previous: null,
    next: null,
    labs: [] as LabInfoType[]
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
    id: number,
    labid: number,
    title: string,
    course: string[],
    rate: number,
    contact: string,
    intro: string,
    labname: string,
    lablink: string,
    rate_type: string,
    workhoursselection: string,
    workmodel: string,
    consecutivesemestersselect: string
};

export const jobdataIntTemplate: jobdataInt = {
    id: 1,
    labid: 1,
    title: "testing job",
    course: [''],
    rate: 15,
    contact: "example@umich.edu",
    intro: "This is a template example",
    labname: "Example labname",
    lablink: "https://umich.edu",
    rate_type: "Number",
    workhoursselection: "< 10 hours",
    workmodel: "Onsite",
    consecutivesemestersselect: "A semester"
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
    intro: string,
    funding: string
};

export const LabInfoTypeFormTemplate: LabInfoTypeForm = {
    name: "Human AI Lab",
    link: "http://testing.ai.lab.com",
    dep: "EECS",
    intro: "This is a lab from CSE with enthusiasted and professional researchers!",
    funding: ""
};

export interface PersonInfoType { 
    name: string,
    email: string,
};

export interface LabFormProps { 
    info: LabInfoTypeForm,
    handleSetInfo: (key: string, value: string) => any;
};

export interface JobFormProps{
    info: jobdataInt,
    handleSetInfo: (key: string, value: string) => any;
    handleSetInfoid: (key: string, value: number|null) => any;
    handleSetInfoArray: (key: string, value: string[]) => any;
};




export interface PeopleFormProps { 
    peopleDict: { [key: string]: PersonInfoType },
    handleUpdatePerson: (id: string, name: string, email: string) => any,
    handleDeletePerson:(id: string) => any
};

export interface ReviewFormProps { 
    peopleDict: { [key: string]: PersonInfoType },
    info: LabInfoTypeForm
};

export interface JobReviewFormProps { 
    info: jobdataInt
};


export interface SearchCriteriaProps {
    school: string,
    dep: string,
    label: string
};

export interface FilterProps {
    searchCriteria: SearchCriteriaProps,
    setDict: (key: string, value:string) => any
};

export interface overviewProps {
    userData: UserData | undefined | null,
    searchCriteria: SearchCriteriaProps,
    setDict: (key: string, value:string) => any
}

type StringDictType = {
    [key: string]: boolean;
};
export interface SchoolFilterProps{
    searchCriteria: SearchCriteriaProps,
    setDict: (key: string, value:string) => any,
    state: StringDictType,
    setState: React.Dispatch<React.SetStateAction<StringDictType>>
}
