import type { WikimediaUsername } from "@/types/_";

export interface Project {
    logoUrl: string;
    name: string;
    projectId: string;
    projectLeads: WikimediaUsername[];
    url: string;

}
export type ProjectCreate = Project;

export type ProjectUpdate = Project & { projectLeads: WikimediaUsername[] };
export const initialProjectCreate: ProjectCreate = {
    logoUrl: "",
    name: "",
    projectId: "",
    projectLeads: [],
    url: ""
}
export const projectCreateReducer = (state: ProjectCreate, action: Partial<ProjectCreate>) => {
    return {
        ...state,
        ...action
    }
}
export const projectUpdateReducer = (state: ProjectUpdate, action: Partial<ProjectUpdate>) => {
    return {
        ...state,
        ...action
    }
}