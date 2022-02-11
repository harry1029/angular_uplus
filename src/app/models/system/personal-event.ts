export interface PersonalEvent {
	id: number;
	personalId?: number;
	personal2Id?: number;
	personalName?: string;
	personal2Name?: string;
	eventName?: string;
	eventType?: number;
	eventTypeDesc?: string;
	weekDay?: number;
	eventDate?: number;
	eventTime?: number;
	duration?: number;
	eventPersonalPic?: string;
	eventPersonal2Pic?: string;
	description?: string;
}
