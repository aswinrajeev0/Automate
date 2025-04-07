export interface IRequestDto {
    requestId: string,
    name: string;
    workshop: {
        name: string
    };
    amount: number;
    status: string;
    type: string;
    date: Date;
}