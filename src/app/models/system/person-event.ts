export interface PersonEvent {
	id: number;
	personId?: number;
	person2Id?: number;
	personName?: string;
	person2Name?: string;
	eventName?: string;
	eventType?: number;
	eventTypeDesc?: string;
	weekDay?: number;
	eventDate?: number;
	eventTime?: number;
	duration?: number;
	eventPersonPic?: string;
	eventPerson2Pic?: string;
	description?: string;
}
