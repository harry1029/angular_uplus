export interface PersonCredential {
    id: number;
    personId: number;
    credentialType?: number;
    credentialName?: string;
    credentialCode?: string;
    credentialExt?: string;
    credentialNote?: string;
    credentialNumber?: number;
    credentialOrder?: number;
    credentialStatus?: number;
    credentialFlag?: number;
    credentialClass?: number;
    startDate?: Date;
    endDate?: Date;
    additName?: string;
    additDate?: Date;
    additType?: number;
    additId?: number;
    int01?: number;
    int02?: number;
    bigint01?: number;
    bigint02?: number;
    s01?: string;
    s02?: string;
    description?: string;
    updateUserId?: number;
    updateTime?: number;
    ipAddress?: string;
    updateMode?: number;
    updateLog?: number;
}
