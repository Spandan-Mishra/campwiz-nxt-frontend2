import type { User } from "./user";

export type PermissionName = 
    | 'PermissionApproveRejectCampaign' | 'PermissionCreateCampaign' | 'PermissionCreateUser' 
    | 'PermissionDeleteCampaign' | 'PermissionDeleteUser' | 'PermissionEditCampaign' 
    | 'PermissionEditUser' | 'PermissionViewCampaign' | 'PermissionViewUser'
    | 'PermissionOtherProjectAccess' | 'PermissionUpdateCampaignDetails';

type PermissionNumericValue = number
export type PermissionMap = {
    [key in PermissionName]: PermissionNumericValue;
};

export interface Session extends User {
    permissionMap: PermissionMap;
    permissions: PermissionName[];
    logout: () => Promise<void>;
    hasPermission: (permission: string) => boolean;
}